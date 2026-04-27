/* ============================================
   ЗЛАТНА НИТ — Products Logic
   Catalog rendering, search, filter, detail
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const catalogGrid = document.getElementById('catalog-products-grid');
  const detailContainer = document.getElementById('product-detail-container');
  
  if (catalogGrid) {
    initCatalog();
  }
  if (detailContainer) {
    initProductDetail();
  }
});

/* ── Catalog Page ── */

function initCatalog() {
  const urlCategory = getUrlParam('category');
  
  // Set initial category from URL
  if (urlCategory) {
    setActiveCategory(urlCategory);
  }
  
  // Render initial products
  renderProducts();
  
  // Search input
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => renderProducts(), 300);
    });
  }
  
  // Sort select
  const sortSelect = document.getElementById('catalog-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => renderProducts());
  }
  
  // Category items
  document.querySelectorAll('.catalog-category-item').forEach(item => {
    item.addEventListener('click', () => {
      setActiveCategory(item.dataset.category);
      renderProducts();
    });
  });
}

function setActiveCategory(category) {
  document.querySelectorAll('.catalog-category-item').forEach(item => {
    item.classList.toggle('active', item.dataset.category === category);
  });
}

function getActiveCategory() {
  const active = document.querySelector('.catalog-category-item.active');
  return active ? active.dataset.category : 'all';
}

