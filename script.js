// ============================================
// SEARCH INPUT - SMOOTH SLIDE OUT
// ============================================

const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-container input');

if (searchContainer && searchInput) {
  // Click on icon to toggle search
  searchContainer.addEventListener('click', (e) => {
    if (e.target.closest('i')) {
      searchContainer.classList.toggle('active');
      if (searchContainer.classList.contains('active')) {
        searchInput.focus();
      }
    }
  });

  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      searchContainer.classList.remove('active');
    }
  });

  // Trigger search on Enter
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      filterProducts();
      searchContainer.classList.remove('active');
    }
  });

  // Debounce search input
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(filterProducts, 300);
  });
}

// ============================================
// HAMBURGER MENU & NAVIGATION
// ============================================

const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const hamburger = document.querySelector('.ham-menu');

if (toggle && navLinks && hamburger) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    toggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
  });

  // Close menu on link click
  const navItems = navLinks.querySelectorAll('.navs, .nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Keyboard support for menu button
  toggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle.click();
    }
  });
}

// ============================================
// PRODUCT SEARCH & FILTERING
// ============================================

function filterProducts() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  const searchTerm = input.value.toLowerCase().trim();
  const products = document.querySelectorAll('.product-card');
  let matchCount = 0;

  products.forEach(product => {
    const name = product.querySelector('.product-name');
    if (!name) return;

    const nameText = name.textContent.toLowerCase();
    const isMatch = nameText.includes(searchTerm);

    product.style.display = isMatch ? 'block' : 'none';
    if (isMatch) matchCount++;
  });

  // Scroll to products if match found
  if (searchTerm.length > 0 && matchCount > 0) {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      setTimeout(() => {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}

// ============================================
// SERVICES SLIDER
// ============================================

const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dots .dot');
let currentSlide = 0;
let autoSlideEnabled = true;
let slideInterval;

function startAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    if (autoSlideEnabled) {
      currentSlide = (currentSlide + 1) % 3;
      updateSlider();
    }
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

function updateSlider() {
  if (!slider) return;
  
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
  });
  
  if (dots[currentSlide]) {
    dots[currentSlide].classList.add('active');
  }
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
  autoSlideEnabled = false;
  stopAutoSlide();
  
  setTimeout(() => {
    autoSlideEnabled = true;
    startAutoSlide();
  }, 5000);

  const aboutContainer = document.querySelector('.about-container');
  if (aboutContainer) {
    aboutContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % 3;
  updateSlider();
  autoSlideEnabled = false;
  stopAutoSlide();
  
  setTimeout(() => {
    autoSlideEnabled = true;
    startAutoSlide();
  }, 5000);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + 3) % 3;
  updateSlider();
  autoSlideEnabled = false;
  stopAutoSlide();
  
  setTimeout(() => {
    autoSlideEnabled = true;
    startAutoSlide();
  }, 5000);
}

// Initialize slider
if (slider) {
  startAutoSlide();
  
  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollUpBtn = document.getElementById('scroll-Up');

if (scrollUpBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollUpBtn.style.opacity = '1';
      scrollUpBtn.style.pointerEvents = 'auto';
    } else {
      scrollUpBtn.style.opacity = '0';
      scrollUpBtn.style.pointerEvents = 'none';
    }
  });

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// SMOOTH SCROLL LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      // Close mobile menu if open
      if (navLinks) {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// WHATSAPP FLOATING BUTTON
// ============================================

const whatsappBtn = document.getElementById('whatsappBtn');
const chatConfirm = document.getElementById('chatConfirm');
let chatReady = false;

function toggleChatConfirm() {
  if (!whatsappBtn || !chatConfirm) return;

  if (!chatReady) {
    chatConfirm.classList.add('active');
    chatReady = true;
    whatsappBtn.setAttribute('aria-expanded', 'true');

    // Hide on scroll
    window.addEventListener('scroll', () => {
      chatConfirm.classList.remove('active');
      chatReady = false;
      whatsappBtn.setAttribute('aria-expanded', 'false');
    });

    // Auto hide after 5 seconds
    setTimeout(() => {
      chatConfirm.classList.remove('active');
      chatReady = false;
      whatsappBtn.setAttribute('aria-expanded', 'false');
    }, 5000);
  } else {
    // Open WhatsApp
    const message = 'Hello, I would like more information about your medical equipment.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/2347049413802?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    chatConfirm.classList.remove('active');
    chatReady = false;
  }
}

if (whatsappBtn) {
  whatsappBtn.addEventListener('click', toggleChatConfirm);
  whatsappBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleChatConfirm();
    }
  });
}

