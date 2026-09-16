/**
 * EVERMORE PICTURES — Interactive Core Scripts
 * Luxury Wedding Cinematography & Post-Production Editing
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initBeforeAfterSlider();
  initPortfolioFilter();
  initLightbox();
  initVideoModal();
  initFaqAccordion();
  initBookingForm();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect & Active Section Tracking
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('glass-nav', 'shadow-2xl');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('glass-nav', 'shadow-2xl');
      navbar.classList.add('bg-transparent');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Menu Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* --------------------------------------------------------------------------
   3. Interactive Before & After Color-Grading Comparison Slider
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById('comparison-slider');
  if (!container) return;

  const beforeLayer = container.querySelector('.comparison-before');
  const beforeImg = beforeLayer ? beforeLayer.querySelector('img') : null;
  const handle = container.querySelector('.slider-handle');

  if (!beforeLayer || !beforeImg || !handle) return;

  let isSliding = false;

  function syncImageWidth() {
    const containerWidth = container.offsetWidth;
    beforeImg.style.width = `${containerWidth}px`;
  }

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let posX = x - rect.left;

    // Clamp between 2% and 98%
    let percentage = (posX / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;

    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isSliding = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isSliding) return;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isSliding = false;
  });

  // Touch Events (Mobile / Tablet)
  container.addEventListener('touchstart', (e) => {
    isSliding = true;
    if (e.touches && e.touches[0]) {
      setSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isSliding) return;
    if (e.touches && e.touches[0]) {
      setSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isSliding = false;
  });

  // Initial Sync & on Resize
  syncImageWidth();
  window.addEventListener('resize', syncImageWidth);
}

/* --------------------------------------------------------------------------
   4. Portfolio Category Filtering
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCategory === filterCategory || itemCategory.includes(filterCategory)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Lightbox Modal (For Photography & Retouching)
   -------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-image');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  if (!modal || !modalImg) return;

  function openLightbox(src, caption) {
    modalImg.src = src;
    if (modalCaption) modalCaption.textContent = caption || 'Evermore Pictures — Wedding Collection';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const img = trigger.querySelector('img') || trigger;
      const fullSrc = trigger.getAttribute('data-full-src') || img.src;
      const title = trigger.getAttribute('data-title') || img.alt;
      openLightbox(fullSrc, title);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   6. Video Player Modal (For Wedding Films & Reels)
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const videoTitle = document.getElementById('video-modal-title');
  const videoSubtitle = document.getElementById('video-modal-sub');
  const closeBtn = document.getElementById('video-close');
  const iframeHolder = document.getElementById('video-frame-holder');
  const triggers = document.querySelectorAll('.video-trigger');

  if (!modal || !iframeHolder) return;

  function openVideoModal(title, subtitle, embedUrl) {
    if (videoTitle) videoTitle.textContent = title;
    if (videoSubtitle) videoSubtitle.textContent = subtitle;

    // Use responsive HTML5 video or embedded cinematic clip
    iframeHolder.innerHTML = `
      <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-white/10">
        <iframe 
          class="w-full h-full"
          src="${embedUrl}?autoplay=1&rel=0&modestbranding=1" 
          title="${title}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    // Clear iframe to stop audio
    if (iframeHolder) iframeHolder.innerHTML = '';
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const title = trigger.getAttribute('data-video-title') || 'Evermore Cinema Highlight';
      const subtitle = trigger.getAttribute('data-video-location') || 'Lake Como, Italy';
      const embedUrl = trigger.getAttribute('data-video-url') || 'https://www.youtube.com/embed/5qap5aO4i9A';
      openVideoModal(title, subtitle, embedUrl);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideoModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeVideoModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const chevron = item.querySelector('.faq-icon');

    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      // Close all others
      faqItems.forEach(otherItem => {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherChevron = otherItem.querySelector('.faq-icon');
        if (otherAnswer) otherAnswer.classList.add('hidden');
        if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        answer.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Booking & Inquiry Form + Instant WhatsApp Integration
   -------------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name')?.value.trim() || 'Client';
    const email = document.getElementById('client-email')?.value.trim() || '';
    const phone = document.getElementById('client-phone')?.value.trim() || '';
    const date = document.getElementById('client-date')?.value || 'TBD';
    const location = document.getElementById('client-location')?.value.trim() || 'Destination';
    const service = document.getElementById('client-service')?.value || 'Complete Wedding & Editing';
    const budget = document.getElementById('client-budget')?.value || 'Standard';
    const notes = document.getElementById('client-notes')?.value.trim() || '';

    // Create formatted WhatsApp Message
    const textLines = [
      `*🌟 NEW INQUIRY - EVERMORE PICTURES*`,
      `*Name:* ${name}`,
      `*Phone/WhatsApp:* ${phone}`,
      `*Email:* ${email}`,
      `*Event Date:* ${date}`,
      `*Venue/Location:* ${location}`,
      `*Service Required:* ${service}`,
      `*Budget Bracket:* ${budget}`,
      notes ? `*Vision / Notes:* ${notes}` : ''
    ].filter(Boolean);

    const fullMessage = encodeURIComponent(textLines.join('\n'));
    // Demo WhatsApp Number (Can be customized by user in config)
    const waNumber = '919876543210'; 
    const whatsappUrl = `https://wa.me/${waNumber}?text=${fullMessage}`;

    // Show Toast Notification
    showToast(`Thank you, ${name}! Your inquiry has been prepared. Opening WhatsApp direct chat...`);

    // Reset Form
    form.reset();

    // Trigger WhatsApp in new tab after 800ms
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 900);
  });

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5500);
  }
}

/* --------------------------------------------------------------------------
   9. Smooth Scroll for Anchor Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
