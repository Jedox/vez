/* ============================================
   ЗЛАТНА НИТ — Gallery Logic
   Masonry grid, filtering, lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    initGallery();
  }
});

function initGallery() {
  renderGallery('all');
  initGalleryFilters();
}

function initGalleryFilters() {
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.category);
    });
  });
}

function renderGallery(category) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  
  // Use product images from DB + gallery images
  const products = DB.getAll('products');
  let items = [];
  
  // Create gallery items from products
  products.forEach((p, idx) => {
    const img = p.images && p.images.length > 0
      ? p.images[0]
      : getGalleryPlaceholder(p, idx);
    
    items.push({
      src: img,
      alt: p.title,
      category: p.category,
      title: p.title
    });
  });
  
  // Filter
  if (category !== 'all') {
    items = items.filter(item => item.category === category);
  }
  
  // Render
  grid.innerHTML = items.map((item, idx) => `
    <div class="gallery-item" onclick="openLightbox(${idx}, '${category}')" style="animation-delay: ${idx * 0.05}s">
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
      <div class="gallery-item-overlay">
        <p>${item.title}</p>
      </div>
    </div>
  `).join('');
  
  // Store current items for lightbox
  window._galleryItems = items;
}

function getGalleryPlaceholder(product, idx) {
  const colors = ['1B2A3D', '2C4A3E', '3A2A1B', '1B3D2A', '2A1B3D'];
  const bg = colors[idx % colors.length];
  return `https://placehold.co/600x${400 + (idx % 3) * 200}/${bg}/C6A962?text=${encodeURIComponent(product.title.substring(0, 12))}`;
}

/* ── Lightbox ── */

let currentLightboxIndex = 0;

function openLightbox(index, category) {
  currentLightboxIndex = index;
  const items = window._galleryItems || [];
  if (items.length === 0) return;
  
  const item = items[index];
  
  // Create lightbox if not exists
  let lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'gallery-lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" onclick="closeLightbox()">✕</button>
      <button class="lightbox-nav lightbox-prev" onclick="navigateLightbox(-1)">‹</button>
      <img src="" alt="" id="lightbox-image">
      <button class="lightbox-nav lightbox-next" onclick="navigateLightbox(1)">›</button>
    `;
    document.body.appendChild(lightbox);
    
    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }
  
  const img = document.getElementById('lightbox-image');
  img.src = item.src;
  img.alt = item.alt;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function navigateLightbox(direction) {
  const items = window._galleryItems || [];
  if (items.length === 0) return;
  
  currentLightboxIndex = (currentLightboxIndex + direction + items.length) % items.length;
  const item = items[currentLightboxIndex];
  
  const img = document.getElementById('lightbox-image');
  img.src = item.src;
  img.alt = item.alt;
}
