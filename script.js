
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const glassCards = document.querySelectorAll('.glass-card');
const skillBars = document.querySelectorAll('.skill-bar');

function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMobileMenu);

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

function animateOnScroll() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.8;

    if (sectionTop < triggerPoint) {
      section.classList.add('visible');
    }
  });

  glassCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.8;

    if (cardTop < triggerPoint) {
      card.classList.add('visible');
    }
  });

  skillBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.8;

    if (barTop < triggerPoint) {
      bar.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);

window.addEventListener('DOMContentLoaded', animateOnScroll);

function handleNavbarScroll() {
  const navbar = document.querySelector('.glass-nav');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 26, 42, 0.9)';
    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(10, 26, 42, 0.7)';
    navbar.style.boxShadow = 'none';
  }
}

window.addEventListener('scroll', handleNavbarScroll);

function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const buttons = document.querySelectorAll(".glass-btn");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}

function setYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

setYear();

function parallaxBubbles() {
  const bubbles = document.querySelectorAll('.bubble');
  const scrollY = window.scrollY;

  bubbles.forEach((bubble, index) => {
    const speed = 0.1 + (index * 0.05);
    bubble.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

window.addEventListener('scroll', parallaxBubbles);

function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = document.querySelector('.glass-nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

smoothScroll();

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

window.addEventListener('load', function() {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    if (originalText.includes('<span')) {
      return;
    }
    typeWriter(heroTitle, originalText, 50);
  }
});

function animateSkillBars() {
  const skillsSection = document.querySelector('.skills-section');
  const sectionTop = skillsSection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.8;

  if (sectionTop < triggerPoint) {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.transition = 'width 1.5s ease-in-out';
        bar.style.width = width;
      }, 200);
    });

    window.removeEventListener('scroll', animateSkillBars);
  }
}

window.addEventListener('scroll', animateSkillBars);

function handleCardMouseMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
}

glassCards.forEach(card => {
  card.addEventListener('mousemove', handleCardMouseMove);
});

function init() {
  animateOnScroll();
  handleNavbarScroll();
  setYear();
}

document.addEventListener('DOMContentLoaded', init);
