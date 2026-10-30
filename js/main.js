'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const navigationLinks = [...navigation.querySelectorAll('a')];

function setMenu(open, returnFocus = false) {
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigationLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) setMenu(false);
});
window.matchMedia('(min-width: 651px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});

const filters = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('[data-category]')];
const filterStatus = document.querySelector('#filter-status');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  projects.forEach(project => {
    const visible = category === 'all' || project.dataset.category === category;
    project.hidden = !visible;
    if (visible) count++;
  });
  filterStatus.textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown.`;
}));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) return;
    const id = visible[0].target.id;
    navigationLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

document.querySelector('#year').textContent = new Date().getFullYear();

const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const fields = new FormData(contactForm);
  const body = `Name: ${fields.get('name')}\nEmail: ${fields.get('email')}\nPhone: ${fields.get('phone') || 'Not provided'}\n\n${fields.get('message')}`;
  const draft = document.querySelector('#email-draft');
  draft.href = `mailto:nuthanagantichandrakanth58@gmail.com?subject=${encodeURIComponent(fields.get('subject'))}&body=${encodeURIComponent(body)}`;
  draft.hidden = false;
  document.querySelector('#form-status').textContent = 'Your draft is ready. Open it below to review and send from your email app.';
});
contactForm.addEventListener('input', () => {
  document.querySelector('#email-draft').hidden = true;
  document.querySelector('#form-status').textContent = '';
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveals = document.querySelectorAll('.project-card, .skill-group, .timeline-item, .education-item');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(element => { element.classList.add('reveal-ready'); revealObserver.observe(element); });
}

// Theme preview preference stays in this browser; no account data is stored.
const themeChoices = [...document.querySelectorAll('[data-theme-choice]')];
function applyTheme(theme) {
  if (!['midnight', 'sunrise', 'emerald'].includes(theme)) return;
  document.documentElement.dataset.theme = theme;
  themeChoices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme)));
  document.querySelector('meta[name="theme-color"]').content = {midnight:'#0b1023',sunrise:'#fffaf3',emerald:'#071e20'}[theme];
}
applyTheme(document.documentElement.dataset.theme);
themeChoices.forEach(button => button.addEventListener('click', () => {
  const theme = button.dataset.themeChoice;
  applyTheme(theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch (error) { /* Storage may be unavailable. */ }
  const url = new URL(location.href);
  url.searchParams.set('theme', theme);
  history.replaceState(null, '', url);
}));
