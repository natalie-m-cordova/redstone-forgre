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

window.addEventListener("DOMContentLoaded", async () => {
  bindModeToggle();
  bindSidebar();
  bindButtons();
  bindCarousel();
  bindWorldHoverPopup();
  await refreshStatus();
});
