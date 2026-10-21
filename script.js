(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const progressBar = document.getElementById('progressBar');
  const year = document.getElementById('year');
  const detailDialog = document.getElementById('detailDialog');
  const closeDetail = document.querySelector('.detail-close');

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav?.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  const updateProgress = () => {
    if (!progressBar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const details = {
    vistex: {
      kicker: 'SAP VISTEX / COMMERCIAL MANAGEMENT',
      title: 'Make commercial rules easier to manage.',
      intro: 'SAP Vistex can help organizations manage complex commercial programs and turn agreements into structured, traceable processes. The exact design depends on the business model and SAP landscape.',
      bullets: [
        'Pricing, rebates and incentive program processes.',
        'Agreement and contract-related commercial logic.',
        'Accruals, claims and settlement process considerations.',
        'Clearer governance, traceability and control across commercial workflows.',
        'Support for aligning business requirements with SAP Vistex capabilities.'
      ],
      note: 'Engagement scope is agreed case by case. Specific modules, integrations and deliverables depend on the client environment.'
    },
    s4hana: {
      kicker: 'SAP S/4HANA / ENTERPRISE SYSTEMS',
      title: 'Bring business processes into a clearer flow.',
      intro: 'SAP S/4HANA provides an integrated ERP foundation for core business operations. Our approach starts with the current environment, business goals and the practical requirements of the engagement.',
      bullets: [
        'Advisory and requirements understanding for SAP initiatives.',
        'Implementation planning and business-process alignment.',
        'Migration planning and readiness considerations.',
        'Coordination across process, data and system dependencies.',
        'Support and improvement planning around the live environment.'
      ],
      note: 'We do not assume every engagement needs the same approach; recommendations should fit the organization’s needs and existing landscape.'
    },
    advisory: {
      kicker: 'CONSULTING / ADVISORY / SUPPORT',
      title: 'A practical partner through the details.',
      intro: 'Enterprise systems touch people, processes and decisions. Clear communication and a shared understanding of the problem help keep work focused and manageable.',
      bullets: [
        'Clarify the business problem and desired outcome.',
        'Review requirements, dependencies and process gaps.',
        'Prioritize decisions and make assumptions visible.',
        'Support implementation or change activities within agreed scope.',
        'Document next steps and help teams understand the solution.'
      ],
      note: 'Availability and deliverables are confirmed before an engagement begins.'
    },
    sd: {
      kicker: 'SAP SD / SALES & DISTRIBUTION',
      title: 'Connect the sales process from order to billing.',
      intro: 'SAP Sales and Distribution (SD) supports important order-to-cash activities. Work in this area depends on the organization’s sales model, configuration and integration points.',
      bullets: [
        'Sales order and delivery process understanding.',
        'Pricing and related sales-document considerations.',
        'Delivery, billing and document-flow review.',
        'Process touchpoints with inventory, finance and other SAP areas.',
        'Support for identifying process issues and clarifying requirements.'
      ],
      note: 'This section describes areas of focus, not a promise that every listed activity is available in every engagement.'
    },
    web: {
      kicker: 'WEB DEVELOPMENT / DIGITAL EXPERIENCES',
      title: 'Give useful ideas a thoughtful digital home.',
      intro: 'We are expanding into modern websites and selected digital work. The goal is to build experiences that are clear, responsive and aligned with the purpose of the business or product.',
      bullets: [
        'Responsive company and service websites.',
        'Landing pages and product presentation sites.',
        'Clean layouts, considered typography and purposeful motion.',
        'Basic technical SEO and performance-minded front-end implementation.',
        'A practical handover so the owner understands the files and publishing process.'
      ],
      note: 'Web and digital development is an expanding area of work. Scope, timeline and availability are confirmed for each project before any commitment.'
    },
    soratrade: {
      kicker: 'SORATRADE / A PRODUCT BY SORASOFT SOLUTIONS',
      title: 'A clearer way to review your trading process.',
      intro: 'SoraTrade is a trading journal and performance analytics product in development. The idea is to help traders record what they did, review why they did it, and learn from their process over time — rather than encouraging impulsive decisions.',
      bullets: [
        'A structured place to record trades and notes.',
        'Performance views that help organize and review historical activity.',
        'A trading calendar and review workflow as development allows.',
        'A focus on consistency, reflection and trading psychology.',
        'A product roadmap that will be shared as real features become ready.'
      ],
      note: 'SoraTrade is not yet presented as a launched service. The dashboard on this site is illustrative, not connected to live trading data or a real account. Features and release timing may change.'
    },
    digital: {
      kicker: 'FUTURE DIRECTIONS / DIGITAL WORK',
      title: 'More ways to turn ideas into useful tools.',
      intro: 'Alongside our SAP-focused work, we want to help more people and businesses bring useful ideas online — with thoughtful websites, focused digital experiences and, over time, more software products.',
      bullets: [
        'Websites that communicate a company or service clearly.',
        'Digital product pages and launch experiences.',
        'Small, focused front-end tools where the need is clear.',
        'A careful approach to accessibility, responsiveness and performance.',
        'Products developed from real needs, with their status communicated honestly.'
      ],
      note: 'These are areas we are exploring and expanding into, not a claim that every service or product is already generally available.'
    }
  };

  const openDetail = key => {
    const data = details[key];
    if (!data || !detailDialog) return;
    document.getElementById('detailKicker').textContent = data.kicker;
    document.getElementById('detailTitle').textContent = data.title;
    document.getElementById('detailIntro').textContent = data.intro;
    document.getElementById('detailListHeading').textContent = key === 'soratrade' ? 'What we are working toward' : key === 'digital' ? 'Directions we are exploring' : 'Areas this may include';
    const list = document.getElementById('detailList');
    list.replaceChildren();
    data.bullets.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    document.getElementById('detailNote').textContent = data.note;
    const contact = document.getElementById('detailContact');
    if (key === 'soratrade') {
      contact.hidden = true;
    } else {
      contact.hidden = false;
      contact.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=connect@sorasoftsolutions.com&su=' + encodeURIComponent(key === 'web' || key === 'digital' ? 'Web and digital project enquiry' : 'SAP services enquiry');
    }
    if (typeof detailDialog.showModal === 'function') detailDialog.showModal();
  };

  document.querySelectorAll('[data-detail]').forEach(button => {
    button.addEventListener('click', () => openDetail(button.dataset.detail));
  });
  closeDetail?.addEventListener('click', () => detailDialog?.close());
  detailDialog?.addEventListener('click', event => {
    if (event.target === detailDialog) detailDialog.close();
  });
  detailDialog?.addEventListener('close', () => {
    // Return focus to the control that launched the panel when possible.
    document.activeElement?.blur?.();
  });
})();
