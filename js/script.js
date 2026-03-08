/* ============================================================
   HARIPRATHAP PORTFOLIO — Main JavaScript
   Pure static frontend — no backend required
   ============================================================ */

(function () {
  'use strict';

  // ---------- Custom Cursor ----------
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    function animateRing() {
      ringX += (mouseX - 18 - ringX) * 0.15;
      ringY += (mouseY - 18 - ringY) * 0.15;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .btn, .glass-card, .hamburger, .filter-btn, .theme-toggle, .social-link').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  }

  // ---------- Scroll Progress Bar ----------
  const scrollProgress = document.querySelector('.scroll-progress');

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrollPercent + '%';
  }

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.querySelector('.navbar');

  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ---------- Back to Top ----------
  const backToTopBtn = document.querySelector('.back-to-top');

  function handleBackToTop() {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Combined Scroll Listener ----------
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    handleNavScroll();
    handleBackToTop();
  });

  // ---------- Mobile Navigation ----------
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  function closeMenu() {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('active');
    navOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('active');
      navLinks?.classList.toggle('active');
      navOverlay?.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // ---------- Active Navigation Link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---------- Theme Toggle ----------
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ---------- Scroll Reveal ----------
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      const trigger = windowHeight * 0.85;
      if (top < trigger) {
        el.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  // ---------- Parallax Background ----------
  window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrollY = window.scrollY;
    shapes.forEach((shape, i) => {
      const speed = 0.02 + i * 0.01;
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // ---------- Smooth Page Transitions ----------
  const pageTransition = document.querySelector('.page-transition');

  // Immediately remove overlay so links are never blocked
  if (pageTransition) {
    pageTransition.classList.remove('active');
  }

  // Only intercept links for smooth transitions when served via HTTP
  if (window.location.protocol !== 'file:') {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('http') &&
        !href.startsWith('mailto:') &&
        !link.hasAttribute('download') &&
        !link.getAttribute('target') &&
        href.endsWith('.html')
      ) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          if (pageTransition) {
            pageTransition.classList.add('active');
            setTimeout(() => {
              window.location.href = href;
            }, 300);
          } else {
            window.location.href = href;
          }
        });
      }
    });
  }

  // ---------- Skill Progress Animation ----------
  function animateSkillProgress() {
    document.querySelectorAll('.skill-progress').forEach((el) => {
      const circle = el.querySelector('.progress');
      if (!circle) return;
      const percent = parseInt(el.dataset.percent, 10) || 0;
      const circumference = 283; // 2 * PI * 45
      const offset = circumference - (percent / 100) * circumference;
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.9 && !el.classList.contains('animated')) {
        el.classList.add('animated');
        circle.style.strokeDashoffset = offset;
      }
    });
  }

  window.addEventListener('scroll', animateSkillProgress);
  window.addEventListener('load', animateSkillProgress);

  // ---------- Typing Effect (Hero) ----------
  const typingEl = document.querySelector('.typing-text');

  if (typingEl) {
    const text = typingEl.dataset.text || typingEl.textContent;
    typingEl.textContent = '';
    typingEl.style.borderRight = '2px solid var(--neon-blue)';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        typingEl.textContent += text[i];
        i++;
        setTimeout(typeChar, 60);
      } else {
        let blinks = 0;
        const blinkInterval = setInterval(() => {
          typingEl.style.borderRightColor =
            typingEl.style.borderRightColor === 'transparent'
              ? 'var(--neon-blue)'
              : 'transparent';
          blinks++;
          if (blinks > 6) {
            clearInterval(blinkInterval);
            typingEl.style.borderRight = 'none';
          }
        }, 400);
      }
    }
    setTimeout(typeChar, 600);
  }

  // ============================================================
  // STATIC PROJECTS — No API required
  // ============================================================

  const PROJECTS = [
    {
      title: 'Personal Portfolio Website',
      description: 'A modern, responsive portfolio built with pure HTML, CSS, and JavaScript featuring glassmorphism design and smooth animations.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      githubLink: 'https://github.com/hariprathap007',
    },
    {
      title: 'To-Do List App',
      description: 'A feature-rich to-do list application with task management, local storage persistence, and animated UI interactions.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      githubLink: 'https://github.com/hariprathap007',
    },
    {
      title: 'Weather App',
      description: 'A real-time weather application that fetches live data from a weather API and displays conditions with a clean interface.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'REST API'],
      githubLink: 'https://github.com/hariprathap007',
    },
    {
      title: 'Calculator App',
      description: 'A sleek calculator application with keyboard support, history tracking, and a glassmorphism-inspired design.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      githubLink: 'https://github.com/hariprathap007',
    },
    {
      title: 'Java Student Management System',
      description: 'A Java-based console application for managing student records with CRUD operations, data validation, and file persistence.',
      technologies: ['Java', 'OOP', 'File I/O'],
      githubLink: 'https://github.com/hariprathap007',
    },
  ];

  /**
   * Creates a project card DOM element
   */
  function createProjectCard(project, featured) {
    const card = document.createElement('div');
    card.className = 'glass-card project-card';

    const techHtml = (project.technologies || [])
      .map((t) => `<span>${t}</span>`)
      .join('');

    let linksHtml = `<a href="${project.githubLink}" target="_blank">GitHub →</a>`;
    if (project.liveDemo) {
      linksHtml += `<a href="${project.liveDemo}" target="_blank">Live Demo →</a>`;
    }

    card.innerHTML = `
      <div class="project-card-content">
        ${featured ? '<span class="project-tag">Featured</span>' : ''}
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">${techHtml}</div>
        <div class="project-links">${linksHtml}</div>
      </div>
    `;

    return card;
  }

  /**
   * Render projects into containers (static, no API)
   */
  function loadProjects() {
    const featuredContainer = document.getElementById('featured-projects');
    const allContainer = document.getElementById('all-projects');

    if (featuredContainer) {
      featuredContainer.innerHTML = '';
      PROJECTS.slice(0, 3).forEach((p) => {
        featuredContainer.appendChild(createProjectCard(p, true));
      });
    }

    if (allContainer) {
      allContainer.innerHTML = '';
      PROJECTS.forEach((p) => {
        allContainer.appendChild(createProjectCard(p, false));
      });
    }
  }

  // ---------- Contact Form — Static (no API) ----------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');
      const submitBtn = contactForm.querySelector('.form-submit');

      // Reset validation
      contactForm.querySelectorAll('.form-group').forEach((g) => g.classList.remove('invalid'));

      // Validate name
      if (!name.value.trim()) {
        name.closest('.form-group').classList.add('invalid');
        isValid = false;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.closest('.form-group').classList.add('invalid');
        isValid = false;
      }

      // Validate message
      if (!message.value.trim() || message.value.trim().length < 10) {
        message.closest('.form-group').classList.add('invalid');
        isValid = false;
      }

      if (!isValid) return;

      // Show success (static — no backend needed)
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(() => {
        contactForm.style.display = 'none';
        const successEl = document.querySelector('.form-success');
        if (successEl) successEl.classList.add('show');
      }, 800);
    });
  }

  // ── Load projects on page ready ──
  loadProjects();

  // ── Fire initial checks ──
  updateScrollProgress();
  handleNavScroll();
  handleBackToTop();
})();
