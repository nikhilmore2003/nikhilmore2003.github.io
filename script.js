/* =========================================================
   LEARNING LOG — add new things you learn here.
   Copy one { ... } block, paste it at the TOP of the list,
   and change the text. Newest entries show first.
   - date:  shown on the card, e.g. "Oct 2026"
   - tag:   category used for the filter buttons (SQL, Power BI, Python, Excel, ML, Other)
   - title: what you learned
   - text:  one or two lines in your own words
   - link:  optional — a repo, notebook, certificate or article ("" to hide)
   ========================================================= */
const LEARNING_LOG = [
  {
    date: "Mar 2026",
    tag: "Power BI",
    title: "DAX measures & KPI cards",
    text: "Built KPI cards for total sales, average sales and items sold, and learned how measures differ from calculated columns.",
    link: "https://github.com/nikhilmore2003/Blinkit-Sales-Analysis-PowerBI"
  },
  {
    date: "Feb 2026",
    tag: "Python",
    title: "Cleaning data with Pandas",
    text: "Handling missing values, duplicates and wrong data types in CSV and Excel files before any analysis.",
    link: ""
  },
  {
    date: "2026",
    tag: "SQL",
    title: "CTEs and window functions",
    text: "Used WITH clauses, RANK() and OVER() to answer ranking questions like top countries and most profitable titles.",
    link: "https://github.com/nikhilmore2003/Netflix-SQL-Analytics"
  },
  {
    date: "2025",
    tag: "ML",
    title: "LSTM for time-series forecasting",
    text: "Learned how scaling, 100-day windows and train–test splits work, and why LSTM forecasts lag behind sudden price moves.",
    link: ""
  }
];

/* ================= THEME TOGGLE ================= */
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* ================= MOBILE MENU ================= */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

/* ================= NAV SHADOW, PROGRESS BAR, ACTIVE LINK ================= */
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const sections = document.querySelectorAll("main section[id]");
const linkMap = {};
navLinks.querySelectorAll("a").forEach((a) => (linkMap[a.getAttribute("href").slice(1)] = a));

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";

  let current = "";
  sections.forEach((s) => { if (y >= s.offsetTop - 120) current = s.id; });
  Object.values(linkMap).forEach((a) => a.classList.remove("active"));
  if (linkMap[current]) linkMap[current].classList.add("active");
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ================= TYPING EFFECT ================= */
const words = ["SQL", "Power BI", "Python", "Advanced Excel", "Pandas", "DAX"];
const typedEl = document.getElementById("typed");
let wi = 0, ci = words[0].length, deleting = true;

function typeLoop() {
  const word = words[wi];
  typedEl.textContent = word.slice(0, ci);
  if (deleting) {
    ci--;
    if (ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
  } else {
    ci++;
    if (ci > words[wi].length) { deleting = true; setTimeout(typeLoop, 1400); return; }
  }
  setTimeout(typeLoop, deleting ? 60 : 110);
}
setTimeout(typeLoop, 1600);

/* ================= REVEAL ON SCROLL + COUNTERS ================= */
function animateCount(el) {
  const target = +el.dataset.count;
  const start = performance.now();
  const dur = 1200;
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      io.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
function observeReveals(scope = document) {
  scope.querySelectorAll(".reveal:not(.visible)").forEach((el) => io.observe(el));
}

/* ================= PROJECT FILTER ================= */
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      card.classList.toggle("hide", f !== "all" && card.dataset.cat !== f);
    });
  });
});

/* ================= LEARNING LOG RENDER ================= */
const learnList = document.getElementById("learnList");
const learnFilters = document.getElementById("learnFilters");

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderLearning(tag = "All") {
  const items = tag === "All" ? LEARNING_LOG : LEARNING_LOG.filter((i) => i.tag === tag);
  learnList.innerHTML = items
    .map(
      (i) => `
      <article class="learn-card reveal">
        <div class="learn-meta">
          <span class="learn-tag">${escapeHTML(i.tag)}</span>
          <span class="learn-date">${escapeHTML(i.date)}</span>
        </div>
        <h3>${escapeHTML(i.title)}</h3>
        <p>${escapeHTML(i.text)}</p>
        ${i.link ? `<a href="${escapeHTML(i.link)}" target="_blank" rel="noopener">View →</a>` : ""}
      </article>`
    )
    .join("");
  observeReveals(learnList);
}

const tags = ["All", ...new Set(LEARNING_LOG.map((i) => i.tag))];
learnFilters.innerHTML = tags
  .map((t, idx) => `<button class="learn-filter${idx === 0 ? " active" : ""}" data-tag="${escapeHTML(t)}">${escapeHTML(t)}</button>`)
  .join("");
learnFilters.addEventListener("click", (e) => {
  const btn = e.target.closest(".learn-filter");
  if (!btn) return;
  learnFilters.querySelectorAll(".learn-filter").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderLearning(btn.dataset.tag);
});
renderLearning();
observeReveals();

/* ================= COPY EMAIL ================= */
const toast = document.getElementById("toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}
document.getElementById("copyEmail").addEventListener("click", async () => {
  const email = "nikhilmore2003430@gmail.com";
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copied ✓");
  } catch (e) {
    showToast(email);
  }
});

/* ================= FOOTER YEAR ================= */
document.getElementById("year").textContent = new Date().getFullYear();
