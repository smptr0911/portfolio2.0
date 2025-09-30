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

  // Capture the form element to later reset it
  const form = event.target;

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,   // rename to 'email'
    message: document.getElementById('message').value,
  };


  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {  // ✅ use .email
    alert('Please enter a valid email address.');
    return;
  }

  // Update button text to indicate sending
  btn.value = 'Sending...';

  const serviceID = 'service_icd1tev'; // Verify this value in your EmailJS dashboard
  const templateID = 'template_84p4g4o'; // Verify this value in your EmailJS dashboard

  // Send email using EmailJS
  emailjs
    .send(serviceID, templateID, formData)
    .then((response) => {
      console.log('EmailJS success response:', response);
      alert('Message sent successfully!');
      form.reset(); // Clear the form
      btn.value = 'Send Email'; // Reset button text
    })
    .catch((error) => {
      console.error('EmailJS error response:', error);
      alert('Failed to send message. Please try again later.');
      btn.value = 'Send Email'; // Reset button text
    });
});

emailjs.send('service_icd1tev','template_84p4g4o',{
   name:'Test User',
   email:'test@example.com',
   message:'Testing EmailJS'
})
.then(res=>console.log('OK',res))
.catch(err=>console.error('ERR',err));
