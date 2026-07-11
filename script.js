const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const submenuTriggers = document.querySelectorAll('.submenu-trigger');
submenuTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    const parent = trigger.closest('.has-submenu');
    if (!parent) return;

    const isOpen = parent.classList.toggle('submenu-open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });
});

window.addEventListener('click', (event) => {
  document.querySelectorAll('.has-submenu.submenu-open').forEach((item) => {
    if (!item.contains(event.target)) {
      item.classList.remove('submenu-open');
      const trigger = item.querySelector('.submenu-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  });
});


// v12 interactive team cards
(function () {
  const modal = document.getElementById('team-modal');
  if (!modal) return;

  const photo = document.getElementById('team-modal-photo');
  const name = document.getElementById('team-modal-name');
  const role = document.getElementById('team-modal-role');
  const country = document.getElementById('team-modal-country');
  const bio = document.getElementById('team-modal-bio');
  const linkedin = document.getElementById('team-modal-linkedin');
  const closeEls = modal.querySelectorAll('[data-close-modal]');

  function openCard(card) {
    const data = card.dataset;
    photo.src = data.photo || '';
    photo.alt = data.name || '';
    name.textContent = data.name || '';
    role.textContent = data.role || '';
    country.textContent = data.country || '';
    bio.innerHTML = (data.bio || 'Bio coming soon.')
      .split('||')
      .map(part => `<p>${part}</p>`)
      .join('');

    if (data.linkedin) {
      linkedin.href = data.linkedin;
      linkedin.style.display = 'inline-flex';
    } else {
      linkedin.removeAttribute('href');
      linkedin.style.display = 'none';
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => openCard(card));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCard(card);
      }
    });
  });

  closeEls.forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
