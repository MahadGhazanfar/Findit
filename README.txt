============================================================
  FindIt — Lost & Found Campus Portal
  Student Project | MERN Stack (Frontend Demo Phase)
============================================================

STRUCTURE
---------
FindIt/
  index.html        → Home page (hero + how it works + recent items)
  report.html       → Report a lost or found item (form)
  items.html        → Browse all items (search + filter)
  css/style.css     → All styles (violet/purple palette, responsive)
  js/script.js      → Vanilla JS logic (localStorage, card rendering)
  App.jsx           → React version of item card (reference component)
  README.txt        → This file

HOW TO RUN (NO INSTALL NEEDED)
-------------------------------
Option 1 — Double-click (simplest):
  Open index.html directly in any web browser (Chrome, Edge, Firefox).
  All three pages work out of the box.

Option 2 — VS Code Live Server (recommended for development):
  1. Open the FindIt folder in VS Code.
  2. Install the "Live Server" extension (if not installed).
  3. Right-click index.html → "Open with Live Server".
  4. Browser opens at http://127.0.0.1:5500/index.html

Option 3 — Python local server:
  Open a terminal in the FindIt folder, then run:
    python -m http.server 5500
  Open http://localhost:5500 in your browser.

PAGES
------
  Home (index.html)       → Landing page, hero section, how it works, recent items
  Report (report.html)    → Form to report lost or found item (saved to localStorage)
  View Items (items.html) → Search & filter all reported items

FEATURES
---------
  - Submit a lost/found item via the form (persists in browser localStorage)
  - Browse, search and filter all items by name, status, or category
  - Fully responsive (works on mobile, tablet, desktop)
  - No server or install required — pure HTML + CSS + JS

NOTE ON App.jsx
---------------
  App.jsx is a React reference file showing how the ItemCard component
  would look in React. It requires a React build setup (Vite or Create
  React App) to run separately and is NOT linked to the HTML pages.

COLOR PALETTE
-------------
  Primary   : #5c3bfe  (Vivid Violet)
  Accent    : #ff6b35  (Warm Orange)
  Dark text : #14103a
  Muted     : #7269a0
  Success   : #12895c

© 2026 FindIt Student Project
============================================================
