// Navbar scroll state + mobile toggle
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Active nav link on scroll
const sections = [...document.querySelectorAll('section[id]')];
const linkFor = id => navLinks.querySelector(`a[href="#${id}"]`);
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      linkFor(e.target.id)?.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// Typing effect
const roles = ['Full-Stack Developer', 'MERN Stack Engineer', 'UI/UX Enthusiast', 'Problem Solver'];
const typed = document.getElementById('typed');
let ri = 0, ci = roles[0].length, deleting = false;
function tick() {
  const word = roles[ri];
  if (!deleting && ci < word.length) ci++;
  else if (deleting && ci > 0) ci--;
  typed.textContent = word.slice(0, ci);
  let delay = deleting ? 45 : 90;
  if (!deleting && ci === word.length) { delay = 2200; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 400; }
  setTimeout(tick, delay);
}
setTimeout(tick, 2200);

// Reveal on scroll, counters and skill bars
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    e.target.querySelectorAll('.bar-fill').forEach(b => b.style.width = b.dataset.width + '%');
    e.target.querySelectorAll('[data-count]').forEach(animateCount);
    revealObserver.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function animateCount(el) {
  const target = +el.dataset.count, suffix = el.dataset.suffix || '';
  const start = performance.now(), dur = 1400;
  const step = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Testimonial dots (highlight card)
const dots = document.querySelectorAll('#dots button');
const cards = document.querySelectorAll('.testimonial-card');
dots.forEach((d, i) => d.addEventListener('click', () => {
  dots.forEach(x => x.classList.remove('active')); d.classList.add('active');
  cards.forEach(c => c.style.borderColor = '');
  cards[i].style.borderColor = 'rgba(245,158,11,.6)';
  cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}));

// Contact form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('formNote').textContent = "Thanks! Your message has been sent — I'll get back to you within 24 hours.";
  e.target.reset();
});
