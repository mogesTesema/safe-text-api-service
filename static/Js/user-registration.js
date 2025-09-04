// SafeText Registration Form JavaScript

// Form Elements
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Initialize form functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    createParticles();
    addFormListeners();
});

// Form initialization
function initializeForm() {
    // Add floating labels animation
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.form-group').classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.closest('.form-group').classList.remove('focused');
            }
        });
    });
}

// Add form event listeners
function addFormListeners() {
    // Real-time validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Input animations
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = 'translateY(0)';
        });
    });
}

// Password toggle functionality
function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
    
    // Add click animation
    icon.style.transform = 'scale(0.9)';
    setTimeout(() => {
        icon.style.transform = 'scale(1)';
    }, 150);
}

// Validation functions
function validateUsername() {
    const username = usernameInput.value.trim();
    const errorElement = document.getElementById('username-error');
    
    if (username.length < 3) {
        showError(errorElement, 'Username must be at least 3 characters long');
        return false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        showError(errorElement, 'Username can only contain letters, numbers, and underscores');
        return false;
    } else {
        hideError(errorElement);
        addSuccessIndicator(usernameInput);
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const errorElement = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showError(errorElement, 'Please enter a valid email address');
        return false;
    } else {
        hideError(errorElement);
        addSuccessIndicator(emailInput);
        return true;
    }
}

function validatePassword() {
    const password = passwordInput.value;
    const errorElement = document.getElementById('password-error');
    const strengthElement = document.getElementById('password-strength');
    
    if (password.length < 8) {
        showError(errorElement, 'Password must be at least 8 characters long');
        updatePasswordStrength('weak');
        return false;
    }
    
    let strength = 0;
    
    // Check password criteria
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength < 3) {
        showError(errorElement, 'Password is too weak. Add uppercase, lowercase, numbers, and symbols');
        updatePasswordStrength('weak');
        return false;
    } else if (strength < 4) {
        hideError(errorElement);
        updatePasswordStrength('medium');
        return true;
    } else {
        hideError(errorElement);
        updatePasswordStrength('strong');
        addSuccessIndicator(passwordInput);
        return true;
    }
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const errorElement = document.getElementById('confirm-password-error');
    
    if (confirmPassword !== password) {
        showError(errorElement, 'Passwords do not match');
        return false;
    } else if (confirmPassword.length > 0) {
        hideError(errorElement);
        addSuccessIndicator(confirmPasswordInput);
        return true;
    }
    return false;
}

// Update password strength indicator
function updatePasswordStrength(level) {
    const strengthElement = document.getElementById('password-strength');
    strengthElement.className = `password-strength show ${level}`;
}

// Error handling
function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
    
    // Add shake animation to input
    const input = element.previousElementSibling.querySelector('.input-field');
    input.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

function hideError(element) {
    element.classList.remove('show');
}

// Add success indicator
function addSuccessIndicator(input) {
    // Remove existing indicators
    const existingIndicator = input.parentNode.querySelector('.success-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // Add success checkmark
    const indicator = document.createElement('div');
    indicator.className = 'success-indicator absolute inset-y-0 right-8 flex items-center';
    indicator.innerHTML = '<div class="success-checkmark"></div>';
    input.parentNode.appendChild(indicator);
}

// Form submission handler
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
        // Show error animation
        submitBtn.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            submitBtn.style.animation = '';
        }, 500);
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loader').classList.remove('hidden');
    
    try {
        // Simulate API call
        await simulateRegistration();
        
        // Show success
        showSuccessMessage();
        
    } catch (error) {
        // Show error
        showErrorMessage('Registration failed. Please try again.');
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.querySelector('.btn-text').style.display = 'inline';
        submitBtn.querySelector('.btn-loader').classList.add('hidden');
    }
}

// Simulate registration API call
function simulateRegistration() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

// Success message
function showSuccessMessage() {
    const formContainer = document.querySelector('.bg-gradient-to-br');
    formContainer.innerHTML = `
        <div class="text-center animate-fade-in">
            <div class="inline-flex p-6 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <i class="fas fa-check text-green-400 text-4xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-white mb-4">Welcome to SafeText!</h2>
            <p class="text-gray-400 mb-6">Your account has been created successfully.</p>
            <button onclick="window.location.reload()" class="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105">
                Continue to Dashboard
            </button>
        </div>
    `;
}

// Error message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in-right z-50';
    errorDiv.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Create floating particles
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
    }
}

// Add shake animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
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
    
    .animate-slide-in-right {
        animation: slideInRight 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            // @ts-ignore
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[class*="animate-fade-in"]');
    animatedElements.forEach(el => observer.observe(el));
});