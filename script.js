document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // SMOOTH SCROLL + ACTIVE NAV PILL
  // =============================================
  const navLinks = document.querySelectorAll('.pill-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 40, behavior: 'smooth' });
      }
    });
  });

  function highlightNav() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    let current = sections[0]?.getAttribute('id') || '';

    if (scrollY + windowHeight >= documentHeight - 40) {
      current = sections[sections.length - 1].getAttribute('id');
    } else {
      sections.forEach(section => {
        if (scrollY >= section.offsetTop - 160) {
          current = section.getAttribute('id');
        }
      });
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // =============================================
  // MOBILE NAV — hamburger toggle
  // =============================================
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function setMobileMenu(open) {
    mobileNavMenu.classList.toggle('open', open);
    mobileNavToggle.setAttribute('aria-expanded', String(open));
    mobileNavToggle.querySelector('.icon-burger').style.display = open ? 'none' : '';
    mobileNavToggle.querySelector('.icon-close').style.display = open ? '' : 'none';
  }

  if (mobileNavToggle && mobileNavMenu) {
    mobileNavToggle.addEventListener('click', () => {
      setMobileMenu(!mobileNavMenu.classList.contains('open'));
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          setMobileMenu(false);
          window.scrollTo({ top: target.offsetTop - 40, behavior: 'smooth' });
        }
      });
    });
  }

  function highlightMobileNav() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    let current = sections[0]?.getAttribute('id') || '';

    if (scrollY + windowHeight >= documentHeight - 40) {
      current = sections[sections.length - 1].getAttribute('id');
    } else {
      sections.forEach(section => {
        if (scrollY >= section.offsetTop - 160) {
          current = section.getAttribute('id');
        }
      });
    }

    mobileNavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', highlightMobileNav, { passive: true });
  highlightMobileNav();

  // =============================================
  // SCROLL REVEAL
  // =============================================
  const revealTargets = document.querySelectorAll(
    '.skill-card, .project, .also-card, .about-lead, .stat-strip'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(el => revealObserver.observe(el));

  // =============================================
  // FOOTER YEAR
  // =============================================
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =============================================
  // EMAIL COPY-TO-CLIPBOARD TOAST
  // =============================================
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      const email = link.getAttribute('href').replace('mailto:', '');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          const toast = document.createElement('div');
          toast.textContent = 'Email copied to clipboard!';
          toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 28px;
            background: #ff6d4a;
            color: #fff8ee;
            padding: .75rem 1.5rem;
            border-radius: 100px;
            font-family: 'Space Mono', monospace;
            font-size: .8rem;
            font-weight: 700;
            z-index: 10000;
            animation: toastIn 0.3s ease;
            box-shadow: 0 10px 30px rgba(28,21,13,.25);
          `;
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            setTimeout(() => toast.remove(), 300);
          }, 2000);
        });
      }
    });
  });

});
