/**
 * formHandler.js
 * Module for handling form validation and submission
 */

/**
 * Validate form inputs
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} Whether the form is valid
 */
export function validateForm(form) {
    let isValid = true;
    const errorSummary = [];
    
    // Clear previous error messages
    clearFormErrors(form);
    
    // Get all required inputs
    const requiredInputs = form.querySelectorAll('[required]');
    
    requiredInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
            
            // Add to error summary
            const label = getInputLabel(input);
            errorSummary.push(`${label || input.name}: This field is required`);
        }
    });
    
    // Validate email fields
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        if (input.value && !validateEmail(input.value)) {
            isValid = false;
            showInputError(input, 'Please enter a valid email address');
            
            // Add to error summary
            const label = getInputLabel(input);
            errorSummary.push(`${label || input.name}: Please enter a valid email address`);
        }
    });
    
    // Show error summary if needed
    if (errorSummary.length > 0) {
        showErrorSummary(form, errorSummary);
    }
    
    return isValid;
}

/**
 * Setup form listeners for validation and submission
 * @param {HTMLFormElement} form - The form to setup
 */
export function setupFormListeners(form) {
    if (!form) return;
    
    // Add submission handler
    form.addEventListener('submit', event => {
        event.preventDefault();
        
        if (validateForm(form)) {
            // Process form data
            const formData = new FormData(form);
            const formValues = {};
            
            // Convert FormData to object
            for (const [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Save to localStorage for demonstration
            saveFormSubmission(formValues);
            
            // Show success message
            showFormSuccess(form);
            
            // Reset form
            form.reset();
        }
    });
    
    // Add input validation on blur
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.required) {
                validateInput(input);
            }
            
            if (input.type === 'email' && input.value) {
                if (!validateEmail(input.value)) {
                    showInputError(input, 'Please enter a valid email address');
                }
            }
        });
        
        // Clear error message when typing
        input.addEventListener('input', () => {
            clearInputError(input);
        });
    });
}

/**
 * Validate a single input
 * @param {HTMLElement} input - The input to validate
 * @returns {boolean} Whether the input is valid
 */
function validateInput(input) {
    // Check if input is empty
    if (!input.value.trim()) {
        showInputError(input, 'This field is required');
        return false;
    }
    
    // Check min/max length if specified
    if (input.minLength && input.value.length < input.minLength) {
        showInputError(input, `Must be at least ${input.minLength} characters`);
        return false;
    }
    
    if (input.maxLength && input.value.length > input.maxLength) {
        showInputError(input, `Must be less than ${input.maxLength} characters`);
        return false;
    }
    
    // Clear any errors
    clearInputError(input);
    return true;
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Show error message for an input
 * @param {HTMLElement} input - The input with error
 * @param {string} message - The error message
 */
function showInputError(input, message) {
    // Add error class to parent element
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.classList.add('input-error');
    }
    
    // Create or update error message
    let errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

/**
 * Clear error message for an input
 * @param {HTMLElement} input - The input to clear error for
 */
function clearInputError(input) {
    // Remove error class from parent element
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.classList.remove('input-error');
    }
    
    // Remove error message
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Clear all form errors
 * @param {HTMLFormElement} form - The form to clear errors for
 */
function clearFormErrors(form) {
    // Clear input errors
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());
    
    const errorInputs = form.querySelectorAll('.input-error');
    errorInputs.forEach(el => el.classList.remove('input-error'));
    
    // Clear error summary
    const errorSummary = form.querySelector('.form-error-summary');
    if (errorSummary) {
        errorSummary.remove();
    }
}

/**
 * Show error summary for a form
 * @param {HTMLFormElement} form - The form to show errors for
 * @param {Array} errors - Array of error messages
 */
function showErrorSummary(form, errors) {
    // Create error summary
    const errorSummary = document.createElement('div');
    errorSummary.className = 'form-error-summary';
    
    const heading = document.createElement('h3');
    heading.textContent = 'Please fix the following errors:';
    errorSummary.appendChild(heading);
    
    const list = document.createElement('ul');
    errors.forEach(error => {
        const item = document.createElement('li');
        item.textContent = error;
        list.appendChild(item);
    });
    
    errorSummary.appendChild(list);
    
    // Insert at top of form
    form.insertBefore(errorSummary, form.firstChild);
}

/**
 * Get the label text for an input
 * @param {HTMLElement} input - The input to get label for
 * @returns {string} The label text or empty string
 */
function getInputLabel(input) {
    const id = input.id;
    if (!id) return '';
    
    const label = document.querySelector(`label[for="${id}"]`);
    return label ? label.textContent : '';
}

/**
 * Show success message for form submission
 * @param {HTMLFormElement} form - The form that was submitted
 */
function showFormSuccess(form) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = '<h3>Thank You!</h3><p>Your message has been sent successfully.</p>';
    
    // Insert at top of form
    form.insertBefore(successMessage, form.firstChild);
    
    // Remove after a delay
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/**
 * Save form submission to localStorage
 * @param {Object} formData - The form data to save
 */
function saveFormSubmission(formData) {
    try {
        // Get existing submissions
        const submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
        
        // Add new submission with timestamp
        submissions.push({
            ...formData,
            timestamp: new Date().toISOString()
        });
        
        // Save back to localStorage
        localStorage.setItem('form_submissions', JSON.stringify(submissions));
    } catch (error) {
        console.error('Error saving form submission:', error);
    }
}