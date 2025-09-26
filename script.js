document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const btn = document.querySelector('.back-to-top');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Navigation highlighting based on scroll position
  const sideLinks = document.querySelectorAll('.side-link');
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    sideLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Add scroll listener for navigation highlighting
  window.addEventListener('scroll', highlightNavigation);
  
  // Initial call to set correct active state on page load
  highlightNavigation();

  // Initialize mosaic slideshow with continuous animation
  const mosaicSlideshow = document.querySelector('.mosaic-slideshow');
  if (mosaicSlideshow) {
    const container = mosaicSlideshow.querySelector('.mosaic-container');
    const originalSlides = mosaicSlideshow.querySelectorAll('.mosaic-slide');
    
    // Clear container and add 2 copies of all slides for seamless loop
    container.innerHTML = '';
    for (let i = 0; i < 2; i++) {
      originalSlides.forEach(slide => {
        const clonedSlide = slide.cloneNode(true);
        container.appendChild(clonedSlide);
      });
    }

    // Add CSS animation for continuous sliding
    const style = document.createElement('style');
    style.textContent = `
      @keyframes continuousSlide {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      .mosaic-container.continuous {
        animation: continuousSlide 20s linear infinite;
      }
    `;
    document.head.appendChild(style);

    // Apply continuous animation
    container.classList.add('continuous');
  }

  // Initialize slideshows
  const slideshows = document.querySelectorAll('.slideshow');
  slideshows.forEach(slideshow => {
    const container = slideshow.querySelector('.slideshow-container');
    const slides = slideshow.querySelectorAll('.slide');
    const prevBtn = slideshow.querySelector('.prev');
    const nextBtn = slideshow.querySelector('.next');
    let currentSlide = 0;
    const slideWidth = 248 + 8; // 248px image + 8px gap
    let isTransitioning = false;

    // Clone slides for infinite effect
    const firstSlide = slides[0].cloneNode(true);
    const lastSlide = slides[slides.length - 1].cloneNode(true);
    container.appendChild(firstSlide);
    container.insertBefore(lastSlide, slides[0]);

    function updateSlideshow(instant = false) {
      if (instant) {
        container.style.transition = 'none';
      } else {
        container.style.transition = 'transform 0.3s ease';
      }
      const translateX = -currentSlide * slideWidth;
      container.style.transform = `translateX(${translateX}px)`;
    }

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide++;
      updateSlideshow();
      
      setTimeout(() => {
        if (currentSlide >= slides.length) {
          currentSlide = 0;
          updateSlideshow(true);
        }
        isTransitioning = false;
      }, 300);
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide--;
      updateSlideshow();
      
      setTimeout(() => {
        if (currentSlide < 0) {
          currentSlide = slides.length - 1;
          updateSlideshow(true);
        }
        isTransitioning = false;
      }, 300);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Initialize slideshow
    updateSlideshow();
  });
});


