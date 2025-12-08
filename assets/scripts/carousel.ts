// This file handles the functionality for any carousels on the site.

import { Carousel } from 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
        const carousel = new Carousel(carouselElement, {
            interval: 5000,
            wrap: true,
            pause: 'hover'
        });
    }
});