// ============================================
// PRODUCT REQUEST POPUP
// ============================================

const requestPopup = document.getElementById('requestPopup');

function openRequestPopup(productName) {
  if (!requestPopup) return;
  
  const productNameDisplay = document.getElementById('productNameDisplay');
  const productNameInput = document.getElementById('productNameInput');
  
  if (productNameDisplay) productNameDisplay.textContent = productName;
  if (productNameInput) productNameInput.value = productName;
  
  requestPopup.style.display = 'block';
  requestPopup.setAttribute('open', '');
  document.body.style.overflow = 'hidden';
  
  // Focus on first form field for accessibility
  const firstInput = requestPopup.querySelector('input[type="number"]');
  if (firstInput) firstInput.focus();
}

function closeRequestPopup() {
  if (!requestPopup) return;
  
  requestPopup.style.display = 'none';
  requestPopup.removeAttribute('open');
  document.body.style.overflow = 'auto';
}

// Close popup on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && requestPopup && requestPopup.style.display === 'block') {
    closeRequestPopup();
  }
});

// Close popup on background click
if (requestPopup) {
  requestPopup.addEventListener('click', (e) => {
    if (e.target === requestPopup) {
      closeRequestPopup();
    }
  });
}

// ============================================
// BLOG SLIDER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const blogSlider = document.getElementById('blogSlider');
  const sliderDots = document.getElementById('sliderDots');
  const cardWrappers = blogSlider ? blogSlider.querySelectorAll('.blog-card-wrapper') : [];
  const numCards = cardWrappers.length;

  if (numCards === 0 || !sliderDots) return;

  let currentIndex = 0;
  let autoSlideInterval;
  let isAutoSliding = true;
  const slideDuration = 4000;

  // Create dots
  for (let i = 0; i < numCards; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('data-index', i);
    dot.setAttribute('aria-label', `Go to article ${i + 1}`);
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', i === 0);
    
    dot.addEventListener('click', () => {
      jumpToSlide(i);
      pauseAutoSlide(3000);
    });
    
    sliderDots.appendChild(dot);
  }

  // Show slide
  function showSlide(index) {
    if (index >= numCards) index = 0;
    else if (index < 0) index = numCards - 1;
    
    currentIndex = index;

    const targetCard = cardWrappers[currentIndex];
    const scrollLeftPosition = targetCard.offsetLeft - blogSlider.offsetLeft;

    blogSlider.scrollLeft = scrollLeftPosition;
    updateDots(currentIndex);
  }

  // Jump to slide
  function jumpToSlide(index) {
    showSlide(index);
  }

  // Next slide
  function nextSlide() {
    if (isAutoSliding) {
      showSlide(currentIndex + 1);
    }
  }

  // Update dots
  function updateDots(index) {
    const allDots = sliderDots.querySelectorAll('.dot');
    allDots.forEach((dot, i) => {
      dot.classList.remove('active');
      dot.setAttribute('aria-selected', i === index);
    });
    if (allDots[index]) {
      allDots[index].classList.add('active');
    }
  }

  // Auto slide
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function pauseAutoSlide(duration = 5000) {
    stopAutoSlide();
    setTimeout(startAutoSlide, duration);
  }

  // Initialize
  showSlide(currentIndex);
  startAutoSlide();

  // Pause on hover
  if (blogSlider) {
    blogSlider.addEventListener('mouseenter', stopAutoSlide);
    blogSlider.addEventListener('mouseleave', startAutoSlide);

    // Pause on focus
    cardWrappers.forEach(wrapper => {
      const link = wrapper.querySelector('a');
      if (link) {
        link.addEventListener('focus', stopAutoSlide);
        link.addEventListener('blur', startAutoSlide);
      }
    });

    // Re-evaluate on manual scroll
    let scrollTimeout;
    blogSlider.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      
      const scrollPos = blogSlider.scrollLeft;
      const cardWidth = cardWrappers[0].offsetWidth;
      const gap = 32; // 2rem gap
      
      let newIndex = Math.round(scrollPos / (cardWidth + gap));
      
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateDots(currentIndex);
        pauseAutoSlide(2500);
      }
    });
  }
});

