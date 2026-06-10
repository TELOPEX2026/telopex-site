const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const links = [
  { href: 'index.html',         label: 'Accueil' },
  { href: 'services.html',      label: 'Services' },
  { href: 'formations.html',    label: 'Formations' },
  { href: 'realisations.html',  label: 'Réalisations' },
  { href: 'a-propos.html',      label: 'À propos' },
  { href: 'contact.html',       label: 'Contact', cta: true },
];

function renderNav() {
  const nav = document.createElement('nav');
  nav.innerHTML = `
    <a href="index.html" class="nav-logo">
      <img src="telopex-logo.svg" alt="Telopex logo" />
      Telo<span>pex</span>
    </a>
    <div class="nav-links">
      ${links.map(l => `
        <a href="${l.href}"
           class="${currentPage === l.href ? 'active' : ''} ${l.cta ? 'nav-cta' : ''}">
          ${l.label}
        </a>`).join('')}
    </div>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;
  document.body.prepend(nav);

  const mobile = document.createElement('div');
  mobile.className = 'mobile-menu';
  mobile.id = 'mobileMenu';
  mobile.innerHTML = links.map(l => `
    <a href="${l.href}" class="${currentPage === l.href ? 'active' : ''}">
      ${l.label}
    </a>`).join('');
  nav.after(mobile);

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
}

function renderFooter() {
  const { contact, nom, description } = TELOPEX;
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="nav-logo">
          <img src="telopex-logo.svg" alt="Telopex" style="width:32px;height:32px;border-radius:6px;" />
          Telo<span style="color:var(--purple-l)">pex</span>
        </div>
        <p>${description}</p>
      </div>
      <div class="footer-links">
        <h4>Navigation</h4>
        <ul>
          ${links.filter(l => !l.cta).map(l =>
            `<li><a href="${l.href}">${l.label}</a></li>`
          ).join('')}
        </ul>
      </div>
      <div class="footer-links">
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:${contact.email}">${contact.email}</a></li>
          <li><a href="${contact.whatsappLink}" target="_blank">WhatsApp</a></li>
          <li><a href="${contact.telegramLink}" target="_blank">Telegram</a></li>
          <li><a href="${contact.facebook}" target="_blank">Facebook</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${TELOPEX.annee} Telopex. Tous droits réservés.</span>
      <span>Au sommet du digital. ⚡</span>
    </div>
  `;
  document.body.append(footer);
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
});
