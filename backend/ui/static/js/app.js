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
  if (!pill || !msg) return;
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

let worldPopupBound = false;
let worldPopupAnchor = null;
let worldPopupPinned = false;

function bindWorldHoverPopup() {
  const popup = document.getElementById("worldPopup");
  if (!popup || worldPopupBound) return;

  worldPopupBound = true;

  const title = document.getElementById("worldPopupTitle");
  const usedBy = document.getElementById("worldPopupUsedBy");
  const titleNav = document.getElementById("worldPopupTitleNav");

  function populate(world) {
    if (titleNav) {
      titleNav.dataset.worldName = world;
    }
    title.textContent = `World: ${world}`;

    const users = getServersUsingWorld(dashboardServers, world);
    if(!users.length) {
      usedBy.innerHTML = `<span class="muted">Not currently used by any server.</span>`;
      return;
    }

    usedBy.innerHTML = users.map(s => `
      <div class="popup-link-row">
        <span class="hoverable popup-server-link"
          data-server-name="${escapeHtml(s.name)}">
          ${escapeHtml(s.name)}
        </span>
        <button class="popup-nav-btn" data-nav-type="server" data-server-name="${escapeHtml(s.name)}"
          title="Open server">
          ↗
        </button>
      </div>
    `).join("");
  }

  function showForElement(el, clientX = null, clientY = null) {
    const world = el.textContent.trim();
    populate(world);
    worldPopupAnchor = el;
    popup.classList.remove("hidden");

    if (clientX !== null && clientY !== null) {
      placePopup(popup, clientX, clientY);
      return;
    }

    const rect = el.getBoundingClientRect();
    placePopup(popup, rect.right, rect.top);
  }

  function hidePopup() {
    popup.classList.add("hidden");
    worldPopupAnchor = null;
    worldPopupPinned = false;
  }

  popup.addEventListener("click", (ev) => {
    ev.stopPropagation();
  });

  document.addEventListener("mouseover", (ev) => {
    const el = ev.target.closest(".worldName");
    if (!el) return;
    if (worldPopupPinned) return;

    showForElement(el, ev.clientX, ev.clientY);
  });

  document.addEventListener("mousemove", (ev) => {
    const el = ev.target.closest(".worldName");
    if (!el) return;
    if (worldPopupPinned) return;
    if (popup.classList.contains("hidden")) return;

    placePopup(popup, ev.clientX, ev.clientY);
  });

  document.addEventListener("mouseout", (ev) => {
    const el = ev.target.closest(".worldName");
    if (!el) return;
    if (worldPopupPinned) return;

    const related = ev.relatedTarget;
    if (related && el.contains(related)) return;

    popup.classList.add("hidden");
  });

  document.addEventListener("click", (ev) => {
    const el = ev.target.closest(".worldName");

    if (el) {
      ev.preventDefault();
      ev.stopPropagation();

      if (worldPopupPinned && worldPopupAnchor === el) {
        hidePopup();
        return;
      }

      worldPopupPinned = true;
      showForElement(el);
      return;
    }

    if (worldPopupPinned && !popup.contains(ev.target)) {
      hidePopup();
    }
  });

  window.addEventListener("scroll", () => {
    if (!worldPopupAnchor || popup.classList.contains("hidden")) return;
    const rect = worldPopupAnchor.getBoundingClientRect();
    placePopup(popup, rect.right, rect.top);
  }, true);

  window.addEventListener("resize", () => {
    if (!worldPopupAnchor || popup.classList.contains("hidden")) return;
    const rect = worldPopupAnchor.getBoundingClientRect();
    placePopup(popup, rect.right, rect.top);
  });
}

let serverPopupBound = false;
let serverPopupAnchor = null;
let serverPopupPinned = false;

