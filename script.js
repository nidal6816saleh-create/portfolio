// Initialize EmailJS (replace with your actual User ID)
emailjs.init('URww--RGIhMqhSl3j');

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Adjust for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            
            // Validation
            if (!validateForm(name, email, message)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            sendEmail(name, email, message)
                .then(() => {
                    showFormMessage('Thank you! Your message has been sent successfully to nidal123ln@gmail.com.', 'success');
                    this.reset();
                })
                .catch(error => {
                    console.error('Error sending email:', error);
                    showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
                })
                .finally(() => {
                    // Restore button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });

        // Real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        nameInput.addEventListener('input', function() {
            validateName(this);
        });

        emailInput.addEventListener('input', function() {
            validateEmail(this);
        });

        messageInput.addEventListener('input', function() {
            validateMessage(this);
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Form validation functions
function validateForm(name, email, message) {
    let isValid = true;

    // Validate name
    if (!name) {
        showFieldError('name', 'Name is required');
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        showFieldError('name', 'Name should contain only letters and spaces');
        isValid = false;
    } else {
        clearFieldError('name');
    }

    // Validate email
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid Gmail address (e.g., example@gmail.com)');
        isValid = false;
    } else {
        clearFieldError('email');
    }

    // Validate message
    if (!message) {
        showFieldError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showFieldError('message', 'Message should be at least 10 characters long');
        isValid = false;
    } else {
        clearFieldError('message');
    }

    return isValid;
}

// Real-time validation functions
function validateName(input) {
    const value = input.value.trim();
    if (value && !/^[A-Za-z\s]+$/.test(value)) {
        showFieldError('name', 'Name should contain only letters and spaces');
    } else {
        clearFieldError('name');
    }
}

function validateEmail(input) {
    const value = input.value.trim();
    if (value && !isValidEmail(value)) {
        showFieldError('email', 'Please enter a valid Gmail address (e.g., example@gmail.com)');
    } else {
        clearFieldError('email');
    }
}

function validateMessage(input) {
    const value = input.value.trim();
    if (value && value.length < 10) {
        showFieldError('message', 'Message should be at least 10 characters long');
    } else {
        clearFieldError('message');
    }
}

// Helper function to validate email format (Gmail only)
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
}

// Helper function to show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class to input
    field.classList.add('error');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
}

// Helper function to clear field error
function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove error class
    field.classList.remove('error');
    
    // Remove error message
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Helper function to show form messages
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert after the form
    const contactForm = document.getElementById('contactForm');
    contactForm.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Email sending function using EmailJS
function sendEmail(name, email, message) {
    const serviceID = 'service_pwcvd86';
    const templateID = 'template_qp9cs0q';
    
    // Prepare email parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        to_email: 'nidal123ln@gmail.com',
        message: message,
        reply_to: email,
        subject: `New Message from ${name} - Portfolio Website`
    };
    
    // If EmailJS is not set up, simulate sending (for demo purposes)
    if (serviceID === 'service_pwcvd86') {
        return new Promise((resolve) => {
            // Simulate API call delay
            setTimeout(() => {
                console.log('Email would be sent to: nidal123ln@gmail.com');
                console.log('Email content:', templateParams);
                resolve();
            }, 1500);
        });
    }
    
    // Real EmailJS implementation
    return emailjs.send(serviceID, templateID, templateParams);
}

// Add active class to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // Add click event to set active class
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});