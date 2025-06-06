document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    if (targetId !== '#') {
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });

        // Sticky header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            header.classList.toggle('sticky', window.scrollY > 50);
        });

        // Highlight current section in navigation
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('nav a[href^="#"]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });

        document.querySelectorAll('.book-btn, .btn-primary[href="#"]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real implementation, this would open a booking modal
                alert('Thank you for your interest in Renita Luxe Hotel! Our booking system would open here in a full implementation.');
            });
        });
        
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
    
    if(link.href === window.location.href.split('#')[0] + link.getAttribute('href')) {
        link.classList.add('active');
    }
});

document.querySelector('.home-link').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
});
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.icon-carousel-track');
    const cards = document.querySelectorAll('.icon-card');
    const prevBtn = document.querySelector('.icon-prev');
    const nextBtn = document.querySelector('.icon-next');
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // Include margin

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update active class
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex || index === currentIndex + 1);
        });
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 2) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Initialize
    updateCarousel();
});

// Enhanced Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.rooms-carousel');
    const cards = document.querySelectorAll('.room-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    function updateCarousel() {
        // Hide all cards
        cards.forEach(card => card.classList.remove('active'));
        // Show current card
        cards[currentIndex].classList.add('active');
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function moveToIndex(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }
    
    // Button events
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => moveToIndex(index));
    });
    
    // Auto-rotation (optional)
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
});

// Reviews Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentIndex = 0;
    const cardsPerPage = 2;
    const totalPages = Math.ceil(reviewCards.length / cardsPerPage);
    
    function showReviews(pageIndex) {
        // Hide all reviews
        reviewCards.forEach(card => {
            card.classList.remove('active');
            card.classList.add('hidden');
        });
        
        // Show reviews for current page
        const startIndex = pageIndex * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        
        for (let i = startIndex; i < endIndex && i < reviewCards.length; i++) {
            reviewCards[i].classList.remove('hidden');
            reviewCards[i].classList.add('active');
        }
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === pageIndex);
        });
    }
    
    function nextPage() {
        currentIndex = (currentIndex + 1) % totalPages;
        showReviews(currentIndex);
    }
    
    function prevPage() {
        currentIndex = (currentIndex - 1 + totalPages) % totalPages;
        showReviews(currentIndex);
    }
    
    // Initialize
    showReviews(0);
    
    // Event listeners
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showReviews(currentIndex);
        });
    });
    
    // Auto-rotation (optional)
    let autoRotate = setInterval(nextPage, 8000);
    
    // Pause on hover
    const carousel = document.querySelector('.reviews-carousel-wrapper');
    carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(nextPage, 8000);
    });
});

// Interactive FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Open first item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});

// Booking Section Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Room Selection
    const roomOptions = document.querySelectorAll('.room-option');
    const priceDisplays = document.querySelectorAll('.room-option .price');
    
    const roomPrices = {
        deluxe: 'Ksh 5,000',
        executive: 'Ksh 8,500',
        presidential: 'Ksh 15,000'
    };
    
    roomOptions.forEach(option => {
        option.addEventListener('click', function() {
            roomOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, you might update the form based on selection
        });
    });
    
    // Date Validation
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;
    
    checkInInput.addEventListener('change', function() {
        checkOutInput.min = this.value;
        if (checkOutInput.value && checkOutInput.value < this.value) {
            checkOutInput.value = '';
        }
    });
    
    // Form Submission
    document.querySelector('.booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Your booking request has been received! Our team will contact you shortly to confirm your reservation.');
        this.reset();
    });
});

// Auto-scrolling carousel for mobile
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.partners-carousel');
    
    function duplicateCarousel() {
        if (window.innerWidth < 992) {
            // Clone all partner cards
            const cards = document.querySelectorAll('.partner-card');
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                carousel.appendChild(clone);
            });
        }
    }
    
    // Initialize on load
    duplicateCarousel();
    
    // Re-initialize on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            // Remove clones if resizing back to desktop
            const allCards = document.querySelectorAll('.partner-card');
            if (allCards.length > 5) {
                for (let i = 5; i < allCards.length; i++) {
                    allCards[i].remove();
                }
            }
        } else {
            duplicateCarousel();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopNav = document.getElementById('desktop-nav');

    // Toggle mobile menu
    hamburgerBtn.addEventListener('click', function() {
      mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Switch between mobile/desktop nav based on screen size
    function updateNav() {
      if (window.innerWidth >= 768) {
        desktopNav.style.display = 'block';
        mobileMenu.style.display = 'none';
        document.getElementById('mobile-nav').style.display = 'none';
      } else {
        desktopNav.style.display = 'none';
        document.getElementById('mobile-nav').style.display = 'flex';
      }
    }

    // Initialize and update on resize
    updateNav();
    window.addEventListener('resize', updateNav);
  });

document.addEventListener('DOMContentLoaded', function() {
  // Get all necessary elements
  const container = document.querySelector('.review-groups-container');
  const groups = document.querySelectorAll('.review-group');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');
  const dots = document.querySelectorAll('.dot');
  
  let currentIndex = 0;
  const totalGroups = groups.length;

  // Function to update carousel position
  function updateCarousel() {
    // Calculate the correct translation based on viewport
    const translateValue = window.innerWidth >= 993 ? 
      -currentIndex * (100 / 3) : 
      -currentIndex * 100;
    
    container.style.transform = `translateX(${translateValue}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    console.log(`Current index: ${currentIndex}, Translation: ${translateValue}%`);
  }

  // Next button click handler
  nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % totalGroups;
    updateCarousel();
  });

  // Previous button click handler
  prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + totalGroups) % totalGroups;
    updateCarousel();
  });

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Initialize carousel
  updateCarousel();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    updateCarousel();
  });
});

document.getElementById('renitaContactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formStatus = document.getElementById('renitaFormStatus');
    
    // Simulate form submission
    formStatus.textContent = "Your enquiry is being sent...";
    formStatus.style.display = 'block';
    formStatus.style.background = '#f9f5f0';
    formStatus.style.color = '#3a2e26';
    
    setTimeout(() => {
        formStatus.textContent = "Thank you for your enquiry! Our concierge team will respond shortly.";
        formStatus.style.background = '#e8f5e9';
        formStatus.style.color = '#2e7d32';
        document.getElementById('renitaContactForm').reset();
    }, 1500);
});

// JavaScript for Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.querySelector('.amenities-scroll');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const cardWidth = document.querySelector('.amenity-card').offsetWidth;
    const gap = 30; // Same as your CSS gap value
    
    // Scroll two cards at a time (card width + gap) * 2
    const scrollAmount = (cardWidth + gap) * 2;
    
    rightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    leftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Hide/show arrows based on scroll position
    function updateArrowVisibility() {
        leftBtn.style.visibility = scrollContainer.scrollLeft > 0 ? 'visible' : 'hidden';
        rightBtn.style.visibility = scrollContainer.scrollLeft < 
            (scrollContainer.scrollWidth - scrollContainer.clientWidth) ? 'visible' : 'hidden';
    }
    
    scrollContainer.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);
    updateArrowVisibility(); // Initial check
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Optional: For screen readers
    const isExpanded = mobileMenu.classList.contains('active');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
  });
  
  // Close menu when clicking links (optional)
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}