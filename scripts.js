document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  // Lazy load images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  }

  // Enhanced image error handling
  function createPlaceholder() {
    // Create a canvas element to generate a placeholder image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set dimensions
    canvas.width = 400;
    canvas.height = 300;
    
    // Fill background
    ctx.fillStyle = '#f0f5ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add diagonal lines
    ctx.beginPath();
    ctx.strokeStyle = '#e6e6e6';
    ctx.lineWidth = 2;
    for (let i = 0; i < canvas.width * 2; i += 20) {
      ctx.moveTo(0, i);
      ctx.lineTo(i, 0);
    }
    ctx.stroke();
    
    // Add icon representation
    ctx.fillStyle = '#2f80ed';
    ctx.beginPath();
    ctx.rect(canvas.width/2 - 40, canvas.height/2 - 30, 80, 60);
    ctx.fill();
    
    // Add text
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Image not available', canvas.width/2, canvas.height/2 + 60);
    
    return canvas.toDataURL('image/png');
  }
  
  // Set placeholder for all images
  const placeholderDataUrl = createPlaceholder();
  const images = document.querySelectorAll('.portfolio-image img');
  
  images.forEach(img => {
    // Improved error handler
    img.onerror = function() {
      if (!this.src.includes('data:image')) {
        this.classList.add('error');
        this.src = placeholderDataUrl;
        this.alt = 'Placeholder image';
      }
    };
    
    // Force reload images that might be cached
    const currentSrc = img.src;
    img.src = '';
    img.src = currentSrc;
  });

  // Handle image loading errors
  const imagesFallback = document.querySelectorAll("img");

  // Add error handler to each image
  imagesFallback.forEach((img) => {
    img.addEventListener("error", function () {
      this.classList.add("error");
      // Set a placeholder or fallback image
      if (!this.src.includes("placeholder.png")) {
        this.src = "./assets/placeholder.png";
      }
    });
  });

  // Create a placeholder image if it doesn't exist
  const placeholderImg = new Image();
  placeholderImg.onload = function () {
    // Placeholder exists, no need to create one
  };

  placeholderImg.onerror = function () {
    // Create a placeholder canvas as fallback
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 150;
    const ctx = canvas.getContext("2d");

    // Fill background
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = "#999";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Image not available", canvas.width / 2, canvas.height / 2);

    // Convert to data URL
    const dataURL = canvas.toDataURL("image/png");

    // Replace broken images with this placeholder
    document.querySelectorAll("img.error").forEach((img) => {
      img.src = dataURL;
    });
  };

  placeholderImg.src = "./assets/placeholder.png";

  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  // Initialize Swiper for testimonials
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Page load progress indicator
  const progress = document.createElement("div");
  progress.className = "page-load-progress";
  document.body.appendChild(progress);

  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        progress.style.opacity = "0";
        setTimeout(() => {
          progress.remove();
        }, 500);
      }, 300);
    } else {
      width++;
      progress.style.width = width + "%";
    }
  }, 10);

  // Animate skills progress bars when they enter viewport
  const progressBars = document.querySelectorAll(".progress");

  const animateProgress = () => {
    progressBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        bar.style.width = bar.style.width || "0%";
      }
    });
  };

  window.addEventListener("scroll", animateProgress);
  animateProgress(); // Initial check

  // Add typing animation effect for hero text
  const typingText = document.querySelector(".typing-text");
  if (typingText) {
    typingText.style.width = "0";
    setTimeout(() => {
      typingText.style.width = "100%";
    }, 500);
  }

  // Skills Tab Functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Show corresponding content
      const targetId = button.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");

      // Animate progress bars in the visible tab
      animateProgressBars(document.getElementById(targetId));
    });
  });

  // Portfolio/Project Filtering
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Get filter value
      const filterValue = button.getAttribute("data-filter");

      // Filter projects with animation
      portfolioItems.forEach((item) => {
        const categories = item.getAttribute("data-category");

        if (filterValue === "all" || categories.includes(filterValue)) {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.add("hide");
          item.classList.remove("show");
        }
      });
    });
  });

  // Portfolio Items - Show All Projects
  // Get all portfolio items
  portfolioItems.forEach((item) => {
    item.classList.remove("hide");
    item.classList.add("show");
  });

  // Remove click events from filter buttons but keep them visually
  filterButtons.forEach((button) => {
    // Remove existing event listeners by cloning and replacing
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);

    // Keep the "All Projects" button visually active
    if (newButton.getAttribute("data-filter") === "all") {
      newButton.classList.add("active");
    } else {
      newButton.classList.remove("active");
    }
  });

  // Function to animate progress bars
  function animateProgressBars(container) {
    const progressBars = container.querySelectorAll(".progress");

    progressBars.forEach((bar) => {
      const targetWidth = bar.style.width;
      bar.style.width = "0";

      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    });
  }

  // Initial animations
  setTimeout(() => {
    // Animate the progress bars in the active tab on page load
    const activeTab = document.querySelector(".tab-content.active");
    if (activeTab) {
      animateProgressBars(activeTab);
    }
  }, 500);

  // Skills hover effect
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Add hover effect
      card.classList.add("hovered");
    });

    card.addEventListener("mouseleave", () => {
      // Remove hover effect
      card.classList.remove("hovered");
    });
  });
});
