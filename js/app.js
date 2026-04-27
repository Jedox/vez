/* ============================================
   ЗЛАТНА НИТ — App Core
   Theme, Navigation, Scroll Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollAnimations();
  initHeroParticles();
  initCounterAnimation();
});

/* ── Theme Toggle ── */

function initTheme() {
  const saved = localStorage.getItem('zlatna_nit_theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  updateThemeIcon();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('zlatna_nit_theme', next);
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.theme-icon').forEach(el => {
    el.textContent = isDark ? '☀️' : '🌙';
  });
}

/* ── Navigation ── */

function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    
    if (current > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = current;
  }, { passive: true });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  const mobileClose = document.querySelector('.nav-mobile-close');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close mobile menu on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── Scroll Reveal Animations ── */

function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  
  if (reveals.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(el => observer.observe(el));
}

/* ── Hero Particles ── */

function initHeroParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = 6 + Math.random() * 6 + 's';
    particle.style.width = 2 + Math.random() * 4 + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/* ── Counter Animation ── */

function initCounterAnimation() {
  const counters = document.querySelectorAll('.count-up');
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const startTime = performance.now();
  
  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.floor(eased * target);
    
    el.textContent = current.toLocaleString('sr-RS');
    
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString('sr-RS');
    }
  }
  
  requestAnimationFrame(step);
}

/* ── Toast Notifications ── */

function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : '✕'}</span>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ── Smooth Scroll ── */

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ── Navigation HTML Generator ── */

function getNavHTML(activePage = '', isHero = false) {
  const heroClass = isHero ? ' nav-hero' : '';
  return `
  <nav class="nav${heroClass}" id="main-nav">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">
        <span class="nav-logo-icon">✦</span>
        <span>Златна Нит</span>
      </a>
      <div class="nav-links">
        <a href="index.html" class="nav-link ${activePage === 'index' ? 'active' : ''}">Početna</a>
        <a href="about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">O Nama</a>
        <a href="products.html" class="nav-link ${activePage === 'products' ? 'active' : ''}">Proizvodi</a>
        <a href="gallery.html" class="nav-link ${activePage === 'gallery' ? 'active' : ''}">Galerija</a>
        <a href="contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Kontakt</a>
      </div>
      <div class="nav-actions">
        <button class="nav-theme-toggle" onclick="toggleTheme()" aria-label="Promeni temu">
          <span class="theme-icon">🌙</span>
        </button>
      </div>
      <button class="nav-mobile-toggle" aria-label="Meni">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  
  <div class="nav-mobile-menu">
    <button class="nav-mobile-close" aria-label="Zatvori meni">✕</button>
    <a href="index.html" class="nav-link">Početna</a>
    <a href="about.html" class="nav-link">O Nama</a>
    <a href="products.html" class="nav-link">Proizvodi</a>
    <a href="gallery.html" class="nav-link">Galerija</a>
    <a href="contact.html" class="nav-link">Kontakt</a>
    <button class="btn btn-primary" onclick="window.location.href='products.html'">Poruči Sada</button>
  </div>`;
}

/* ── Footer HTML Generator ── */

function getFooterHTML() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <span>✦</span> Златна Нит
          </div>
          <p>Ručno izrađeni vez i peškiri za vaše najvažnije trenutke. Tradicija, elegancija i neponovljiv kvalitet u svakom bodu.</p>
          <div class="footer-social">
            <a href="#" aria-label="Instagram" title="Instagram">📷</a>
            <a href="#" aria-label="Facebook" title="Facebook">📘</a>
            <a href="#" aria-label="Pinterest" title="Pinterest">📌</a>
          </div>
        </div>
        
        <div>
          <h4 class="footer-heading">Navigacija</h4>
          <div class="footer-links">
            <a href="index.html">Početna</a>
            <a href="about.html">O Nama</a>
            <a href="products.html">Proizvodi</a>
            <a href="gallery.html">Galerija</a>
            <a href="contact.html">Kontakt</a>
          </div>
        </div>
        
        <div>
          <h4 class="footer-heading">Kategorije</h4>
          <div class="footer-links">
            <a href="products.html?category=wedding">Venčanje</a>
            <a href="products.html?category=baptism">Krštenje</a>
            <a href="products.html?category=slava">Slava</a>
            <a href="products.html?category=embroidery">Sitan Vez</a>
            <a href="products.html?category=gifts">Poklon Setovi</a>
          </div>
        </div>
        
        <div>
          <h4 class="footer-heading">Kontakt</h4>
          <div class="footer-contact-item">
            <span class="icon">📍</span>
            <span>Ulica Kneza Miloša 45,<br>11000 Beograd, Srbija</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">📞</span>
            <span>+381 11 123 4567</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">✉️</span>
            <span>info@zlatnanit.rs</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">🕐</span>
            <span>Pon-Pet: 09:00 - 18:00<br>Sub: 10:00 - 14:00</span>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2025 Златна Нит. Сва права задржана.</p>
        <div class="footer-bottom-links">
          <a href="#">Politika privatnosti</a>
          <a href="#">Uslovi korišćenja</a>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ── Product Card HTML Generator ── */

function getProductCardHTML(product) {
  const img = product.images && product.images.length > 0
    ? product.images[0]
    : `https://placehold.co/400x500/1B2A3D/C6A962?text=${encodeURIComponent(product.title.substring(0, 15))}`;
  
  return `
  <div class="product-card shimmer" onclick="window.location.href='product-detail.html?id=${product.id}'">
    <div class="product-card-image">
      <img src="${img}" alt="${product.title}" loading="lazy">
      ${product.featured ? '<span class="product-card-badge">Izdvojeno</span>' : ''}
    </div>
    <div class="product-card-body">
      <span class="product-card-category">${getCategoryName(product.category)}</span>
      <h3 class="product-card-title">${product.title}</h3>
      <p class="product-card-description">${product.shortDescription}</p>
      <div class="product-card-footer">
        <span class="product-card-price">${formatPrice(product.price)}</span>
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); window.location.href='product-detail.html?id=${product.id}'">
          Poruči
        </button>
      </div>
    </div>
  </div>`;
}

/* ── Head Meta Tags ── */

function getHeadHTML(title, description) {
  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <meta name="keywords" content="vez, peškiri za venčanje, peškiri za krštenje, sitan vez, ručni rad, Srbija, zlatna nit, poklon za venčanje, poklon za krštenje">
  <meta name="author" content="Златна Нит">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/pages.css">
  <link rel="stylesheet" href="css/animations.css">`;
}