function bindServerHoverPopup() {
  const popup = document.getElementById("serverPopup");
  if (!popup || serverPopupBound) return;

  serverPopupBound = true;

  const title = document.getElementById("serverPopupTitle");
  const loader = document.getElementById("serverPopupLoader");
  const world = document.getElementById("serverPopupWorld");
  const mods = document.getElementById("serverPopupMods");
  const titleNav = document.getElementById("serverPopupTitleNav");

  function getServerContainer(el) {
    return el.closest(".mini-card, .server-tile");
  }

  function populate(container) {
    const serverName = container.dataset.serverName || "Unknown";
    const loaderValue = container.dataset.loader || "Unknown";
    const worldValue = container.dataset.world || "(no world)";
    const modsValue = container.dataset.modCount || "0";

    if (titleNav) {
     titleNav.dataset.serverName = serverName;
    }
    title.textContent = `Server: ${serverName}`;
    loader.textContent = loaderValue;
    world.innerHTML = `
      <span class="hoverable popup-world-link"
        data-world-name="${escapeHtml(worldValue)}">
        ${escapeHtml(worldValue)}
      </span>
      <button class="popup-nav-btn"
        data-nav-type="world"
        data-world-name="${escapeHtml(worldValue)}"
        title="Open world">
        ↗
      </button>
    `;
    mods.textContent = modsValue;
  }

  function showForElement(anchorEl, clientX = null, clientY = null) {
    const container = getServerContainer(anchorEl);
    if (!container) return;

    populate(container);
    serverPopupAnchor = anchorEl;
    popup.classList.remove("hidden");

    if (clientX !== null && clientY !== null) {
      placePopup(popup, clientX, clientY);
      return;
    }

    const rect = anchorEl.getBoundingClientRect();
    placePopup(popup, rect.right, rect.top);
  }

  function hidePopup() {
    popup.classList.add("hidden");
    serverPopupAnchor = null;
    serverPopupPinned = false;
  }

  popup.addEventListener("mousedown", (ev) => {
    ev.stopPropagation();
  });

  document.addEventListener("mouseover", (ev) => {
    const el = ev.target.closest(".serverName");
    if (!el) return;
    if (serverPopupPinned) return;

    showForElement(el, ev.clientX, ev.clientY);
  });

  document.addEventListener("mousemove", (ev) => {
    const el = ev.target.closest(".serverName");
    if (!el) return;
    if (serverPopupPinned) return;
    if (popup.classList.contains("hidden")) return;

    placePopup(popup, ev.clientX, ev.clientY);
  });

  document.addEventListener("mouseout", (ev) => {
    const el = ev.target.closest(".serverName");
    if (!el) return;
    if (serverPopupPinned) return;

    const related = ev.relatedTarget;
    if (related && el.contains(related)) return;

    popup.classList.add("hidden");
  });

  document.addEventListener("mousedown", (ev) => {
    const el = ev.target.closest(".serverName");

    if (el) {
      ev.preventDefault();
      ev.stopPropagation();

      if (serverPopupPinned && serverPopupAnchor === el) {
        hidePopup();
        return;
      }

      serverPopupPinned = true;
      showForElement(el);
      return;
    }

    if (serverPopupPinned && !popup.contains(ev.target)) {
      hidePopup();
    }
  });

  window.addEventListener("scroll", () => {
    if (!serverPopupAnchor || popup.classList.contains("hidden")) return;
    const rect = serverPopupAnchor.getBoundingClientRect();
    placePopup(popup, rect.right, rect.top);
  }, true);

  window.addEventListener("resize", () => {
    if (!serverPopupAnchor || popup.classList.contains("hidden")) return;
    const rect = serverPopupAnchor.getBoundingClientRect();
    placePopup(popup, rect.right, rect.top);
  });
}

function bindPopupServerLinksInWorldPopup() {
  const popup = document.getElementById("popupChildServer");
  const parentPopup = document.getElementById("worldPopup");
  if (!popup || !parentPopup) return;

  const title = document.getElementById("popupChildServerTitle");
  const loader = document.getElementById("popupChildServerLoader");
  const world = document.getElementById("popupChildServerWorld");
  const mods = document.getElementById("popupChildServerMods");

  function hide() {
    popup.classList.add("hidden");
  }

  document.addEventListener("mouseover", (ev) => {
    const el = ev.target.closest(".popup-server-link");
    if (!el) return;
    if (parentPopup.classList.contains("hidden")) return;

    const server = getServerByName(dashboardServers, el.dataset.serverName || "");
    if (!server) return;

    title.textContent = `Server: ${server.name}`;
    loader.textContent = server.loader || "Unknown";
    world.textContent = server.worldName || "(no world)";
    mods.textContent = Array.isArray(server.modIds) ? String(server.modIds.length) : "0";

    popup.classList.remove("hidden");
    const rect = el.getBoundingClientRect();
    placePopup(popup, rect.right, rect.top);
  });

  document.addEventListener("mousemove", (ev) => {
    const el = ev.target.closest(".popup-server-link");
    if (!el) return;
    if (popup.classList.contains("hidden")) return;

    placePopup(popup, ev.clientX, ev.clientY);
  });

  document.addEventListener("mouseout", (ev) => {
    const el = ev.target.closest(".popup-server-link");
    if (!el) return;

    const related = ev.relatedTarget;
    if (related && (el.contains(related) || popup.contains(related))) return;

    hide();
  });

  parentPopup.addEventListener("mouseleave", hide);
}

