/**
 * MINIMAL PORTFOLIO - Smooth Interactions
 */

(function() {
  'use strict';

  // ================================
  // INITIALIZATION
  // ================================

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initSkillBars();
  }

  // ================================
  // NAVIGATION
  // ================================

  function initNavigation() {
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add scrolled class
      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ================================
  // MOBILE MENU
  // ================================

  function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('active');
        menu.classList.remove('active');
      }
    });
  }

  // ================================
  // SCROLL ANIMATIONS
  // ================================

  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with animation
    const animatedElements = document.querySelectorAll(
      '.section-title, .about-text, .about-details, .project-card, .skill-category, .contact-card'
    );

    animatedElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
  }

  // ================================
  // SMOOTH SCROLL
  // ================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ================================
  // SKILL BARS ANIMATION
  // ================================

  function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = getComputedStyle(fill).getPropertyValue('--fill');
          fill.style.width = width;
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
      bar.style.width = '0';
      observer.observe(bar);
    });
  }

})();
