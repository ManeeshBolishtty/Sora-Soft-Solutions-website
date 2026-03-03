// Smooth scroll to footer when "Get in Touch" is clicked
document.getElementById('contactBtn').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Toggle expandable service cards
document.querySelectorAll('.toggle').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const content = card.querySelector('.more-content');
    const isOpen = card.classList.contains('expanded');

    if (isOpen) {
      card.classList.remove('expanded');
      content.classList.remove('show');
      content.style.maxHeight = null;
      button.textContent = 'Read More';
    } else {
      card.classList.add('expanded');
      content.classList.add('show');
      content.style.maxHeight = content.scrollHeight + 'px';
      button.textContent = 'Read Less';
    }
  });
});

// Services expand/collapse logic - paste into your external JS (main bundle)
// Ensure this runs after DOM is ready. If unsure, keep the DOMContentLoaded wrapper.

(function () {
  const allowSingleOpen = true; // set false to allow multiple cards open
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(() => {
    const buttons = Array.from(document.querySelectorAll('.toggle-details'));

    function collapseDetails(card) {
      const details = card.querySelector('.service-details');
      const btn = card.querySelector('.toggle-details');
      if (!details) return;
      // start collapse animation
      details.style.maxHeight = details.scrollHeight + 'px';
      // force reflow then set to 0
      requestAnimationFrame(() => {
        details.style.transition = 'max-height 360ms cubic-bezier(.2,.9,.2,1), opacity 240ms ease';
        details.style.maxHeight = '0px';
        details.style.opacity = '0';
      });
      // after transition ends, hide and cleanup
      const onEnd = (e) => {
        if (e.propertyName !== 'max-height') return;
        details.hidden = true;
        details.style.maxHeight = '';
        details.style.opacity = '';
        details.style.transition = '';
        details.removeEventListener('transitionend', onEnd);
      };
      details.addEventListener('transitionend', onEnd);
      card.classList.remove('expanded');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    function expandDetails(card) {
      const details = card.querySelector('.service-details');
      const btn = card.querySelector('.toggle-details');
      if (!details) return;
      // ensure visible
      details.hidden = false;
      // set starting state
      details.style.maxHeight = '0px';
      details.style.opacity = '0';
      // allow browser to paint then expand to scrollHeight
      requestAnimationFrame(() => {
        details.style.transition = 'max-height 360ms cubic-bezier(.2,.9,.2,1), opacity 240ms ease';
        details.style.maxHeight = details.scrollHeight + 'px';
        details.style.opacity = '1';
      });
      // cleanup after transition
      const onEnd = (e) => {
        if (e.propertyName !== 'max-height') return;
        details.style.maxHeight = ''; // allow natural height
        details.style.transition = '';
        details.removeEventListener('transitionend', onEnd);
      };
      details.addEventListener('transitionend', onEnd);
      card.classList.add('expanded');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }

    function toggleCard(card) {
      if (card.classList.contains('expanded')) {
        collapseDetails(card);
      } else {
        if (allowSingleOpen) {
          document.querySelectorAll('.service-card.expanded').forEach(c => collapseDetails(c));
        }
        expandDetails(card);
      }
    }

    buttons.forEach(btn => {
      const card = btn.closest('.service-card');
      if (!card) return;
      const details = document.getElementById(btn.getAttribute('aria-controls'));
      if (details) details.hidden = true; // ensure hidden initially

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCard(card);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard(card);
        }
      });
    });

    // Optional: if you want outside click to close, uncomment below.
    // document.addEventListener('click', (e) => {
    //   if (!e.target.closest('.service-card')) {
    //     if (allowSingleOpen) {
    //       document.querySelectorAll('.service-card.expanded').forEach(c => collapseDetails(c));
    //     }
    //   }
    // });
  });
})();