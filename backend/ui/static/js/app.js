async function api(path, opts={}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...opts
  });
  return res.json();
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 2400);
}

function setMode(mode) {
  localStorage.setItem("rf_mode", mode);
  const simple = document.getElementById("modeSimple");
  const adv = document.getElementById("modeAdvanced");
  simple.classList.toggle("active", mode === "simple");
  adv.classList.toggle("active", mode === "advanced");

  document.querySelectorAll("[data-advanced-only]").forEach(el => {
    el.style.display = (mode === "advanced") ? "" : "none";
  });
}

async function refreshStatus() {
  const pill = document.getElementById("serverStatePill");
  const msg = document.getElementById("serverStateMsg");
  try {
    const data = await api("/status");
    pill.textContent = `STATE: ${data.state}`;
    msg.textContent = data.activeServerId ? `Active Server: ${data.activeServerId}` : "No active server selected (mock).";
  } catch (e) {
    pill.textContent = "STATE: ERROR";
    msg.textContent = "Failed to load status.";
  }
}

function bindButtons() {
  document.querySelectorAll("[data-action='start']").forEach(btn => {
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      toast("Starting (mock)...");
      await api("/start", { method: "POST" });
      await refreshStatus();
      btn.disabled = false;
    });
  });

  document.querySelectorAll("[data-action='stop']").forEach(btn => {
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      toast("Stopping (mock)...");
      await api("/stop", { method: "POST" });
      await refreshStatus();
      btn.disabled = false;
    });
  });
}

function bindSidebar() {
  const sb = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");
  toggle.addEventListener("click", () => {
    sb.classList.toggle("collapsed");
    sb.classList.toggle("expanded");
  });
}

function bindModeToggle() {
  const simple = document.getElementById("modeSimple");
  const adv = document.getElementById("modeAdvanced");

  simple.addEventListener("click", () => setMode("simple"));
  adv.addEventListener("click", () => setMode("advanced"));

  const saved = localStorage.getItem("rf_mode") || "simple";
  setMode(saved);
}

function placePopup(popup, x, y) {
  const pad = 12;
  const rect = popup.getBoundingClientRect();
  let px = x + 18;
  let py = y + 18;

  if (px + rect.width > window.innerWidth - pad) px = x - rect.width - 18;
  if (py + rect.height > window.innerHeight - pad) py = window.innerHeight - rect.height - pad;

  if (px < pad) px = pad;
  if (py < pad) py = pad;

  popup.style.left = `${px}px`;
  popup.style.top = `${py}px`;
}

function bindWorldHoverPopup() {
  const popup = document.getElementById("worldPopup");
  if (!popup) return;

  const title = document.getElementById("worldPopupTitle");
  const usedBy = document.getElementById("worldPopupUsedBy");

  document.querySelectorAll(".worldName").forEach(el => {
    el.addEventListener("mouseenter", (ev) => {
      const world = ev.target.textContent.trim();
      title.textContent = `World: ${world}`;
      usedBy.textContent = "Forge Survival, Forge Creative (mock)";
      popup.classList.remove("hidden");
      placePopup(popup, ev.clientX, ev.clientY);
    });
    el.addEventListener("mousemove", (ev) => {
      if (!popup.classList.contains("hidden")) placePopup(popup, ev.clientX, ev.clientY);
    });
    el.addEventListener("mouseleave", () => {
      popup.classList.add("hidden");
    });
  });
}

