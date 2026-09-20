document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

  if (mobileToggle) {
    const toggleMenu = () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    };

    const closeMenu = () => {
      mobileToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    };

    mobileToggle.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
  }

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Only prevent default and smooth scroll if it's an anchor link on the same page
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      } else if (targetId && targetId.includes('.html#')) {
        // If it's a link to another page's anchor, we let it navigate naturally.
        // No e.preventDefault() here.
      }
    });
  });

  // Intersection Observer for cleanly revealing and hiding elements via scrolling
  const revealOptions = {
    root: null,
    rootMargin: '0px 0px 0px 0px', // Animates without needing much scroll
    threshold: 0 
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // Remove class to hide it as soon as the element drops out of view
        entry.target.classList.remove('visible');
      }
    });
  }, revealOptions);

  // Attach observer to all elements meant to reveal
  const revealElements = document.querySelectorAll('.reveal, .reveal-group');
  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // Pre-fill contact form based on URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const product = urlParams.get('product');
  if (product) {
    const msgBox = document.querySelector('textarea[name="message"]');
    if (msgBox) {
      if (product.includes("Workshop")) {
        msgBox.value = `I am interested in enrolling in the ${product}. Please contact me with details.`;
      } else {
        msgBox.value = `I am interested in the ${product}. Please contact me with pricing and availability.`;
      }
    }

    // Scroll to contact form smoothly if product is in URL
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }

  // Navbar scroll effect for the homepage
  const navbarHome = document.querySelector('.navbar-home');
  const heroSection = document.querySelector('.hero-section');
  if (navbarHome && heroSection) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        navbarHome.classList.add('scrolled');
      } else {
        navbarHome.classList.remove('scrolled');
      }
    }, {
      rootMargin: '-80px 0px 0px 0px',
      threshold: 0
    });
    observer.observe(heroSection);
  }
  // P19: 3D Tilt Card Logic
  const tiltCards = document.querySelectorAll('.tier-card, .trust-box');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xNorm = (x / rect.width) * 2 - 1;
      const yNorm = (y / rect.height) * 2 - 1;
      
      const maxRotate = 6; // max degrees of rotation
      const rx = yNorm * -maxRotate;
      const ry = xNorm * maxRotate;
      
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      
      card.style.setProperty('--p19-rx', `${rx}deg`);
      card.style.setProperty('--p19-ry', `${ry}deg`);
      card.style.setProperty('--p19-gx', `${gx}%`);
      card.style.setProperty('--p19-gy', `${gy}%`);
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--p19-rx', `0deg`);
      card.style.setProperty('--p19-ry', `0deg`);
    });
  });

});