function bindPopupWorldLinkInServerPopup() {
  const popup = document.getElementById("popupChildWorld");
  const parentPopup = document.getElementById("serverPopup");
  if (!popup || !parentPopup) return;

  const title = document.getElementById("popupChildWorldTitle");
  const usedBy = document.getElementById("popupChildWorldUsedBy");

  function hide() {
    popup.classList.add("hidden");
  }

  document.addEventListener("mouseover", (ev) => {
    const el = ev.target.closest(".popup-world-link");
    if (!el) return;
    if (parentPopup.classList.contains("hidden")) return;

    const worldName = (el.dataset.worldName || "").trim();
    const users = getServersUsingWorld(dashboardServers, worldName);

    title.textContent = `World: ${worldName}`;
    usedBy.innerHTML = users.length
      ? users.map(s => `<div>${escapeHtml(s.name)}</div>`).join("")
      : `<div class="muted">Not currently used by any server.</div>`;

    popup.classList.remove("hidden");
    const rect = el.getBoundingClientRect();
    placePopup(popup, rect.right, rect.top);
  });

  document.addEventListener("mousemove", (ev) => {
    const el = ev.target.closest(".popup-world-link");
    if (!el) return;
    if (popup.classList.contains("hidden")) return;

    placePopup(popup, ev.clientX, ev.clientY);
  });

  document.addEventListener("mouseout", (ev) => {
    const el = ev.target.closest(".popup-world-link");
    if (!el) return;

    const related = ev.relatedTarget;
    if (related && (el.contains(related) || popup.contains(related))) return;

    hide();
  });

  parentPopup.addEventListener("mouseleave", hide);
}

function bindPopupNavigation() {
  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".popup-nav-btn");
    if (!btn) return;

    ev.stopPropagation();

    const type = btn.dataset.navType;

    if (type === "server") {
      const name = btn.dataset.serverName;
      console.log("Navigate to server:", name);
      toast(`Navigate to server: ${name} (future)`);
    }

    if (type === "world") {
      const name = btn.dataset.worldName;
      console.log("Navigate to world:", name);
      toast(`Navigate to world: ${name} (future)`);
    }
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

function getServersUsingWorld(servers, worldName) {
  return servers.filter(s => (s.worldName || "").trim() === worldName.trim());
}

function getServerByName(servers, serverName) {
  return servers.find(s => (s.name || "").trim() === serverName.trim()) || null;
}

let dashboardServers = [];

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
    const loader = escapeHtml(s.loader || "Unknown");
    const modsCount = Array.isArray(s.modIds) ? s.modIds.length : 0;

    return `
      <div class="mini-card hover-server" data-server-id="${id}" 
        data-server-name="${name}" data-world="${world}" 
        data-loader="${loader}" data-mod-count="${modsCount}"
      >
        <div class="mini-title"><span class="hoverable serverName">${name}</span></div>
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
  bindServerHoverPopup();
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
          <div class="server-tile hover-server" data-server-name="${r.label} ${m.label}"
            data-loader="${r.label}" data-world="${r.defaultWorld}"
            data-mod-count="0" >
            <div class="tile-title"><span class="hoverable serverName">${r.label} ${m.label}</span></div>
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
          <div class="server-tile" data-server-id="${id}"
            data-server-name="${name}" data-world="${world}"
            data-loader="${escapeHtml(s.loader || r.label)}"
            data-mod-count="${modsCount}">
            <div class="tile-title"><span class="hoverable serverName">${name}</span></div>
            <div class="tile-world">World: <span class="hoverable worldName">${world}</span></div>
            <div class="muted title-mods">Mods: ${modsCount}</div>
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
  bindServerHoverPopup();
}

async function loadDashboardData() {
  const servers = await loadServers();
  dashboardServers = servers;
  renderLastPlayed(servers);
  renderGrid(servers);
}

window.addEventListener("DOMContentLoaded", async () => {
  bindModeToggle();
  bindSidebar();
  bindCarousel();
  bindWorldHoverPopup();
  bindServerHoverPopup();
  bindPopupServerLinksInWorldPopup();
  bindPopupWorldLinkInServerPopup();
  bindPopupNavigation(); 
  await refreshStatus();
  await loadDashboardData();
});