function bindCarousel() {
  const track = document.getElementById("carTrack");
  const prev = document.getElementById("carPrev");
  const next = document.getElementById("carNext");
  if (!track || !prev || !next) return;

  prev.addEventListener("click", () => track.scrollBy({ left: -220, behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: 220, behavior: "smooth" }));
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

async function loadServers() {
  const data = await api("/api/servers");
  if (!data.ok) throw new Error("UI servers API not ok");
  return data.items || [];
}

function sortLastPlayed(servers) {
  return [...servers].sort((a,b) => {
    const ta = Date.parse(a.lastPlayedAt || "") || 0;
    const tb = Date.parse(b.lastPlayedAt || "") || 0;
    return tb - ta;
  });
}

function renderLastPlayed(servers) {
  const track = document.getElementById("carTrack");
  if (!track) return;

  const top = sortLastPlayed(servers).slice(0, 5);

  if (top.length === 0) {
    track.innerHTML = `<div class="muted">No servers yet.</div>`;
    return;
  }

  track.innerHTML = top.map(s => {
    const id = escapeHtml(s.id);
    const name = escapeHtml(s.name);
    const world = escapeHtml(s.worldName || "(no world)");
    return `
      <div class="mini-card" data-server-id="${id}" data-world="${world}">
        <div class="mini-title">${name}</div>
        <div class="mini-sub">World: <span class="hoverable worldName">${world}</span></div>
        <div class="mini-actions">
          <button class="btn small" data-action="start" data-server-id="${id}">Start</button>
          <button class="btn small secondary" data-action="stop" data-server-id="${id}">Stop</button>
        </div>
      </div>
    `;
  }).join("");

  bindButtons();
  bindWorldHoverPopup();
}

function renderGrid(servers) {
  const mount = document.getElementById("gridMount");
  if (!mount) return;

  // Map servers into loader+mode grid slots
  const byKey = new Map();
  for (const s of servers) {
    const key = `${s.loader}:${s.mode}`;
    byKey.set(key, s);
  }

  const rows = [
    { label: "Forge", loader: "forge", defaultWorld: "FoDWorld" },
    { label: "Fabric", loader: "fabric", defaultWorld: "FaDWorld" },
    { label: "Vanilla", loader: "vanilla", defaultWorld: "VaDWorld" },
  ];

  const modes = [
    { label: "Survival", mode: "survival" },
    { label: "Creative", mode: "creative" },
  ];

  // 3 columns: row label + 2 tiles
  mount.style.gridTemplateColumns = "90px 1fr 1fr";

  let html = "";
  for (const r of rows) {
    html += `<div class="row-label">${r.label}</div>`;

    for (const m of modes) {
      const s = byKey.get(`${r.loader}:${m.mode}`);
      if (!s) {
        html += `
          <div class="server-tile">
            <div class="tile-title">${r.label} ${m.label}</div>
            <div class="tile-world">World: <span class="hoverable worldName">${r.defaultWorld}</span></div>
            <img class="tile-thumb" src="/assets/mock-worlds/survival_world.png" alt="World thumbnail" />
            <div class="tile-actions">
              <button class="btn" disabled title="Create server first">Start</button>
              <button class="btn secondary" disabled>Stop</button>
            </div>
          </div>
        `;
      } else {
        const id = escapeHtml(s.id);
        const name = escapeHtml(s.name);
        const world = escapeHtml(s.worldName || r.defaultWorld);
        const modsCount = Array.isArray(s.modIds) ? s.modIds.length : 0;

        html += `
          <div class="server-tile" data-server-id="${id}">
            <div class="tile-title">${name}</div>
            <div class="tile-world">World: <span class="hoverable worldName">${world}</span></div>
            <div class="muted" style="margin-top:6px;">Mods: ${modsCount}</div>
            <img class="tile-thumb" src="/assets/mock-worlds/survival_world.png" alt="World thumbnail" />
            <div class="tile-actions">
              <button class="btn" data-action="start" data-server-id="${id}">Start</button>
              <button class="btn secondary" data-action="stop" data-server-id="${id}">Stop</button>
            </div>
          </div>
        `;
      }
    }
  }

  mount.innerHTML = html;
  bindButtons();
  bindWorldHoverPopup();
}

async function loadDashboardData() {
  const servers = await loadServers();
  renderLastPlayed(servers);
  renderGrid(servers);
}

window.addEventListener("DOMContentLoaded", async () => {
  bindModeToggle();
  bindSidebar();
  bindButtons();
  bindCarousel();
  bindWorldHoverPopup();
  await refreshStatus();
  await loadDashboardData();
});