// This file handles form validation and submission for the website.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');
    const submitButton = document.querySelector('#submit');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        // Clear previous error messages
        clearErrors();

        // Validate name
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'يرجى إدخال اسم صالح');
            isValid = false;
        }

        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'يرجى إدخال بريد إلكتروني صالح');
            isValid = false;
        }

        // Validate message
        if (!validateMessage(messageInput.value)) {
            showError(messageInput, 'يرجى إدخال رسالة');
            isValid = false;
        }

        // If the form is valid, submit it
        if (isValid) {
            submitForm();
        }
    });

    function validateName(name) {
        return name.trim().length > 0;
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validateMessage(message) {
        return message.trim().length > 0;
    }

    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach((error) => error.remove());
    }

    function submitForm() {
        // Here you can handle the form submission, e.g., send data to the server
        console.log('Form submitted successfully!');
        form.reset();
    }
});