// ============================================
// FORM HANDLING
// ============================================

// Request popup form
const requestForm = requestPopup ? requestPopup.querySelector('form') : null;

if (requestForm) {
  requestForm.addEventListener('submit', function(e) {
    // Form will submit via formspree
    closeRequestPopup();
  });
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    // Let formspree handle submission
    console.log('Newsletter subscription initiated');
  });
}

// Contact form
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // Let formspree handle submission
    console.log('Contact form submitted');
  });
}

// ============================================
// YEAR UPDATE IN FOOTER
// ============================================

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ============================================
// DROPDOWN MENU KEYBOARD SUPPORT
// ============================================

document.querySelectorAll('.product, .about').forEach(menuItem => {
  const link = menuItem.querySelector('a');
  
  if (link) {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuItem.classList.toggle('is-open');
      }
    });
  }
});

// Close dropdowns on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.product, .about').forEach(item => {
      item.classList.remove('is-open');
    });
  }
});

// ============================================
// LAZY LOAD IMAGES
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

if ('performance' in window && 'navigation' in window.performance) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    // Send to analytics if needed
    if (window.gtag) {
      gtag('event', 'page_load', {
        'load_time': pageLoadTime
      });
    }
  });
}

// ============================================
// INITIALIZATION
// ============================================

console.log('Medsphere Healthcare - Website Loaded');// ============================================

function filterProducts() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  const searchTerm = input.value.toLowerCase().trim();
  const products = document.querySelectorAll('.product-card');
  let matchCount = 0;

  products.forEach(product => {
    const name = product.querySelector('.product-name');
    if (!name) return;

    const nameText = name.textContent.toLowerCase();
    const isMatch = nameText.includes(searchTerm);

    product.style.display = isMatch ? 'block' : 'none';
    if (isMatch) matchCount++;
  });

  // Scroll to products if match found
  if (searchTerm.length > 0 && matchCount > 0) {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      setTimeout(() => {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}

// Debounce search input
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(filterProducts, 300);
  });
}

// ============================================
// SERVICES SLIDER
// ============================================

const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dots .dot');
let currentSlide = 0;
let autoSlideEnabled = true;
let slideInterval;

function startAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    if (autoSlideEnabled) {
      currentSlide = (currentSlide + 1) % 3;
      updateSlider();
    }
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

function updateSlider() {
  if (!slider) return;
  
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
  });
  
  if (dots[currentSlide]) {
    dots[currentSlide].classList.add('active');
  }
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
  autoSlideEnabled = false;
  stopAutoSlide();
  
  setTimeout(() => {
    autoSlideEnabled = true;
    startAutoSlide();
  }, 5000);

  const aboutContainer = document.querySelector('.about-container');
  if (aboutContainer) {
    aboutContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % 3;
  updateSlider();
  autoSlideEnabled = false;
  stopAutoSlide();
  
  setTimeout(() => {
    autoSlideEnabled = true;
    startAutoSlide();
  }, 5000);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + 3) % 3;
  updateSlider();
  autoSlideEnabled = false;
  stopAutoSlide();
  
  setTimeout(() => {
    autoSlideEnabled = true;
    startAutoSlide();
  }, 5000);
}

