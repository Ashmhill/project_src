/**
 * animations.js
 * Module for handling animations throughout the portfolio
 */

/**
 * Initialize animations across the site
 */
export function initAnimations() {
  // Set up different types of animations
  setupPageTransitions();
  setupScrollAnimations();
  setupHoverAnimations();
  setupLoaderAnimations();
  
  // Check if we're on a page that needs special animations
  const currentPage = document.body.id || '';
  handlePageSpecificAnimations(currentPage);
}

/**
 * Set up smooth page transitions
 */
function setupPageTransitions() {
  // Add transition class to the body
  document.body.classList.add('page-transition');
  
  // Add event listeners to all internal links
  document.querySelectorAll('a').forEach(link => {
    // Only apply to internal links that aren't anchors
    const href = link.getAttribute('href');
    if (href && href.startsWith('./') || (href.startsWith('/') && !href.startsWith('//')) || href.includes('.html')) {
      link.addEventListener('click', handleLinkClick);
    }
  });
}

/**
 * Handle link clicks for page transitions
 * @param {Event} event - The click event
 */
function handleLinkClick(event) {
  // Don't handle if modifier keys are pressed (user might want to open in new tab)
  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
  
  const href = event.currentTarget.getAttribute('href');
  
  // Don't handle anchor links
  if (href.startsWith('#')) return;
  
  // Prevent default navigation
  event.preventDefault();
  
  // Trigger exit animation
  document.body.classList.add('page-exit');
  
  // Navigate after animation completes
  setTimeout(() => {
    window.location.href = href;
  }, 300); // Match this with your CSS transition duration
}

/**
 * Set up animations that trigger on scroll
 */
function setupScrollAnimations() {
  // Get all elements that should animate on scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // If Intersection Observer is supported, use it
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Once animation has been triggered, we can stop observing
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    animatedElements.forEach(element => {
      element.classList.add('animate');
    });
  }
}

/**
 * Set up animations that trigger on hover
 */
function setupHoverAnimations() {
  // Project cards hover effect
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover');
    });
  });
  
  // Button hover effects
  const buttons = document.querySelectorAll('.btn, button');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.classList.add('hover');
    });
    
    button.addEventListener('mouseleave', () => {
      button.classList.remove('hover');
    });
  });
}

/**
 * Set up loading animations
 */
function setupLoaderAnimations() {
  // Show loader when content is loading
  const loader = document.querySelector('.loader');
  
  if (loader) {
    // Show loader initially
    loader.classList.add('active');
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
      loader.classList.add('fade-out');
      
      setTimeout(() => {
        loader.classList.remove('active');
        loader.classList.remove('fade-out');
      }, 500); // Match this with your CSS transition duration
    });
  }
}

/**
 * Handle animations specific to certain pages
 * @param {string} pageId - The ID of the current page
 */
function handlePageSpecificAnimations(pageId) {
  switch (pageId) {
    case 'home':
      setupHeroAnimation();
      break;
    case 'about':
      setupSkillsBarsAnimation();
      break;
    case 'projects':
      setupFilterAnimation();
      break;
    case 'project-details':
      setupGalleryAnimation();
      break;
    case 'contact':
      setupFormAnimation();
      break;
  }
}

/**
 * Set up homepage hero section animation
 */
function setupHeroAnimation() {
  const heroText = document.querySelector('.hero-text');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroText) {
    heroText.classList.add('animate-slide-up');
  }
  
  if (heroImage) {
    heroImage.classList.add('animate-fade-in');
  }
}

/**
 * Set up skills bars animation on about page
 */
function setupSkillsBarsAnimation() {
  const skillBars = document.querySelectorAll('.skill-bar .skill-progress');
  
  skillBars.forEach(bar => {
    // Get the target width from data attribute
    const width = bar.dataset.level || '0';
    
    // Set initial width to 0
    bar.style.width = '0%';
    
    // After a short delay, animate to the target width
    setTimeout(() => {
      bar.style.width = `${width}%`;
    }, 300);
  });
}

/**
 * Set up animation for project filters
 */
function setupFilterAnimation() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Animate the filtering
      projectCards.forEach(card => {
        card.classList.add('filter-transition');
        
        if (filter === 'all' || card.dataset.category === filter) {
          // Show card
          card.style.display = 'block';
          setTimeout(() => {
            card.classList.remove('filtered-out');
          }, 50);
        } else {
          // Hide card
          card.classList.add('filtered-out');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // Match this with your CSS transition duration
        }
        
        setTimeout(() => {
          card.classList.remove('filter-transition');
        }, 350);
      });
    });
  });
}

/**
 * Set up image gallery animations on project details page
 */
function setupGalleryAnimation() {
  const galleryImages = document.querySelectorAll('.project-screenshots img');
  
  galleryImages.forEach((img, index) => {
    // Add staggered animation delay based on index
    img.style.animationDelay = `${index * 0.15}s`;
    img.classList.add('animate-fade-in');
    
    // Add lightbox functionality
    img.addEventListener('click', () => {
      createLightbox(img.src, img.alt);
    });
  });
}

/**
 * Create a lightbox for viewing images
 * @param {string} src - The image source URL
 * @param {string} alt - The image alt text
 */
function createLightbox(src, alt) {
  // Create lightbox container
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  
  // Create image element
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  
  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('aria-label', 'Close lightbox');
  
  // Add click event to close lightbox
  closeBtn.addEventListener('click', () => {
    lightbox.classList.add('fade-out');
    setTimeout(() => {
      document.body.removeChild(lightbox);
    }, 300);
  });
  
  // Close on clicking background
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(lightbox);
      }, 300);
    }
  });
  
  // Append elements
  lightbox.appendChild(img);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);
  
  // Add animation class after appending
  setTimeout(() => {
    lightbox.classList.add('fade-in');
  }, 10);
}

/**
 * Set up form animations on contact page
 */
function setupFormAnimation() {
  const formInputs = document.querySelectorAll('.contact-form .form-group');
  
  // Add staggered animation to form inputs
  formInputs.forEach((input, index) => {
    input.style.animationDelay = `${index * 0.1}s`;
    input.classList.add('animate-slide-up');
  });
  
  // Add animations for form validation
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', (event) => {
      const isValid = event.target.checkValidity();
      
      if (!isValid) {
        event.preventDefault();
        
        // Shake effect for form on invalid submission
        form.classList.add('animate-shake');
        
        setTimeout(() => {
          form.classList.remove('animate-shake');
        }, 500);
      } else {
        // Success animation will be handled by formHandler.js
      }
    });
  }
}