function renderProducts() {
  const grid = document.getElementById('catalog-products-grid');
  if (!grid) return;
  
  const searchInput = document.getElementById('catalog-search-input');
  const sortSelect = document.getElementById('catalog-sort');
  
  const filters = {
    category: getActiveCategory(),
    search: searchInput ? searchInput.value : '',
    sort: sortSelect ? sortSelect.value : 'newest'
  };
  
  const products = DB.filter('products', filters);
  
  // Update count
  const countEl = document.getElementById('catalog-count');
  if (countEl) {
    countEl.textContent = `${products.length} ${products.length === 1 ? 'proizvod' : 'proizvoda'}`;
  }
  
  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-4xl) 0;">
        <p style="font-size: var(--text-xl); color: var(--text-muted); margin-bottom: var(--space-md);">🔍</p>
        <h3 style="margin-bottom: var(--space-sm);">Nema pronađenih proizvoda</h3>
        <p style="color: var(--text-secondary);">Pokušajte sa drugačijim filterima ili pretragom.</p>
      </div>`;
    return;
  }
  
  grid.innerHTML = products.map(p => getProductCardHTML(p)).join('');
  
  // Re-init scroll animations for new elements
  initScrollAnimations();
}

/* ── Product Detail Page ── */

function initProductDetail() {
  const productId = getUrlParam('id');
  if (!productId) {
    window.location.href = 'products.html';
    return;
  }
  
  const product = DB.getById('products', productId);
  if (!product) {
    window.location.href = 'products.html';
    return;
  }
  
  renderProductDetail(product);
  renderRelatedProducts(product);
  initOrderForm(product);
}

function renderProductDetail(product) {
  const container = document.getElementById('product-detail-container');
  if (!container) return;
  
  const mainImg = product.images && product.images.length > 0
    ? product.images[0]
    : `https://placehold.co/800x1000/1B2A3D/C6A962?text=${encodeURIComponent(product.title.substring(0, 20))}`;
  
  const thumbs = product.images && product.images.length > 1
    ? product.images.map((img, i) => `
      <div class="product-gallery-thumb ${i === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
        <img src="${img}" alt="Slika ${i+1}">
      </div>`).join('')
    : '';
  
  const features = product.features
    ? product.features.map(f => `
      <div class="product-feature-item">
        <span class="product-feature-icon">✦</span>
        <span>${f}</span>
      </div>`).join('')
    : '';
  
  // Update page title
  document.title = `${product.title} — Златна Нит`;
  
  // Update breadcrumb
  const breadcrumbTitle = document.getElementById('breadcrumb-product-title');
  if (breadcrumbTitle) breadcrumbTitle.textContent = product.title;
  
  container.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-gallery reveal-left">
        <div class="product-gallery-main">
          <img src="${mainImg}" alt="${product.title}" id="product-main-image">
        </div>
        ${thumbs ? `<div class="product-gallery-thumbs">${thumbs}</div>` : ''}
      </div>
      
      <div class="product-info reveal-right">
        <span class="product-category">${getCategoryName(product.category)}</span>
        <h1>${product.title}</h1>
        <div class="product-price">
          ${formatPrice(product.price)}
        </div>
        
        <p class="product-description">${product.description.replace(/\n/g, '<br>')}</p>
        
        ${features ? `
        <div class="product-features">
          <h4 style="margin-bottom: var(--space-md); font-size: var(--text-md);">Karakteristike</h4>
          ${features}
        </div>` : ''}
        
        <div class="product-order-form" id="product-order-form">
          <h3>Poručite Ovaj Proizvod</h3>
          <form id="order-form" onsubmit="submitOrder(event, '${product.id}')">
            <div class="admin-form-row">
              <div class="form-group">
                <label class="form-label">Vaše Ime *</label>
                <input type="text" class="form-input" name="customerName" required placeholder="Unesite vaše ime">
              </div>
              <div class="form-group">
                <label class="form-label">Telefon *</label>
                <input type="tel" class="form-input" name="customerPhone" required placeholder="+381 ...">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" name="customerEmail" placeholder="vas@email.com">
            </div>
            <div class="admin-form-row">
              <div class="form-group">
                <label class="form-label">Količina</label>
                <input type="number" class="form-input" name="quantity" value="1" min="1" max="10">
              </div>
              <div class="form-group">
                <label class="form-label">Personalizacija</label>
                <input type="text" class="form-input" name="personalization" placeholder="Inicijali, datum...">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Napomena</label>
              <textarea class="form-textarea" name="message" rows="3" placeholder="Dodatne želje ili pitanja..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
              Poruči — ${formatPrice(product.price)}
            </button>
            <p class="form-hint" style="text-align: center; margin-top: var(--space-md);">
              Kontaktiraćemo vas u roku od 24h za potvrdu porudžbine.
            </p>
          </form>
        </div>
      </div>
    </div>`;
    
  initScrollAnimations();
}

function changeMainImage(src, thumbEl) {
  const mainImg = document.getElementById('product-main-image');
  if (mainImg) mainImg.src = src;
  
  document.querySelectorAll('.product-gallery-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

function renderRelatedProducts(currentProduct) {
  const container = document.getElementById('related-products');
  if (!container) return;
  
  const related = DB.filter('products', { category: currentProduct.category })
    .filter(p => p.id !== currentProduct.id)
    .slice(0, 4);
  
  if (related.length === 0) {
    container.closest('section').style.display = 'none';
    return;
  }
  
  container.innerHTML = related.map(p => getProductCardHTML(p)).join('');
}

function initOrderForm(product) {
  // Order form is rendered inside renderProductDetail
}

function submitOrder(event, productId) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const product = DB.getById('products', productId);
  
  const order = {
    productId: productId,
    productTitle: product ? product.title : 'Unknown',
    productPrice: product ? product.price : 0,
    customerName: formData.get('customerName'),
    customerEmail: formData.get('customerEmail') || '',
    customerPhone: formData.get('customerPhone'),
    quantity: parseInt(formData.get('quantity')) || 1,
    personalization: formData.get('personalization') || '',
    message: formData.get('message') || '',
    status: 'new'
  };
  
  DB.add('orders', order);
  
  showToast('Vaša porudžbina je uspešno poslata! Kontaktiraćemo vas uskoro.', 'success');
  form.reset();
  
  // Scroll to top of form
  document.getElementById('product-order-form').scrollIntoView({ behavior: 'smooth' });
}
