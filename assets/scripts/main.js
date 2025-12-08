document.addEventListener('DOMContentLoaded', () => {
  console.log('Hamurabi site running via Live Server');

  // ========================================
  // HAMURABI LAW FIRM - MAIN JAVASCRIPT
  // ========================================

  (function() {
    'use strict';

    // ============= DOM ELEMENTS =============
    const header = document.querySelector('.header');
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const logoTrack = document.querySelector('.clients__track');

    // ============= HEADER SCROLL EFFECT =============
    let lastScroll = 0;
    const headerHeight = 88;

    function handleScroll() {
      const currentScroll = window.pageYOffset;

      // Add scrolled class for shadow
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Show/hide scroll to top button
      if (scrollToTopBtn) {
        if (currentScroll > 300) {
          scrollToTopBtn.classList.add('visible');
        } else {
          scrollToTopBtn.classList.remove('visible');
        }
      }

      lastScroll = currentScroll;
    }

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // ============= MOBILE MENU TOGGLE =============
    if (burger && nav) {
      burger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        
        burger.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
          burger.setAttribute('aria-expanded', 'false');
          nav.classList.remove('active');
          document.body.style.overflow = '';
        }
      });

      // Close menu when clicking on a link
      const navLinks = nav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            burger.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      });

      // Handle window resize
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (window.innerWidth > 768) {
            burger.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            document.body.style.overflow = '';
          }
        }, 250);
      });
    }

    // ============= SMOOTH SCROLL =============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '#top') {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - headerHeight;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // ============= SCROLL TO TOP BUTTON =============
    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // ============= PAUSE LOGO SLIDER ON HOVER =============
    if (logoTrack) {
      logoTrack.addEventListener('mouseenter', () => {
        logoTrack.style.animationPlayState = 'paused';
      });

      logoTrack.addEventListener('mouseleave', () => {
        logoTrack.style.animationPlayState = 'running';
      });
    }

    // ============= ACTIVE NAV LINK HIGHLIGHTING =============
    function updateActiveNav() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav__link');
      
      let current = '';
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = sectionId;
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${current}` || (current === '' && href === 'index.html')) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ============= FORM VALIDATION (if contact form exists) =============
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
          alert('يرجى ملء جميع الحقول المطلوبة');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          alert('يرجى إدخال بريد إلكتروني صحيح');
          return;
        }
        
        // Here you would typically send the data to a server
        console.log('Form data:', data);
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        contactForm.reset();
      });
    }

    // ============= LAZY LOAD IMAGES =============
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }

    // ============= VIDEO AUTOPLAY ON SCROLL =============
    const heroVideo = document.querySelector('.hero__video');
    if (heroVideo) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            heroVideo.play();
          } else {
            heroVideo.pause();
          }
        });
      }, { threshold: 0.5 });

      videoObserver.observe(heroVideo);
    }

    // ============= PRELOADER (optional) =============
    window.addEventListener('load', () => {
      const preloader = document.querySelector('.preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 300);
      }
    });

    // ============= CONSOLE MESSAGE =============
    console.log('%c حمورابي للمحاماة ', 'background: #1e40af; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
    console.log('تم تحميل الموقع بنجاح ✓');

  })();
});