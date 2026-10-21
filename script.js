(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const details = {
    s4hana: { kicker:'SAP S/4HANA', title:'Business processes, connected clearly.', copy:'We help teams understand SAP S/4HANA requirements, business processes and dependencies. The aim is to support clearer planning, stronger alignment between business and technology, and practical next steps suited to the organisation’s needs.' },
    vistex: { kicker:'SAP VISTEX', title:'Clearer control of pricing and incentives.', copy:'Our focus includes SAP Vistex-related commercial processes such as rebates, incentives, pricing agreements and associated business requirements. We start by understanding the process and the questions the team needs the system to answer.' },
    sales: { kicker:'SAP SALES & DISTRIBUTION', title:'Processes aligned with the business.', copy:'Sales and distribution processes touch customers, orders, deliveries, billing and the wider operational landscape. We look at business needs and process dependencies to help make requirements easier to understand and discuss.' },
    advisory: { kicker:'CONSULTING & SUPPORT', title:'A thoughtful partner through the journey.', copy:'Early planning, implementation discussions, issue investigation and ongoing improvement all benefit from a clear view of the business context. Our approach emphasises listening, straightforward communication and useful next steps.' },
    digital: { kicker:'WEB & DIGITAL EXPERIENCES', title:'Useful digital ideas, thoughtfully brought to life.', copy:'We explore digital experiences that communicate clearly, feel intuitive and support real user needs—from company websites to early-stage product concepts. The work starts with purpose, audience and the problem to be solved.' },
    soratrade: { kicker:'A SORASOFT PRODUCT · IN DEVELOPMENT', title:'A clearer home for trade records and review.', copy:'SoraTrade is an early-stage product concept for organising trade records, notes and performance reviews in one workflow. It is not presented as a live service. Planned features and availability may change, and the concept is for record-keeping and review—not profit guarantees or trading advice.' }
  };

  const modal = document.querySelector('#detail-modal');
  const modalTitle = document.querySelector('#modal-title');
  const modalCopy = document.querySelector('#modal-copy');
  const modalKicker = document.querySelector('#modal-kicker');
  const closeButtons = modal ? modal.querySelectorAll('.modal-close,.modal-backdrop') : [];
  let previousFocus = null;

  function openDetail(key, trigger) {
    const detail = details[key];
    if (!detail || !modal) return;
    previousFocus = trigger || document.activeElement;
    modalTitle.textContent = detail.title;
    modalCopy.textContent = detail.copy;
    modalKicker.textContent = detail.kicker;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
  }
  function closeDetail() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }
  document.querySelectorAll('.detail-trigger').forEach(button => {
    button.addEventListener('click', () => openDetail(button.dataset.detail, button));
  });
  closeButtons.forEach(button => button.addEventListener('click', closeDetail));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeDetail(); });
  if (modal) modal.querySelector('a[href="#contact"]').addEventListener('click', closeDetail);

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }
})();