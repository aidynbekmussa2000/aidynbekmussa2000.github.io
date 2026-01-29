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
    // Enable JS-dependent features
    document.body.classList.add('js-enabled');

    initNavigation();
    initMobileMenu();
    initSmoothScroll();
    initSkillBars();
    initTimeline();
    initThemeToggle();
    initScrollReveal();
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

  // ================================
  // TIMELINE ANIMATION
  // ================================

  function initTimeline() {
    const timeline = document.querySelector('.timeline-dual');
    const progress = document.getElementById('timeline-progress');
    const items = document.querySelectorAll('.tl-item');

    if (!timeline) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate progress bar
          if (progress) {
            setTimeout(() => {
              progress.style.width = '95%';
            }, 300);
          }

          // Animate timeline items with stagger
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(-50%)';
            }, 300 + (index * 150));
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Set initial state for items
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    observer.observe(timeline);
  }

  // ================================
  // THEME TOGGLE (Dark/Light Mode)
  // ================================

  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Default to dark mode (site's default theme)
      document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }

    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  // ================================
  // SCROLL REVEAL
  // ================================

  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    if (!reveals.length) return;

    const revealOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, revealOptions);

    reveals.forEach(reveal => {
      revealObserver.observe(reveal);
    });
  }

})();
