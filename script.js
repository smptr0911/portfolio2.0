document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const siteMenu = document.getElementById('site-menu');
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');

  const setTheme = (mode) => {
    if (!themeToggle) return;
    document.body.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('theme', mode);
    const iconSpan = themeToggle.querySelector('span');
    if (iconSpan) iconSpan.textContent = mode === 'dark' ? '☀️' : '🌙';
  };

  if (storedTheme) {
    setTheme(storedTheme);
  } else if (prefersDarkScheme.matches) {
    setTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      const mode = isDark ? 'dark' : 'light';
      localStorage.setItem('theme', mode);
      const iconSpan = themeToggle.querySelector('span');
      if (iconSpan) iconSpan.textContent = isDark ? '☀️' : '🌙';
    });
  }

  if (navToggle && siteMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteMenu.setAttribute('aria-expanded', String(!expanded));
    });

    siteMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        siteMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.section, .project-card, .testimonial').forEach((element) => {
      element.classList.add('will-animate');
      observer.observe(element);
    });
  }

  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const backToTop = document.querySelector('.site-footer__top');
  if (backToTop) {
    backToTop.addEventListener('click', (event) => {
      event.preventDefault();
      const topEl = document.getElementById('top');
      if (topEl && topEl.scrollIntoView) {
        topEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
      // Fallback hash to trigger default anchor jump
      window.location.hash = '#top';
    });
  }

  const btn = document.getElementById('button');
  const formEl = document.getElementById('form');
  if (formEl && btn) {
    formEl.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      btn.value = 'Sending...';

      emailjs
        .send('service_icd1tev', 'template_5v2r5ob', formData)
        .then(
          () => {
            btn.value = 'Send Email';
            alert('Message sent successfully!');
            formEl.reset();
          },
          (err) => {
            btn.value = 'Send Email';
            console.error('EmailJS Error:', err);
            alert('Failed to send message. Please try again later.');
          }
        );
    });
  }
});