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
   * Mobile nav toggle - DISABLED (handled in DOMContentLoaded below)
   */
  // const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  // function mobileNavToogle() {
  //   document.querySelector('body').classList.toggle('mobile-nav-active');
  //   mobileNavToggleBtn.classList.toggle('bi-list');
  //   mobileNavToggleBtn.classList.toggle('bi-x');
  // }
  // mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links - DISABLED (handled in DOMContentLoaded below)
   */
  // document.querySelectorAll('#navmenu a').forEach(navmenu => {
  //   navmenu.addEventListener('click', () => {
  //     if (document.querySelector('.mobile-nav-active')) {
  //       mobileNavToogle();
  //     }
  //   });
  // });



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






document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const certificateToggle = document.getElementById('certificate-toggle');
  const certificateContainer = document.querySelector('.certificate-container');
  const scrollContainer = document.querySelector('.scrollable-container');
  const scrollLeftBtn = document.querySelector('.scroll-button.left');
  const scrollRightBtn = document.querySelector('.scroll-button.right');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu ul');

  // Set default dark mode
  if (!localStorage.getItem('theme')) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // Theme toggle
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    // Force update for About section
    const aboutSection = document.querySelector('.about');
    if (document.body.classList.contains('dark-mode')) {
      aboutSection?.classList.add('dark-mode');
    } else {
      aboutSection?.classList.remove('dark-mode');
    }
  });

  // Mobile nav toggle
  mobileNavToggle?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Mobile nav clicked'); // Debug
    
    if (navMenu && navMenu.classList.contains('active')) {
      // Close the menu
      navMenu.classList.add('closing');
      mobileNavToggle.classList.remove('active');
      mobileNavToggle.classList.remove('bi-x');
      mobileNavToggle.classList.add('bi-list');
      document.body.classList.remove('mobile-nav-active');
      setTimeout(() => {
        navMenu.classList.remove('active', 'closing');
      }, 400); // Match CSS animation duration
    } else {
      // Open the menu
      if (navMenu) {
        navMenu.classList.add('active');
        mobileNavToggle.classList.add('active');
        mobileNavToggle.classList.remove('bi-list');
        mobileNavToggle.classList.add('bi-x');
        document.body.classList.add('mobile-nav-active');
        console.log('Menu opened', navMenu.classList); // Debug
      }
    }
  });

  // Close mobile nav when clicking a link
  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.add('closing');
        mobileNavToggle.classList.remove('active');
        mobileNavToggle.classList.remove('bi-x');
        mobileNavToggle.classList.add('bi-list');
        document.body.classList.remove('mobile-nav-active');
        setTimeout(() => {
          navMenu.classList.remove('active', 'closing');
        }, 400);
      }
    });
  });

  // Certificate toggle
  certificateToggle?.addEventListener('click', () => {
    certificateContainer.classList.toggle('hidden');
    certificateToggle.textContent = certificateContainer.classList.contains('hidden') ? 'Show Certificates' : 'Hide Certificates';
  });

  // Scroll buttons
  scrollLeftBtn?.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
  });

  scrollRightBtn?.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
  });
});



/*project main page*/

document.addEventListener('DOMContentLoaded', function () {
  // Filtering Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to the clicked button
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      // Show or hide projects based on filter
      projectItems.forEach(item => {
        const status = item.getAttribute('data-status');
        if (filter === 'all' || status === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Show all projects by default
  projectItems.forEach(item => {
    item.style.display = 'flex';
  });

  // Image Carousel Functionality for Project Cards
  projectItems.forEach(item => {
    const carousel = item.querySelector('.project-image-carousel');
    const imagesContainer = carousel.querySelector('.carousel-images');
    const images = imagesContainer.querySelectorAll('img');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');

    let currentIndex = 0;
    const totalImages = images.length;

    // Show the first image by default
    imagesContainer.style.transform = `translateX(0)`;

    // Next button
    nextButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering the modal
      currentIndex = (currentIndex + 1) % totalImages;
      imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    // Previous button
    prevButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering the modal
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    // Hide navigation buttons if there's only one image
    if (totalImages <= 1) {
      prevButton.style.display = 'none';
      nextButton.style.display = 'none';
    }
  });

  // Modal Functionality
  const modal = document.getElementById('projectModal');
  const modalTitle = modal.querySelector('.modal-title');
  const modalImageGrid = modal.querySelector('.modal-image-grid');
  const modalDescription = modal.querySelector('.modal-description');
  const modalInfo = modal.querySelector('.modal-info');
  const modalLinks = modal.querySelector('.modal-links');
  const modalClose = modal.querySelector('.modal-close');

  projectItems.forEach(item => {
    const detailsBtn = item.querySelector('.details-btn');
    detailsBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent multiple triggers

      // Get project details
      const title = item.querySelector('h3').textContent;
      const description = item.querySelector('.description').innerHTML;
      const details = item.querySelector('.project-details').innerHTML;
      const images = Array.from(item.querySelectorAll('.carousel-images img')).map(img => img.src);

      // Populate modal
      modalTitle.textContent = title;
      modalDescription.innerHTML = description;

      // Populate image grid
      modalImageGrid.innerHTML = images.map(src => `<img src="${src}" alt="${title}">`).join('');

      // Extract info (exclude description, code, and view links)
      const detailsClone = item.querySelector('.project-details').cloneNode(true);
      detailsClone.querySelector('.description').remove();
      const codeLink = detailsClone.querySelector('p:last-child');
      const viewLink = detailsClone.querySelector('p:nth-last-child(2)');
      codeLink.remove();
      viewLink.remove();
      modalInfo.innerHTML = detailsClone.innerHTML;

      // Populate links
      modalLinks.innerHTML = `
        ${viewLink.querySelector('a') ? `<a href="${viewLink.querySelector('a').href}" target="_blank">${viewLink.querySelector('a').textContent}</a>` : ''}
        ${codeLink.querySelector('a') ? `<a href="${codeLink.querySelector('a').href}" target="_blank">${codeLink.querySelector('a').textContent}</a>` : ''}
      `;

      // Show modal with animation
      modal.classList.add('active');
    });

    // Fallback: Allow clicking the entire card to open modal
    item.addEventListener('click', () => {
      detailsBtn.click();
    });
  });

  // Close modal
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

// Features Slideshow
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.features .slide-image');
  const indicators = document.querySelectorAll('.features .indicator');
  
  if (slides.length === 0 || indicators.length === 0) return;
  
  let currentSlide = 0;
  const slideInterval = 4000; // Change slide every 4 seconds
  
  function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // Auto-advance slideshow
  let slideTimer = setInterval(nextSlide, slideInterval);
  
  // Manual control with indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      
      // Reset timer when manually changing slides
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
    });
  });
  
  // Pause on hover (optional)
  const slideshowContainer = document.querySelector('.features .features-slideshow');
  if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', () => {
      clearInterval(slideTimer);
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
      slideTimer = setInterval(nextSlide, slideInterval);
    });
  }
});
