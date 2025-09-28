const navToggle = document.querySelector('.nav-toggle');
const siteMenu = document.getElementById('site-menu');
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const storedTheme = localStorage.getItem('theme');

const setTheme = (mode) => {
  document.body.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('theme', mode);
  themeToggle.querySelector('span').textContent = mode === 'dark' ? '☀️' : '🌙';
};

if (storedTheme) {
  setTheme(storedTheme);
} else if (prefersDarkScheme.matches) {
  setTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  const mode = isDark ? 'dark' : 'light';
  localStorage.setItem('theme', mode);
  themeToggle.querySelector('span').textContent = isDark ? '☀️' : '🌙';
});

if (navToggle) {
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

const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  btn.value = 'Sending...'; // Update button text

  const serviceID = 'default_service'; // Replace with your actual Service ID
  const templateID = 'template_5v2r5ob'; // Replace with your actual Template ID

  emailjs
    .sendForm(serviceID, templateID, this)
    .then(
      () => {
        btn.value = 'Send Email'; // Reset button text
        alert('Message sent successfully!');
        this.reset(); // Clear the form
      },
      (err) => {
        btn.value = 'Send Email'; // Reset button text
        console.error('EmailJS Error:', err); // Log error to console
        alert('Failed to send message. Please try again later.');
      }
    );
});
