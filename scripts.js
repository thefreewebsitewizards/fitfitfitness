// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initProgramsCarousel();
    // Remove or comment out the initTestimonialsCarousel() call in the DOMContentLoaded event listener
    // initTestimonialsCarousel();
    initFAQ();
    initScrollAnimations();
    initSmoothScrolling();
    initContactModal();
    initStickyNavbar();
    initBookingModals();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Programs Carousel Functionality
function initProgramsCarousel() {
    const carousel = document.getElementById('programs-carousel');
    const prevBtn = document.getElementById('programs-prev');
    const nextBtn = document.getElementById('programs-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cards = carousel.querySelectorAll('.program-card');
    const totalCards = cards.length;
    const cardsToShow = window.innerWidth <= 768 ? (window.innerWidth <= 480 ? 1 : 2) : 3;
    const maxIndex = Math.max(0, totalCards - cardsToShow);
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 20;
        const translateX = -(currentIndex * (cardWidth + gap));
        carousel.style.transform = `translateX(${translateX}px)`;
    }
    
    function nextSlide() {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play carousel
    setInterval(nextSlide, 5000);
    
    // Update on window resize
    window.addEventListener('resize', function() {
        const newCardsToShow = window.innerWidth <= 768 ? (window.innerWidth <= 480 ? 1 : 2) : 3;
        const newMaxIndex = Math.max(0, totalCards - newCardsToShow);
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }
        updateCarousel();
    });
}

// Testimonials Carousel Functionality
function initTestimonialsCarousel() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-btn.prev-btn');
    const nextBtn = document.querySelector('.carousel-btn.next-btn');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardCount = cards.length;
    
    // Set initial position
    updateCarousel();
    
    function updateCarousel() {
        // Update track position
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    }
    
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = cardCount - 1;
        if (currentIndex >= cardCount) currentIndex = 0;
        updateCarousel();
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Add event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Add click event to dots
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
    }
    
    // Auto-rotate testimonials
    const autoplayInterval = setInterval(nextSlide, 5000);
    
    // Pause autoplay on hover
    if (track) {
        track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        track.addEventListener('mouseleave', () => setInterval(nextSlide, 5000));
    }
}

// FAQ Accordion Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.about-text, .about-image, .schedule-item, .article-card, .program-card');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Modal Functionality
function initContactModal() {
    const modal = document.getElementById('contact-modal');
    const closeBtn = modal?.querySelector('.close');
    const contactLinks = document.querySelectorAll('a[href*="contact"], .contact-trigger');
    
    if (!modal) return;
    
    // Open modal
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Handle form submission
    const contactForm = modal.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            closeModal();
        });
    }
}

// Sticky Navbar
function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            // When scrolled down - solid background
            navbar.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            navbar.style.backdropFilter = 'none';
        } else {
            // When at top - transparent background
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Add hover effects for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .learn-more-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add pulse animation to CTA buttons
function addPulseAnimation() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        setInterval(() => {
            button.style.animation = 'none';
            setTimeout(() => {
                button.style.animation = 'pulse 2s infinite';
            }, 10);
        }, 8000);
    });
}

// Initialize pulse animation
document.addEventListener('DOMContentLoaded', addPulseAnimation);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});


// Initialize active navigation
document.addEventListener('DOMContentLoaded', initActiveNavigation);

// Add typing effect to hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = function() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1000);
}

// Initialize typing effect
window.addEventListener('load', initTypingEffect);



// Add form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    
    field.classList.remove('error');
    
    if (!value) {
        field.classList.add('error');
        return false;
    }
    
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    return true;
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', initFormValidation);

// Program Modal Functions
function openProgramModal(program) {
    // Instead of opening a modal, scroll to the contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}


// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.program-modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            const programType = modal.id.replace('-modal', '');
            closeProgramModal(programType);
        }
    });
});

// Handle program registration form submissions
function submitProgramRegistration(event, programType) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Basic validation
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    if (!isValid) {
        showMessage('Please fill in all required fields.', 'error', form);
        return;
    }
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value && !emailRegex.test(field.value)) {
            field.classList.add('error');
            isValid = false;
        }
    });
    
    if (!isValid) {
        showMessage('Please enter a valid email address.', 'error', form);
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showMessage(`Thank you for registering for the ${getProgramName(programType)} program! We will contact you within 24 hours to schedule your consultation.`, 'success', form);
        
        // Reset form
        form.reset();
        
        // Close modal after a delay
        setTimeout(() => {
            closeProgramModal(programType);
        }, 3000);
        
        // Log registration data (replace with actual API call)
        console.log(`${programType} registration:`, data);
        
    }, 2000);
}

// Helper function to get program display name
function getProgramName(programType) {
    const names = {
        'weightloss': 'Weight Loss',
        'selfdefense': 'Self Defense',
        'kids': 'Kids Fitness'
    };
    return names[programType] || programType;
}

