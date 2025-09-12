// Free Voice Academy - Interactive Features

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all features
    initContactForm();
    initScrollEffects();
    initAnimationObserver();
    initPerformanceOptimizations();
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.form-submit');
    const submitText = submitButton.querySelector('.submit-text');
    const submitIcon = submitButton.querySelector('.submit-icon');
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Add input validation feedback
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.form-submit');
    const submitText = submitButton.querySelector('.submit-text');
    const submitIcon = submitButton.querySelector('.submit-icon');
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitText.textContent = 'Sending...';
    submitIcon.textContent = '⏳';
    submitButton.style.background = 'linear-gradient(135deg, #a0a0a0, #808080)';
    
    // Simulate form submission (replace with actual backend integration)
    setTimeout(() => {
        showSuccessMessage();
        resetForm(form);
        
        // Reset button state
        submitButton.disabled = false;
        submitText.textContent = 'Notify Me';
        submitIcon.textContent = '→';
        submitButton.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }, 2000);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('.form-input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    const type = input.type;
    
    // Remove existing error styling
    clearValidationError({ target: input });
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Name validation
    if (input.name === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    }
    
    if (!isValid) {
        showValidationError(input, errorMessage);
    }
    
    return isValid;
}

function showValidationError(input, message) {
    input.style.borderColor = '#e53e3e';
    input.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #e53e3e;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: fadeInUp 0.3s ease;
    `;
    
    input.parentNode.appendChild(errorElement);
}

function clearValidationError(e) {
    const input = e.target;
    input.style.borderColor = '#e2e8f0';
    input.style.boxShadow = 'none';
    
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✓</span>
            <span class="notification-text">Thank you! We'll notify you when we launch.</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: linear-gradient(135deg, #48bb78, #38a169);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(72, 187, 120, 0.3);
        z-index: 1001;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 3s forwards;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3500);
}

function resetForm(form) {
    form.reset();
    
    // Clear any validation errors
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.style.borderColor = '#e2e8f0';
        input.style.boxShadow = 'none';
    });
}

// Scroll Effects
function initScrollEffects() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Header hide/show on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// Intersection Observer for Animations
function initAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.contact, .footer');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Optimize animations for performance
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out;
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Export functions for potential future backend integration
window.FreeVoiceApp = {
    validateForm,
    handleFormSubmit,
    showSuccessMessage,
    resetForm
};