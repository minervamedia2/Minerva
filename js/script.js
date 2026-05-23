/* ============================================
   MINERVA MEDIA - JAVASCRIPT
   Animations, Interactions & Form Logic
   ============================================ */

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ---- Active Nav Link on Scroll ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ---- Mobile Menu Toggle ----
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
}

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');
  });
});

// ---- Typewriter Effect ----
const typewriterEl = document.getElementById('typewriter');
const words = [
  'تطوير أعمالك',
  'استقبال عملائك',
  'ما تحبه',
  'نمو براندك',
  'مبيعاتك',
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWrite() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(typeWrite, speed);
}
setTimeout(typeWrite, 800);

// ---- Particle Generator ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 60;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 2.5 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      --dur: ${Math.random() * 12 + 8}s;
      --delay: ${Math.random() * 10}s;
      --drift: ${(Math.random() - 0.5) * 80}px;
      opacity: ${Math.random() * 0.4 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ---- Counter Animation ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

// ---- Intersection Observer for Animations ----
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;

      // Counter animation
      if (el.classList.contains('stat-number')) {
        animateCounter(el);
        observer.unobserve(el);
      }

      // Fade-in animation for cards
      if (el.hasAttribute('data-aos')) {
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        }, parseInt(delay));
        observer.unobserve(el);
      }
    }
  });
}, observerOptions);

// Observe stat counters
document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));

// Observe AOS elements
document.querySelectorAll('[data-aos]').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  observer.observe(el);
});

// ---- Service Cards Hover Glow ----
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ---- Smooth Scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Package Card Tilt Effect ----
document.querySelectorAll('.package-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `
      perspective(1000px)
      rotateY(${x * 8}deg)
      rotateX(${-y * 8}deg)
      translateY(-6px)
    `;
  });
  card.addEventListener('mouseleave', () => {
    if (card.classList.contains('popular')) {
      card.style.transform = 'scale(1.03)';
    } else {
      card.style.transform = '';
    }
  });
});

// ---- Contact Form Submit ----
function submitForm(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const businessSelect = document.getElementById('business');
  const business = businessSelect.options[businessSelect.selectedIndex].text;
  const phone = document.getElementById('phone').value;
  const packageSelect = document.getElementById('package-select');
  const selectedPackage = packageSelect.options[packageSelect.selectedIndex].text;
  const message = document.getElementById('message').value || 'لا يوجد';

  const btn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const successMsg = document.getElementById('formSuccess');

  // Loading state
  btn.disabled = true;
  btnText.textContent = 'جاري إرسال طلبك...';
  btn.style.opacity = '0.7';

  // Send request using FormSubmit AJAX
  fetch('https://formsubmit.co/ajax/ahmedmfarag414@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'الاسم': name,
      'نوع النشاط التجاري': business,
      'رقم الواتساب للعميل': phone,
      'الباقة المهتم بها': selectedPackage,
      'تفاصيل إضافية': message
    })
  })
  .then(response => response.json())
  .then(data => {
    // Show success state on the form
    btn.style.display = 'none';
    successMsg.style.display = 'block';

    successMsg.style.opacity = '0';
    successMsg.style.transform = 'translateY(10px)';
    successMsg.style.transition = 'all 0.5s ease';
    setTimeout(() => {
      successMsg.style.opacity = '1';
      successMsg.style.transform = 'translateY(0)';
    }, 50);

    // Reset after 5 seconds
    setTimeout(() => {
      document.getElementById('contactForm').reset();
      btn.style.display = 'flex';
      btn.disabled = false;
      btnText.textContent = 'احجز استشارتك المجانية الآن';
      btn.style.opacity = '1';
      successMsg.style.display = 'none';
    }, 5000);
  })
  .catch(error => {
    console.error('Error:', error);
    btnText.textContent = 'حدث خطأ، حاول مرة أخرى';
    btn.disabled = false;
    btn.style.opacity = '1';
  });
}



// ---- Why Cards Stagger Animation ----
const whyCards = document.querySelectorAll('.why-card');
const whyObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    whyCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 100);
    });
    whyObserver.disconnect();
  }
}, { threshold: 0.1 });

whyCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});
if (whyCards.length) whyObserver.observe(whyCards[0].parentElement);

// ---- Step Items Animation ----
const stepItems = document.querySelectorAll('.step-item');
const stepsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    stepItems.forEach((item, i) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, i * 150);
    });
    stepsObserver.disconnect();
  }
}, { threshold: 0.1 });

stepItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(25px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});
if (stepItems.length) stepsObserver.observe(stepItems[0].closest('.steps-container'));

// ---- Partner Cards Animation ----
const partnerCards = document.querySelectorAll('.partner-card');
const partnerObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    partnerCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, i * 100);
    });
    partnerObserver.disconnect();
  }
}, { threshold: 0.1 });

partnerCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'scale(0.95)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
if (partnerCards.length) partnerObserver.observe(partnerCards[0].closest('.partners-grid'));

// ---- Client Cards Animation ----
const clientCards = document.querySelectorAll('.client-type-card');
const clientObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    clientCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 150);
    });
    clientObserver.disconnect();
  }
}, { threshold: 0.1 });

clientCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});
if (clientCards.length) clientObserver.observe(clientCards[0].closest('.clients-grid'));

// ---- Packages Card Animation ----
const pkgCards = document.querySelectorAll('.package-card');
const pkgObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    pkgCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = card.classList.contains('popular') ? 'scale(1.03)' : 'translateY(0)';
      }, i * 150);
    });
    pkgObserver.disconnect();
  }
}, { threshold: 0.1 });

pkgCards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = card.classList.contains('popular') ? 'scale(0.97)' : 'translateY(30px)';
  card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});
if (pkgCards.length) pkgObserver.observe(pkgCards[0].closest('.packages-grid'));

// ---- Page Load Animation ----
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});

// ---- Glowing cursor trail (subtle) ----
let mouseX = 0, mouseY = 0;
const trail = document.createElement('div');
trail.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(79,142,247,0.04) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: left 0.3s ease, top 0.3s ease;
`;
document.body.appendChild(trail);

document.addEventListener('mousemove', (e) => {
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
});

// ---- FAQ Toggle ----
function toggleFaq(item) {
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(i => {
    if (i !== item) i.classList.remove('open');
  });
  item.classList.toggle('open');
}

// ---- Scroll To Top Button Visibility ----
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});


// ---- FAQ Animation ----
const faqItems = document.querySelectorAll('.faq-item');
const faqObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    faqItems.forEach((item, i) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, i * 80);
    });
    faqObserver.disconnect();
  }
}, { threshold: 0.1 });

faqItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
if (faqItems.length) faqObserver.observe(faqItems[0].closest('.faq-list'));