// Show message function for forms
function showMessage(message, type, form) {
    // Remove existing messages
    const existingMessages = form.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Insert at the top of the form
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Add modal slide out animation to CSS
const modalAnimationStyle = document.createElement('style');
modalAnimationStyle.textContent = `
    @keyframes modalSlideOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
        }
    }
`;
document.head.appendChild(modalAnimationStyle);

// Enhanced form validation
function initProgramFormValidation() {
    const programForms = document.querySelectorAll('.program-registration-form');
    
    programForms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateProgramField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateProgramField(this);
                }
            });
        });
    });
}

function validateProgramField(field) {
    const value = field.value.trim();
    const type = field.type;
    
    field.classList.remove('error');
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        return false;
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            field.classList.add('error');
            return false;
        }
    }
    
    // Age validation
    if (type === 'number' && field.name.includes('age') && value) {
        const age = parseInt(value);
        const min = parseInt(field.getAttribute('min'));
        const max = parseInt(field.getAttribute('max'));
        
        if (age < min || age > max) {
            field.classList.add('error');
            return false;
        }
    }
    
    return true;
}

// Initialize program form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProgramFormValidation();
});

// Keyboard navigation for modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.program-modal[style*="block"]');
        openModals.forEach(modal => {
            const programType = modal.id.replace('-modal', '');
            closeProgramModal(programType);
        });
    }
});

// Add CSS for form validation
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 5px rgba(220, 53, 69, 0.3) !important;
    }
`;
document.head.appendChild(style);

// Booking Modal Functionality
function initBookingModals() {
    const bookTrialBtn = document.getElementById('book-trial-btn');
    const viewScheduleBtn = document.getElementById('view-schedule-btn');
    
    if (bookTrialBtn) {
        bookTrialBtn.addEventListener('click', () => {
            // Scroll to contact section instead of opening modal
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (viewScheduleBtn) {
        viewScheduleBtn.addEventListener('click', () => openBookingModal('view-schedule'));
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const bookingModals = document.querySelectorAll('.booking-modal');
        bookingModals.forEach(modal => {
            if (event.target === modal) {
                const modalId = modal.id.replace('-modal', '');
                closeBookingModal(modalId);
            }
        });
    });
    
    // Initialize schedule tabs
    initScheduleTabs();
}

// Open booking modal
function openBookingModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set minimum date for trial booking
        if (modalType === 'book-trial') {
            const dateInput = document.getElementById('trial-date');
            if (dateInput) {
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateInput.min = tomorrow.toISOString().split('T')[0];
            }
        }
    }
}

// Close booking modal
function closeBookingModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Open trial modal from schedule modal
function openTrialModal() {
    closeBookingModal('view-schedule');
    openBookingModal('book-trial');
}

// Schedule tabs functionality
function initScheduleTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showScheduleTab(tabName);
        });
    });
}

// Show schedule tab
function showScheduleTab(tabName) {
    // Hide all tabs
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    scheduleTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-schedule');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const activeBtn = document.querySelector(`[onclick*="'${tabName}'"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Submit trial booking form
function submitTrialBooking(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    if (!validateBookingForm(form)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showBookingMessage('Your free trial session has been booked! We will contact you within 24 hours to confirm your appointment.', 'success', form);
        
        // Reset form
        form.reset();
        
        // Close modal after a delay
        setTimeout(() => {
            closeBookingModal('book-trial');
        }, 3000);
        
        // Log booking data (replace with actual API call)
        console.log('Trial booking:', data);
        
    }, 2000);
}

// Validate booking form
function validateBookingForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Remove existing error classes
    form.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    
    // Check required fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        }
    });
    
    if (!isValid) {
        showBookingMessage('Please fill in all required fields.', 'error', form);
        return false;
    }
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.classList.add('error');
            showBookingMessage('Please enter a valid email address.', 'error', form);
            return false;
        }
    }
    
    // Date validation (must be in the future)
    const dateField = form.querySelector('input[type="date"]');
    if (dateField && dateField.value) {
        const selectedDate = new Date(dateField.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate <= today) {
            dateField.classList.add('error');
            showBookingMessage('Please select a future date.', 'error', form);
            return false;
        }
    }
    
    return true;
}

// Show booking message
function showBookingMessage(message, type, form) {
    // Remove existing messages
    const existingMessages = form.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Insert at the top of the form
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Enhanced keyboard navigation for booking modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openBookingModals = document.querySelectorAll('.booking-modal[style*="block"]');
        openBookingModals.forEach(modal => {
            const modalType = modal.id.replace('-modal', '');
            closeBookingModal(modalType);
        });
    }
});

// Initialize active navigation
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
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
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Update on page load
    updateActiveNav();
}