// Initialize slider
if (slider) {
  startAutoSlide();
  
  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollUpBtn = document.getElementById('scroll-Up');

if (scrollUpBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollUpBtn.style.opacity = '1';
      scrollUpBtn.style.pointerEvents = 'auto';
    } else {
      scrollUpBtn.style.opacity = '0';
      scrollUpBtn.style.pointerEvents = 'none';
    }
  });

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// SMOOTH SCROLL LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      // Close mobile menu if open
      if (navLinks) {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// WHATSAPP FLOATING BUTTON
// ============================================

const whatsappBtn = document.getElementById('whatsappBtn');
const chatConfirm = document.getElementById('chatConfirm');
let chatReady = false;

function toggleChatConfirm() {
  if (!whatsappBtn || !chatConfirm) return;

  if (!chatReady) {
    chatConfirm.classList.add('active');
    chatReady = true;
    whatsappBtn.setAttribute('aria-expanded', 'true');

    // Hide on scroll
    window.addEventListener('scroll', () => {
      chatConfirm.classList.remove('active');
      chatReady = false;
      whatsappBtn.setAttribute('aria-expanded', 'false');
    });

    // Auto hide after 5 seconds
    setTimeout(() => {
      chatConfirm.classList.remove('active');
      chatReady = false;
      whatsappBtn.setAttribute('aria-expanded', 'false');
    }, 5000);
  } else {
    // Open WhatsApp
    const message = 'Hello, I would like more information about your medical equipment.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/2347049413802?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    chatConfirm.classList.remove('active');
    chatReady = false;
  }
}

if (whatsappBtn) {
  whatsappBtn.addEventListener('click', toggleChatConfirm);
  whatsappBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleChatConfirm();
    }
  });
}

// ============================================
// PRODUCT REQUEST POPUP
// ============================================

const requestPopup = document.getElementById('requestPopup');

function openRequestPopup(productName) {
  if (!requestPopup) return;
  
  const productNameDisplay = document.getElementById('productNameDisplay');
  const productNameInput = document.getElementById('productNameInput');
  
  if (productNameDisplay) productNameDisplay.textContent = productName;
  if (productNameInput) productNameInput.value = productName;
  
  requestPopup.style.display = 'block';
  requestPopup.setAttribute('open', '');
  document.body.style.overflow = 'hidden';
  
  // Focus on first form field for accessibility
  const firstInput = requestPopup.querySelector('input[type="number"]');
  if (firstInput) firstInput.focus();
}

function closeRequestPopup() {
  if (!requestPopup) return;
  
  requestPopup.style.display = 'none';
  requestPopup.removeAttribute('open');
  document.body.style.overflow = 'auto';
}

// Close popup on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && requestPopup && requestPopup.style.display === 'block') {
    closeRequestPopup();
  }
});

// Close popup on background click
if (requestPopup) {
  requestPopup.addEventListener('click', (e) => {
    if (e.target === requestPopup) {
      closeRequestPopup();
    }
  });
}

