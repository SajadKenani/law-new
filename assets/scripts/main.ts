// This is the main script that initializes the website functionality.

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navbar functionality
    const navbar = require('./navbar');
    navbar.init();

    // Initialize carousel functionality
    const carousel = require('./carousel');
    carousel.init();

    // Initialize form functionality
    const forms = require('./forms');
    forms.init();
});