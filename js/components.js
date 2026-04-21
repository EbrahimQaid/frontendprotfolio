const isSubDir = window.location.pathname.includes('/html/') && !window.location.pathname.endsWith('/frontendprotfolio-main/');
const basePath = isSubDir ? '../' : './';

function renderHeader() {
  const headerHtml = `
    <header>
      <nav class="nav-container">
        <a class="logo-container" href="${basePath}index.html">
          <img class="logo-image" src="${basePath}image/loupe.png" alt="logo-image">
          <span class="logo-text">Pro<span>Fly</span></span>
        </a>
        
        <ul class="nav-links">
          <li><a href="${basePath}index.html">Home</a></li>
          <li><a href="${basePath}html/gallery.html">Gallery</a></li>
          <li><a href="${basePath}html/about.html">About</a></li>
          <li><a href="${basePath}html/contact.html">Contact</a></li>
        </ul>

        <div class="header-right">
          <button id="darkToggle" class="dark-toggle" aria-label="Toggle Dark Mode">
            <i class="fa-regular fa-moon"></i>
          </button>
          <div class="notification" aria-label="Notifications">
            <i class="fa-regular fa-bell"></i>
            <span class="notification-count">3</span>
          </div>
          <a class="sign-button" href="${basePath}html/login.html" id="action-btn">
            <span>Sign In</span> <i class="fa-solid fa-arrow-right"></i>
          </a>
          <button id="logoutBtn" class="sign-button" style="border:none; cursor:pointer; display:none;" aria-label="Logout">
            <span>Logout</span> <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
          <div class="menu-toggle" id="mobile-menu">
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>
    </header>
  `;
  const headerContainer = document.getElementById('app-header');
  if (headerContainer) {
      headerContainer.innerHTML = headerHtml;
  }
}

function renderFooter() {
  const footerHtml = `
    <footer>
      <div class="footer-content">
        <div class="logo-container" style="justify-content: center; margin-bottom: 5px;">
          <span class="logo-text" style="font-size: 1.5rem;">Pro<span>Fly</span></span>
        </div>
        <nav class="footer-nav">
          <a href="${basePath}html/question.html">FAQ / Question</a>
          <a href="${basePath}html/about.html">About Us</a>
          <a href="${basePath}html/contact.html">Contact Support</a>
        </nav>
        <p class="footer-copy">© 2026 ProFly. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  `;
  const footerContainer = document.getElementById('app-footer');
  if (footerContainer) {
      footerContainer.innerHTML = footerHtml;
  }
}

document.addEventListener('DOMContentLoaded', () => {
    // Generate components
    renderHeader();
    renderFooter();
    // After generating, trigger an event so app.js can init listeners
    document.dispatchEvent(new Event('componentsLoaded'));
});