// ============================================
// BLOG SLIDER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const blogSlider = document.getElementById('blogSlider');
  const sliderDots = document.getElementById('sliderDots');
  const cardWrappers = blogSlider ? blogSlider.querySelectorAll('.blog-card-wrapper') : [];
  const numCards = cardWrappers.length;

  if (numCards === 0 || !sliderDots) return;

  let currentIndex = 0;
  let autoSlideInterval;
  let isAutoSliding = true;
  const slideDuration = 4000;

  // Create dots
  for (let i = 0; i < numCards; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('data-index', i);
    dot.setAttribute('aria-label', `Go to article ${i + 1}`);
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', i === 0);
    
    dot.addEventListener('click', () => {
      jumpToSlide(i);
      pauseAutoSlide(3000);
    });
    
    sliderDots.appendChild(dot);
  }

  // Show slide
  function showSlide(index) {
    if (index >= numCards) index = 0;
    else if (index < 0) index = numCards - 1;
    
    currentIndex = index;

    const targetCard = cardWrappers[currentIndex];
    const scrollLeftPosition = targetCard.offsetLeft - blogSlider.offsetLeft;

    blogSlider.scrollLeft = scrollLeftPosition;
    updateDots(currentIndex);
  }

  // Jump to slide
  function jumpToSlide(index) {
    showSlide(index);
  }

  // Next slide
  function nextSlide() {
    if (isAutoSliding) {
      showSlide(currentIndex + 1);
    }
  }

  // Update dots
  function updateDots(index) {
    const allDots = sliderDots.querySelectorAll('.dot');
    allDots.forEach((dot, i) => {
      dot.classList.remove('active');
      dot.setAttribute('aria-selected', i === index);
    });
    if (allDots[index]) {
      allDots[index].classList.add('active');
    }
  }

  // Auto slide
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function pauseAutoSlide(duration = 5000) {
    stopAutoSlide();
    setTimeout(startAutoSlide, duration);
  }

  // Initialize
  showSlide(currentIndex);
  startAutoSlide();

  // Pause on hover
  if (blogSlider) {
    blogSlider.addEventListener('mouseenter', stopAutoSlide);
    blogSlider.addEventListener('mouseleave', startAutoSlide);

    // Pause on focus
    cardWrappers.forEach(wrapper => {
      const link = wrapper.querySelector('a');
      if (link) {
        link.addEventListener('focus', stopAutoSlide);
        link.addEventListener('blur', startAutoSlide);
      }
    });

    // Re-evaluate on manual scroll
    let scrollTimeout;
    blogSlider.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      
      const scrollPos = blogSlider.scrollLeft;
      const cardWidth = cardWrappers[0].offsetWidth;
      const gap = 32; // 2rem gap
      
      let newIndex = Math.round(scrollPos / (cardWidth + gap));
      
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateDots(currentIndex);
        pauseAutoSlide(2500);
      }
    });
  }
});

// ============================================
// FORM HANDLING
// ============================================

// Request popup form
const requestForm = requestPopup ? requestPopup.querySelector('form') : null;

if (requestForm) {
  requestForm.addEventListener('submit', function(e) {
    // Form will submit via formspree
    closeRequestPopup();
  });
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    // Let formspree handle submission
    console.log('Newsletter subscription initiated');
  });
}

// Contact form
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // Let formspree handle submission
    console.log('Contact form submitted');
  });
}

// ============================================
// YEAR UPDATE IN FOOTER
// ============================================

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ============================================
// DROPDOWN MENU KEYBOARD SUPPORT
// ============================================

document.querySelectorAll('.product, .about').forEach(menuItem => {
  const link = menuItem.querySelector('a');
  
  if (link) {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuItem.classList.toggle('is-open');
      }
    });
  }
});

// Close dropdowns on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.product, .about').forEach(item => {
      item.classList.remove('is-open');
    });
  }
});

// ============================================
// LAZY LOAD IMAGES
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

if ('performance' in window && 'navigation' in window.performance) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    // Send to analytics if needed
    if (window.gtag) {
      gtag('event', 'page_load', {
        'load_time': pageLoadTime
      });
    }
  });
}

// ============================================
// UTILITY: SMOOTH SCROLL BEHAVIOR
// ============================================

if (!('scrollBehavior' in document.documentElement.style)) {
  // Fallback for browsers that don't support smooth scroll
  console.log('Smooth scroll not supported, using polyfill');
}

// ============================================
// INITIALIZATION
// ============================================

console.log('Medsphere Healthcare - Website Loaded');
