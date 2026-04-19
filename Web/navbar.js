function renderNavbar() {
  const mount = document.getElementById("navbar");
  if (!mount) return;

  const currentPage = document.body.getAttribute("data-page") || "home";

  mount.innerHTML = `
    <header class="topbar">
      <a class="brand" href="./index.html">ainanocat</a>
      <div class="topbar-right">
        <nav class="nav-links">
          <a class="nav-link ${currentPage === "home" ? "active" : ""}" href="./index.html" data-i18n="navHome"></a>
          <a class="nav-link ${currentPage === "about" ? "active" : ""}" href="./about.html" data-i18n="navAbout"></a>
          <a class="nav-link ${currentPage === "contact" ? "active" : ""}" href="./contact.html" data-i18n="navContact"></a>
        </nav>
      </div>
    </header>
  `;
}

window.renderNavbar = renderNavbar;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderNavbar);
} else {
  renderNavbar();
}
