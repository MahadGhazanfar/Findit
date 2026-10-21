import React, { useState } from "react";

// NOTE: This file is the React reference component for the FindIt project.
// The main pages (index.html, items.html, report.html) use vanilla HTML + JS
// to keep things beginner-friendly without a build step.
// This App.jsx shows how the same UI would look in React.

const SAMPLE_ITEMS = [
  {
    id: 1,
    name: "Black Wallet",
    status: "Lost",
    category: "Wallet / ID Card",
    location: "University Library",
    date: "2026-10-17",
    description: "A small black wallet with student ID cards inside.",
    icon: "👛",
    art: "",
    contactName: "Ali",
  },
  {
    id: 2,
    name: "Blue Water Bottle",
    status: "Found",
    category: "Other",
    location: "Main Cafeteria",
    date: "2026-10-18",
    description: "Blue bottle left on a cafeteria table.",
    icon: "🧴",
    art: "art-green",
    contactName: "Sara",
  },
  {
    id: 3,
    name: "Key Ring",
    status: "Found",
    category: "Keys",
    location: "Parking Area",
    date: "2026-10-19",
    description: "A small set of keys with a metal ring.",
    icon: "🔑",
    art: "art-yellow",
    contactName: "Hira",
  },
];

function formatDate(dateString) {
  if (!dateString) return "Date not provided";
  const d = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? dateString
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// Reusable item card component
function ItemCard({ item }) {
  const isFound = item.status === "Found";
  return (
    <article className="item-card">
      <div className={`item-art ${item.art || ""}`}>
        <span className={`status-badge ${isFound ? "found" : ""}`}>
          {item.status}
        </span>
        <span aria-hidden="true">{item.icon || "📦"}</span>
      </div>
      <div className="item-body">
        <p className="item-category">{item.category}</p>
        <h3>{item.name}</h3>
        <p className="item-meta">📍 <span>{item.location}</span></p>
        <p className="item-meta">📅 <span>{formatDate(item.date)}</span></p>
        <p className="item-description">{item.description}</p>
        <div className="item-footer">
          <span>
            Reported by <strong>{item.contactName || "Community member"}</strong>
          </span>
          <strong>{item.status}</strong>
        </div>
      </div>
    </article>
  );
}

// Main App component
export default function App() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? SAMPLE_ITEMS
      : SAMPLE_ITEMS.filter((item) => item.status === filter);

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", padding: "30px", maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 6 }}>FindIt — React Preview</h2>
      <p style={{ color: "#7269a0", marginBottom: 20 }}>
        Showing {filtered.length} item{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Simple filter buttons */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {["All", "Lost", "Found"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 18px",
              borderRadius: 9,
              border: "none",
              background: filter === f ? "#5c3bfe" : "#ede8ff",
              color: filter === f ? "#fff" : "#5c3bfe",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="items-grid">
        {filtered.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
