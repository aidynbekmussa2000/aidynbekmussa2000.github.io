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
    initLanguageToggle();
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

  // ================================
  // LANGUAGE TOGGLE (EN/RU)
  // ================================

  const translations = {
    en: {
      // Navigation
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      'nav.skills': 'Skills',
      'nav.contact': 'Contact',

      // Hero
      'hero.greeting': "Hi, I'm",
      'hero.title': 'Data Analyst & Economist',
      'hero.description': 'I transform complex data into actionable insights. Currently based in Astana, Kazakhstan, building smart solutions with analytics, engineering, BI, and machine learning.',
      'hero.viewProjects': 'View Projects',
      'hero.getInTouch': 'Get in Touch',

      // About
      'about.title': 'About',
      'about.lead': "I'm a data analyst and economist with a passion for solving complex problems through data-driven approaches.",
      'about.p1': "With a Master's in Applied Analytics from Columbia University and experience at the National Bank of Kazakhstan, I bring a unique blend of quantitative skills, economic insight, and systems thinking.",
      'about.p2': "My work spans macroeconomic forecasting, machine learning, ETL pipeline engineering, and data visualization. I'm particularly interested in how AI can improve analytics and business.",
      'about.education': 'Education',
      'about.ms': 'M.S. Applied Analytics',
      'about.ba': 'B.A. Economics & Mathematics',
      'about.location': 'Location',
      'about.locationValue': 'Astana, Kazakhstan',

      // Experience Timeline
      'experience.title': 'Experience & Education',
      'timeline.baEcon': 'B.A. Economics',
      'timeline.minorMath': 'Minor in Mathematics',
      'timeline.msAnalytics': 'M.S. Applied Analytics',
      'timeline.dataML': 'Data Analytics & ML',
      'timeline.internConsultant': 'Intern Consultant',
      'timeline.finConsulting': 'Financial consulting',
      'timeline.analyst': 'Analyst',
      'timeline.nbk': 'National Bank of Kazakhstan',
      'timeline.macroForecast': 'Macroeconomic forecasting',
      'timeline.chiefAnalyst': 'Chief Analyst',
      'timeline.leadingAnalytics': 'Leading analytical projects',
      'timeline.present': 'Present',
      'timeline.current': 'Current',

      // Projects
      'projects.title': 'Projects',
      'projects.nycTitle': 'NYC Crime Clustering',
      'projects.nycDesc': 'Spatial analysis of crime patterns in New York City using K-means clustering and geospatial visualization.',
      'projects.gasTitle': 'Gasoline Price ETL',
      'projects.gasDesc': 'End-to-end data pipeline and interactive dashboard for tracking gasoline price trends.',
      'projects.pbiTitle': 'Power BI Dashboard',
      'projects.pbiDesc': 'Interactive business intelligence dashboard with data visualization and analytics insights.',
      'projects.inProgress': 'In Progress',
      'projects.getEnglishDesc': 'AI-powered language learning assistant on Telegram for personalized education.',

      // Skills
      'skills.title': 'Skills',
      'skills.languages': 'Languages',
      'skills.tools': 'Tools & Technologies',
      'skills.expertise': 'Expertise',
      'skills.ml': 'Machine Learning',
      'skills.dataViz': 'Data Visualization',
      'skills.etl': 'ETL Pipelines',
      'skills.stats': 'Statistical Analysis',
      'skills.macro': 'Macroeconomic Modeling',
      'skills.geo': 'Geospatial Analysis',

      // Contact
      'contact.title': 'Contact',
      'contact.intro': "I'm always open to discussing new projects, creative ideas, or opportunities. Let's connect.",

      // Footer
      'footer.copyright': '© 2025 Aidynbek Mussa. Built with intention.'
    },
    ru: {
      // Navigation
      'nav.about': 'Обо мне',
      'nav.experience': 'Опыт',
      'nav.projects': 'Проекты',
      'nav.skills': 'Навыки',
      'nav.contact': 'Контакты',

      // Hero
      'hero.greeting': 'Привет, я',
      'hero.title': 'Аналитик данных и экономист',
      'hero.description': 'Преобразую сложные данные в практические решения. Живу в Астане, Казахстан. Работаю с аналитикой, BI и машинным обучением.',
      'hero.viewProjects': 'Проекты',
      'hero.getInTouch': 'Связаться',

      // About
      'about.title': 'Обо мне',
      'about.lead': 'Я аналитик данных и экономист, увлечённый решением сложных задач с помощью данных.',
      'about.p1': 'Имея степень магистра прикладной аналитики Колумбийского университета и опыт работы в Национальном Банке Казахстана, я сочетаю количественные навыки, экономическое понимание и системное мышление.',
      'about.p2': 'Моя работа охватывает макроэкономическое прогнозирование, машинное обучение, ETL-пайплайны и визуализацию данных. Особенно интересуюсь применением ИИ в аналитике и бизнесе.',
      'about.education': 'Образование',
      'about.ms': 'Магистр прикладной аналитики',
      'about.ba': 'Бакалавр экономики и математики',
      'about.location': 'Местоположение',
      'about.locationValue': 'Астана, Казахстан',

      // Experience Timeline
      'experience.title': 'Опыт и образование',
      'timeline.baEcon': 'Бакалавр экономики',
      'timeline.minorMath': 'Дополнительная специализация: математика',
      'timeline.msAnalytics': 'Магистр прикладной аналитики',
      'timeline.dataML': 'Аналитика данных и ML',
      'timeline.internConsultant': 'Стажёр-консультант',
      'timeline.finConsulting': 'Финансовый консалтинг',
      'timeline.analyst': 'Аналитик',
      'timeline.nbk': 'Национальный Банк Казахстана',
      'timeline.macroForecast': 'Макроэкономическое прогнозирование',
      'timeline.chiefAnalyst': 'Главный аналитик',
      'timeline.leadingAnalytics': 'Руководство аналитическими проектами',
      'timeline.present': 'настоящее время',
      'timeline.current': 'Текущая',

      // Projects
      'projects.title': 'Проекты',
      'projects.nycTitle': 'Кластеризация преступлений NYC',
      'projects.nycDesc': 'Пространственный анализ паттернов преступности в Нью-Йорке с использованием K-means кластеризации и геопространственной визуализации.',
      'projects.gasTitle': 'ETL цен на бензин',
      'projects.gasDesc': 'Полный цикл обработки данных и интерактивный дашборд для отслеживания трендов цен на бензин.',
      'projects.pbiTitle': 'Дашборд Power BI',
      'projects.pbiDesc': 'Интерактивный дашборд бизнес-аналитики с визуализацией данных и аналитическими инсайтами.',
      'projects.inProgress': 'В разработке',
      'projects.getEnglishDesc': 'ИИ-помощник для изучения языков в Telegram с персонализированным обучением.',

      // Skills
      'skills.title': 'Навыки',
      'skills.languages': 'Языки программирования',
      'skills.tools': 'Инструменты и технологии',
      'skills.expertise': 'Экспертиза',
      'skills.ml': 'Машинное обучение',
      'skills.dataViz': 'Визуализация данных',
      'skills.etl': 'ETL-пайплайны',
      'skills.stats': 'Статистический анализ',
      'skills.macro': 'Макроэкономическое моделирование',
      'skills.geo': 'Геопространственный анализ',

      // Contact
      'contact.title': 'Контакты',
      'contact.intro': 'Всегда открыт для обсуждения новых проектов, творческих идей и возможностей. Давайте свяжемся.',

      // Footer
      'footer.copyright': '© 2025 Айдынбек Мусса. Создано с душой.'
    }
  };

  function initLanguageToggle() {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;

    // Get saved language or default to English
    const savedLang = localStorage.getItem('lang') || 'en';
    document.documentElement.setAttribute('data-lang', savedLang);
    applyTranslations(savedLang);

    toggle.addEventListener('click', () => {
      const currentLang = document.documentElement.getAttribute('data-lang') || 'en';
      const newLang = currentLang === 'en' ? 'ru' : 'en';

      document.documentElement.setAttribute('data-lang', newLang);
      localStorage.setItem('lang', newLang);
      applyTranslations(newLang);
    });
  }

  function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

})();
