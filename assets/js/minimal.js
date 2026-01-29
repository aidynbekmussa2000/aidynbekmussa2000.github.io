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
    initTimeline();
    initThemeToggle();
    initTypewriter();
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

  // ================================
  // TIMELINE ANIMATION
  // ================================

  function initTimeline() {
    const timeline = document.querySelector('.timeline-wrapper');
    const progress = document.getElementById('timeline-progress');
    const points = document.querySelectorAll('.timeline-point');

    if (!timeline || !progress) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate progress bar to 85% (current position)
          setTimeout(() => {
            progress.style.width = '85%';
          }, 300);

          // Animate timeline points with stagger
          points.forEach((point, index) => {
            setTimeout(() => {
              point.style.opacity = '1';
              point.style.transform = point.style.transform.replace('translateY(20px)', 'translateY(0)') || 'translateX(-50%)';
            }, 500 + (index * 250));
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Set initial state for points
    points.forEach(point => {
      point.style.opacity = '0';
      const currentTransform = point.style.transform || '';
      point.style.transform = currentTransform + ' translateY(20px)';
      point.style.transition = 'all 0.6s ease';
    });

    observer.observe(timeline);

    // Add hover interaction for timeline points
    points.forEach(point => {
      point.addEventListener('mouseenter', () => {
        points.forEach(p => {
          if (p !== point) {
            p.style.opacity = '0.4';
          }
        });
      });

      point.addEventListener('mouseleave', () => {
        points.forEach(p => {
          p.style.opacity = '1';
        });
      });
    });
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

    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!systemPrefersDark) {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Add transition class for smooth color changes
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  // ================================
  // TYPEWRITER EFFECT
  // ================================

  function initTypewriter() {
    const element = document.getElementById('typewriter');
    if (!element) return;

    const titles = [
      'Chief Analyst',
      'Data Engineer',
      'BI Developer',
      'Economist',
      'Problem Solver'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 2000;

    function type() {
      const currentTitle = titles[titleIndex];

      if (isPaused) {
        isPaused = false;
        isDeleting = true;
        setTimeout(type, pauseDuration);
        return;
      }

      if (isDeleting) {
        // Deleting
        element.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          setTimeout(type, 500);
          return;
        }
      } else {
        // Typing
        element.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentTitle.length) {
          isPaused = true;
          setTimeout(type, typeSpeed);
          return;
        }
      }

      setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }

    // Start typewriter after a short delay
    setTimeout(type, 1000);
  }

  // ================================
  // ENHANCED SCROLL REVEAL
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
