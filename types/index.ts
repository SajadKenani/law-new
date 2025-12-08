// This file defines TypeScript types and interfaces used throughout the project.

export interface Lawyer {
    id: number;
    name: string;
    position: string;
    bio: string;
    imageUrl: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
}

export interface Testimonial {
    id: number;
    clientName: string;
    profession: string;
    feedback: string;
    imageUrl: string;
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}