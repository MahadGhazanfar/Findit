// FindIt — frontend demo. Reports are stored in this browser via localStorage.

const starterItems = [
  { id: 1, name: "Black Wallet",          status: "Lost",  category: "Wallet / ID Card",    location: "University Library",  date: "2026-10-17", description: "A small black wallet with student ID cards inside.", icon: "👛", art: "",           contactName: "Ali",    contact: "Contact through campus office" },
  { id: 2, name: "Blue Water Bottle",     status: "Found", category: "Other",               location: "Main Cafeteria",      date: "2026-10-18", description: "Blue bottle left on a cafeteria table.",            icon: "🧴", art: "art-green",  contactName: "Sara",   contact: "Contact through campus office" },
  { id: 3, name: "Student Notebook",      status: "Lost",  category: "Books & Stationery",  location: "Computer Lab",        date: "2026-10-16", description: "A notebook with a dark blue cover.",                icon: "📓", art: "art-purple", contactName: "Ahmed",  contact: "Contact through campus office" },
  { id: 4, name: "Key Ring",              status: "Found", category: "Keys",                location: "Parking Area",        date: "2026-10-19", description: "A small set of keys with a metal ring.",            icon: "🔑", art: "art-yellow", contactName: "Hira",   contact: "Contact through campus office" },
  { id: 5, name: "Grey Backpack",         status: "Lost",  category: "Bags",                location: "Lecture Hall 2",      date: "2026-10-15", description: "Grey backpack with a front pocket.",                icon: "🎒", art: "",           contactName: "Usman",  contact: "Contact through campus office" },
  { id: 6, name: "Wireless Earbuds Case", status: "Found", category: "Electronics",         location: "Student Lounge",      date: "2026-10-19", description: "White earbuds charging case, no earbuds inside.",   icon: "🎧", art: "art-green",  contactName: "Mina",   contact: "Contact through campus office" }
];

/* ── Storage helpers ──────────────────────────────── */
function getItems() {
  try {
    const saved = JSON.parse(localStorage.getItem("findit-items"));
    return Array.isArray(saved) ? saved : starterItems;
  } catch {
    return starterItems;
  }
}

function saveItems(items) {
  localStorage.setItem("findit-items", JSON.stringify(items));
}

/* ── Utility helpers ──────────────────────────────── */
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}

function formatDate(dateString) {
  if (!dateString) return "Date not provided";
  const date = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? dateString
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function iconForCategory(category) {
  const icons = {
    "Electronics":        "🎧",
    "Wallet / ID Card":   "👛",
    "Books & Stationery": "📓",
    "Bags":               "🎒",
    "Keys":               "🔑",
    "Clothing":           "🧥",
    "Other":              "📦"
  };
  return icons[category] || "📦";
}

/* ── Card builder ─────────────────────────────────── */
function itemCard(item) {
  const statusClass = item.status === "Found" ? "found" : "";
  const artClass    = item.art || "";
  return `
    <article class="item-card">
      <div class="item-art ${artClass}">
        <span class="status-badge ${statusClass}">${escapeHTML(item.status)}</span>
        <span aria-hidden="true">${escapeHTML(item.icon || "📦")}</span>
      </div>
      <div class="item-body">
        <p class="item-category">${escapeHTML(item.category)}</p>
        <h3>${escapeHTML(item.name)}</h3>
        <p class="item-meta">📍 <span>${escapeHTML(item.location)}</span></p>
        <p class="item-meta">📅 <span>${escapeHTML(formatDate(item.date))}</span></p>
        <p class="item-description">${escapeHTML(item.description)}</p>
        <div class="item-footer">
          <span>Reported by <strong>${escapeHTML(item.contactName || "Community member")}</strong></span>
          <strong>${escapeHTML(item.status)}</strong>
        </div>
      </div>
    </article>`;
}

/* ── Render functions ─────────────────────────────── */
function renderHomeItems() {
  const target = document.getElementById("homeItems");
  if (!target) return;
  target.innerHTML = getItems().slice(0, 3).map(itemCard).join("");
}

function renderAllItems() {
  const target = document.getElementById("allItems");
  if (!target) return;

  const search   = (document.getElementById("searchInput")?.value   || "").trim().toLowerCase();
  const status   = document.getElementById("statusFilter")?.value   || "All";
  const category = document.getElementById("categoryFilter")?.value || "All";

  const filtered = getItems().filter((item) => {
    const searchable = `${item.name} ${item.category} ${item.location} ${item.description}`.toLowerCase();
    return (
      searchable.includes(search) &&
      (status   === "All" || item.status   === status) &&
      (category === "All" || item.category === category)
    );
  });

  target.innerHTML = filtered.map(itemCard).join("");

  const count = document.getElementById("resultsCount");
  const empty = document.getElementById("emptyState");
  if (count) count.textContent = `Showing ${filtered.length} item${filtered.length === 1 ? "" : "s"}`;
  if (empty) empty.hidden = filtered.length > 0;
}

/* ── Report form ──────────────────────────────────── */
function setupReportForm() {
  const form = document.getElementById("reportForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const newItem  = {
      id:          Date.now(),
      name:        formData.get("itemName").trim(),
      status:      formData.get("status"),
      category:    formData.get("category"),
      date:        formData.get("date"),
      location:    formData.get("location").trim(),
      description: formData.get("description").trim(),
      contactName: formData.get("contactName").trim(),
      contact:     formData.get("contact").trim(),
      icon:        iconForCategory(formData.get("category")),
      art:         ""
    };

    const items = getItems();
    items.unshift(newItem);
    saveItems(items);

    // Show success message (scroll UP to top of form, not bottom of page)
    const message = document.getElementById("formMessage");
    if (message) {
      message.textContent = "✓ Report saved! Your item is now visible on the View Items page.";
      message.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    form.reset();
  });
}

/* ── Filters ──────────────────────────────────────── */
function setupFilters() {
  const ids = ["searchInput", "statusFilter", "categoryFilter"];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(id === "searchInput" ? "input" : "change", renderAllItems);
  });
}

/* ── Mobile menu ──────────────────────────────────── */
function setupMobileMenu() {
  const button = document.getElementById("menuToggle");
  const links  = document.getElementById("navLinks");
  if (button && links) {
    button.addEventListener("click", () => links.classList.toggle("open"));
  }
}

/* ── Init ─────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderHomeItems();
  renderAllItems();
  setupReportForm();
  setupFilters();
  setupMobileMenu();
});
