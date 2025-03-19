// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
  const letters = document.querySelectorAll('.loader-text span');
  let baseSpeed = 1000; // Initial animation duration in milliseconds
  let simultaneousLetters = 1; // Start with 1 letter at a time
  
  function animateLetters() {
    // Remove filling class from all letters
    letters.forEach(l => l.classList.remove('filling'));
    
    // Get unfilled letters
    const unfilledLetters = Array.from(letters).filter(l => !l.dataset.filled);
    
    if (unfilledLetters.length === 0) {
      // Reset all letters if all have been filled
      letters.forEach(l => delete l.dataset.filled);
      // Increase speed and number of simultaneous letters
      baseSpeed = Math.max(baseSpeed * 0.7, 100);
      simultaneousLetters = Math.min(simultaneousLetters + 1, letters.length);
      
      if (baseSpeed > 100) {
        animateLetters();
      } else {
        // Fade out loading screen when max speed is reached
        setTimeout(() => {
          const loadingScreen = document.querySelector('.loading-screen');
          loadingScreen.classList.add('fade-out');
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 500);
        }, 1000);
      }
      return;
    }
    
    // Randomly select multiple letters to animate
    for (let i = 0; i < Math.min(simultaneousLetters, unfilledLetters.length); i++) {
      const availableLetters = Array.from(letters).filter(l => !l.dataset.filled && !l.classList.contains('filling'));
      if (availableLetters.length === 0) break;
      
      const randomIndex = Math.floor(Math.random() * availableLetters.length);
      const letterToAnimate = availableLetters[randomIndex];
      
      letterToAnimate.style.setProperty('--fill-duration', `${baseSpeed/1000}s`);
      letterToAnimate.classList.add('filling');
      letterToAnimate.dataset.filled = 'true';
    }
    
    // Schedule next animation
    setTimeout(animateLetters, baseSpeed);
  }
  
  // Start the animation
  animateLetters();
});

/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

// This can be used to set the Particles Effects. Check README for more details!
document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particles'), {
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa'
  });
  var intro = document.getElementById('intro');
  intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
}, false);


/*
// jQuery plugin example:
$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa'
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});
*/

// Top Button Functionality
const topButton = document.getElementById('topButton');

// Show button when scrolling down
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    topButton.classList.add('visible');
  } else {
    topButton.classList.remove('visible');
  }
});

// Smooth scroll to top when clicked
topButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Navigation Functionality
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section, #home');
  const navLinks = document.querySelectorAll('.nav-link');

  // Update active link based on scroll position
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
