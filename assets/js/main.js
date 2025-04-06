/**
* Template Name: eStartup
* Template URL: https://bootstrapmade.com/estartup-bootstrap-landing-page-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });



  document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.scrollable-container');
    const scrollLeftButton = document.querySelector('.scroll-button.left');
    const scrollRightButton = document.querySelector('.scroll-button.right');
    const certificateItems = document.querySelectorAll('.certificate-item');

    // Calculate the width of one certificate item including margin
    const itemWidth = certificateItems[0].offsetWidth + parseInt(window.getComputedStyle(certificateItems[0]).marginRight);

    let currentScroll = 0;

    // Scroll left
    scrollLeftButton.addEventListener('click', () => {
      currentScroll -= itemWidth;
      if (currentScroll < 0) {
        currentScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth; // Loop to the end
      }
      scrollContainer.scrollTo({
        left: currentScroll,
        behavior: 'smooth'
      });
    });

    // Scroll right
    scrollRightButton.addEventListener('click', () => {
      currentScroll += itemWidth;
      if (currentScroll >= scrollContainer.scrollWidth) {
        currentScroll = 0; // Loop to the beginning
      }
      scrollContainer.scrollTo({
        left: currentScroll,
        behavior: 'smooth'
      });
    });
  });


  

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });








  
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();



  const themeToggle = document.getElementById("theme-toggle");

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });


  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    const hero = document.getElementById('hero');
    if (document.body.classList.contains('dark-mode')) {
      hero.style.background = 'linear-gradient(to right, #1e1e1e, #2c2c2c)';
      hero.style.color = '#fff';
    } else {
      hero.style.background = 'linear-gradient(to right, #f9f9f9, #ffffff)';
      hero.style.color = '#000';
    }
  }


  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    const header = document.getElementById("header");
    const highlightName = document.getElementById("highlight-name");
    const normalName = document.getElementById("normal-name");

    if (document.body.classList.contains("dark-mode")) {
      header.style.backgroundColor = "#111";
      header.style.color = "#fff";
      highlightName.style.color = "#00ffff"; // or white if you prefer
      normalName.style.color = "#fff";
    } else {
      header.style.backgroundColor = "white";
      header.style.color = "black";
      highlightName.style.color = "green";
      normalName.style.color = "black";
    }
  }
