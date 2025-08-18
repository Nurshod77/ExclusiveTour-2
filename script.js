// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Booking functions
function openBooking() {
    openModal('bookingModal');
}

function selectPackage(packageType) {
    const packageSelect = document.querySelector('select[name="package"]');
    if (packageSelect) {
        const options = packageSelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === packageType) {
                options[i].selected = true;
                break;
            }
        }
    }
    openBooking();
}

function submitBooking(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const bookingData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        package: formData.get('package'),
        date: formData.get('date'),
        people: formData.get('people'),
        notes: formData.get('notes')
    };
    
    // Simulate booking submission
    console.log('Booking submitted:', bookingData);
    
    // Show success notification
    showNotification('Buyurtmangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
    
    // Close modal and reset form
    closeModal('bookingModal');
    event.target.reset();
}

// Contact form submission
function submitContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    console.log('Contact form submitted:', contactData);
    
    // Show success notification
    showNotification('Xabaringiz yuborildi! Tez orada javob beramiz.');
    
    // Reset form
    event.target.reset();
}

// Tour details
function viewTourDetails(tourType) {
    const tourDetails = {
        turkey: {
            title: 'Turkiya turi',
            description: 'Istanbul va Antalya bo\'ylab ajoyib sayohat',
            price: '$899',
            duration: '7 kun',
            highlights: ['Ayasofya masjidi', 'Topkapi saroyi', 'Kapadokiya', 'Antalya plyajlari']
        },
        dubai: {
            title: 'Dubai turi',
            description: 'Zamonaviy Dubai va Abu Dhabi',
            price: '$1,299',
            duration: '5 kun',
            highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Sheikh Zayed masjidi']
        },
        singapore: {
            title: 'Singapur turi',
            description: 'Singapur va Kuala Lumpur',
            price: '$1,599',
            duration: '8 kun',
            highlights: ['Marina Bay Sands', 'Gardens by the Bay', 'Petronas Towers', 'Sentosa Island']
        }
    };
    
    const tour = tourDetails[tourType];
    if (tour) {
        alert(`${tour.title}\n\n${tour.description}\n\nNarxi: ${tour.price}\nDavomiyligi: ${tour.duration}\n\nAsosiy joylar:\n${tour.highlights.join('\n')}`);
    }
}

// Notification system
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .package-card, .tour-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimations();
    handleHeaderScroll();
    
    // Add smooth scrolling to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Auto-hide notification after page load
    setTimeout(() => {
        const notification = document.getElementById('notification');
        if (notification && notification.classList.contains('show')) {
            notification.classList.remove('show');
        }
    }, 5000);
});

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showNotification('Sizning so\'rovingiz qabul qilindi tez orada siz bilan bog\'lanamiz');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Scroll animatsiyasi
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // Rasmlarni almashtirish
    const images = document.querySelectorAll('.slider-img');
    let currentImageIndex = 0;

    function changeImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    // Rasmlarni 5 soniyada bir almashtirishni boshlash
    setInterval(changeImage, 3000); // 3000 millisekund = 3 soniya
});