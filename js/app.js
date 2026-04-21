const AppUI = {
  init() {
    this.initTheme();
    this.initMobileMenu();
    this.checkAuthState();
    this.initLogout();
  },

  initTheme() {
    const toggleBtn = document.getElementById('darkToggle');
    if (!toggleBtn) return;
    const icon = toggleBtn.querySelector('i');
    
    const setDark = (isDark) => {
      if (isDark) {
        document.body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem("darkMode", "enabled");
      } else {
        document.body.classList.remove('dark-mode');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem("darkMode", "disabled");
      }
    };

    if (localStorage.getItem("darkMode") === "enabled") {
      setDark(true);
    } else if (localStorage.getItem("darkMode") === "disabled") {
      setDark(false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       setDark(true);
    }

    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      setDark(!isDark);
    });
  },

  initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && navLinks.classList.contains('active')) {
         navLinks.classList.remove('active');
         menuToggle.classList.remove('active');
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('header') && navLinks.classList.contains('active')) {
         navLinks.classList.remove('active');
         menuToggle.classList.remove('active');
      }
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active'); 
        menuToggle.classList.remove('active'); 
      });
    });
  },

  checkAuthState() {
    const actionBtn = document.getElementById('action-btn');
    const logoutBtn = document.getElementById('logoutBtn');
    if(!actionBtn) return;

    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const isSubDir = window.location.pathname.includes('/html/') && !window.location.pathname.endsWith('/frontendprotfolio-main/');
    const basePath = isSubDir ? '../' : './';
    
    if (userLoggedIn === "true") {
      actionBtn.innerHTML = `<span>Dashboard</span> <i class="fa-solid fa-chart-line"></i>`;
      actionBtn.href = `${basePath}html/dashboard.html`;
      
      // If we are on dashboard, hide the "Dashboard" action button and show ONLY "Logout" button
      if (window.location.pathname.includes('dashboard.html')) {
          actionBtn.style.display = 'none';
          if(logoutBtn) logoutBtn.style.display = 'flex';
      }
    } else {
      actionBtn.innerHTML = `<span>Sign In</span> <i class="fa-solid fa-arrow-right"></i>`;
      actionBtn.href = `${basePath}html/login.html`;
      if(logoutBtn) logoutBtn.style.display = 'none';
    }
  },

  initLogout() {
    const btn = document.getElementById('logoutBtn');
    if(btn) {
        btn.addEventListener('click', () => {
            localStorage.setItem('userLoggedIn', 'false');
            const isSubDir = window.location.pathname.includes('/html/') && !window.location.pathname.endsWith('/frontendprotfolio-main/');
            window.location.href = isSubDir ? '../index.html' : './index.html';
        });
    }
  }
};

document.addEventListener("componentsLoaded", () => AppUI.init());
