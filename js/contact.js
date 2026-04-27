/* ============================================
   ЗЛАТНА НИТ — Contact Form Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    initContactForm();
  }
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateContactForm(form)) return;
    
    const formData = new FormData(form);
    
    const message = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      subject: formData.get('subject'),
      message: formData.get('message'),
      read: false
    };
    
    DB.add('messages', message);
    
    showToast('Vaša poruka je uspešno poslata! Odgovorićemo vam u najkraćem roku.', 'success');
    form.reset();
    
    // Show success state
    const successEl = document.getElementById('contact-success');
    if (successEl) {
      successEl.style.display = 'block';
      form.style.display = 'none';
      
      // Reset after 5 seconds
      setTimeout(() => {
        successEl.style.display = 'none';
        form.style.display = 'block';
      }, 5000);
    }
  });
}

function validateContactForm(form) {
  let valid = true;
  
  // Clear previous errors
  form.querySelectorAll('.form-error').forEach(el => el.remove());
  form.querySelectorAll('.form-input, .form-textarea').forEach(el => el.style.borderColor = '');
  
  const name = form.querySelector('[name="name"]');
  const email = form.querySelector('[name="email"]');
  const subject = form.querySelector('[name="subject"]');
  const message = form.querySelector('[name="message"]');
  
  if (!name.value.trim()) {
    showFieldError(name, 'Ime je obavezno');
    valid = false;
  }
  
  if (!email.value.trim()) {
    showFieldError(email, 'Email je obavezan');
    valid = false;
  } else if (!isValidEmail(email.value)) {
    showFieldError(email, 'Unesite validan email');
    valid = false;
  }
  
  if (!subject.value.trim()) {
    showFieldError(subject, 'Izaberite temu');
    valid = false;
  }
  
  if (!message.value.trim()) {
    showFieldError(message, 'Poruka je obavezna');
    valid = false;
  } else if (message.value.trim().length < 10) {
    showFieldError(message, 'Poruka mora imati najmanje 10 karaktera');
    valid = false;
  }
  
  return valid;
}

function showFieldError(field, message) {
  field.style.borderColor = 'var(--error)';
  const error = document.createElement('p');
  error.className = 'form-error';
  error.textContent = message;
  field.parentNode.appendChild(error);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
