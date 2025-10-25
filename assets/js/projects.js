/**
 * Projects Page JavaScript
 * Handles filtering, carousel, and modal functionality
 */

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

  // Create full-screen image viewer (reused)
  let fullViewer = null;
  function createFullViewer() {
    fullViewer = document.createElement('div');
    fullViewer.className = 'full-image-viewer';
    fullViewer.innerHTML = `
      <div class="viewer-backdrop"></div>
      <div class="viewer-content">
        <button class="viewer-close" aria-label="Close image">×</button>
        <img class="viewer-img" src="" alt="">
      </div>
    `;
    document.body.appendChild(fullViewer);

    // Handlers
    const closeBtn = fullViewer.querySelector('.viewer-close');
    const backdrop = fullViewer.querySelector('.viewer-backdrop');

    function closeViewer() {
      fullViewer.classList.remove('active');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeViewer();
    });

    backdrop.addEventListener('click', closeViewer);

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && fullViewer.classList.contains('active')) {
        closeViewer();
      }
    });
  }

  projectItems.forEach(item => {
    const detailsBtn = item.querySelector('.details-btn');
    detailsBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent multiple triggers

      // Get project details
      const title = item.querySelector('h3').textContent;
      const detailsElement = item.querySelector('.project-details');
      const description = detailsElement.querySelector('.description');
      const images = Array.from(item.querySelectorAll('.carousel-images img')).map(img => img.src);

      // Populate modal
      modalTitle.textContent = title;
      
      // Populate description
      if (description) {
        modalDescription.innerHTML = description.innerHTML;
      }

      // Populate image grid
      modalImageGrid.innerHTML = images.map(src => `<img src="${src}" alt="${title}">`).join('');

      // Ensure full viewer exists
      if (!fullViewer) createFullViewer();

      // Add click listeners for each modal image to open full-screen viewer
      const modalImgs = modalImageGrid.querySelectorAll('img');
      modalImgs.forEach(imgEl => {
        imgEl.addEventListener('click', (e) => {
          e.stopPropagation();
          const viewerImg = fullViewer.querySelector('.viewer-img');
          viewerImg.src = imgEl.src;
          viewerImg.alt = imgEl.alt || title;
          fullViewer.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });

      // Extract info (exclude description, code, and view links)
      const detailsClone = detailsElement.cloneNode(true);
      const descriptionClone = detailsClone.querySelector('.description');
      if (descriptionClone) {
        descriptionClone.remove();
      }

      // Get all links
      const allParagraphs = Array.from(detailsClone.querySelectorAll('p'));
      const linkParagraphs = allParagraphs.filter(p => p.querySelector('a'));
      
      // Remove link paragraphs from info section
      linkParagraphs.forEach(p => p.remove());

      // Set the info content
      modalInfo.innerHTML = detailsClone.innerHTML;

      // Populate links section
      const linkHTML = linkParagraphs.map(p => {
        const link = p.querySelector('a');
        if (link) {
          return `<a href="${link.href}" target="_blank" class="modal-link">${link.textContent}</a>`;
        }
        return '';
      }).filter(html => html !== '').join('');

      modalLinks.innerHTML = linkHTML;

      // Show modal with animation
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Fallback: Allow clicking the entire card to open modal
    item.addEventListener('click', () => {
      detailsBtn.click();
    });
  });

  // Close modal function
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Close modal when clicking close button
  modalClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
