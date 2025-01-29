import { writable } from 'svelte/store';

function createBooksStore() {
    const isClient = typeof window !== 'undefined';  // Vérifie qu'on est bien dans un environnement client

    // Définir les livres par défaut
    const defaultBooks = [
        {
            title: "Tout le bleu du ciel",
            author: "Mélissa Da Costa",
            description: "Jeune homme de 26 ans, condamné à une espérance de vie de deux ans par un Alzheimer précoce...",
            rating: 4,
            isRead: false
        },
        {
            title: "La Vie secrète des arbres",
            author: "Peter Wohlleben",
            description: "Un voyage fascinant au coeur de la forêt pour découvrir les secrets des arbres...",
            rating: 5,
            isRead: false
        },
        {
            title: "L'ombre du vent",
            author: "Carlos Ruiz Zafón",
            description: "Un jeune garçon découvre un livre mystérieux dans un cimetière de livres oubliés...",
            rating: 5,
            isRead: false
        },
        {
            title: "Les Misérables",
            author: "Victor Hugo",
            description: "L'histoire d'un homme, Jean Valjean, cherchant à se réhabiliter dans une société injuste.",
            rating: 4,
            isRead: false
        },
        {
            title: "L'Alchimiste",
            author: "Paulo Coelho",
            description: "L'histoire d'un jeune berger andalou qui poursuit son rêve de découvrir un trésor.",
            rating: 4,
            isRead: false
        },
        {
            title: "1984",
            author: "George Orwell",
            description: "Un homme lutte contre un système totalitaire qui manipule la réalité.",
            rating: 5,
            isRead: false
        },
        {
            title: "Le Petit Prince",
            author: "Antoine de Saint-Exupéry",
            description: "L'histoire poétique d'un petit garçon venu d'une autre planète.",
            rating: 5,
            isRead: false
        },
        {
            title: "Sapiens",
            author: "Yuval Noah Harari",
            description: "Une histoire de l'humanité, de ses origines à l'ère moderne.",
            rating: 4,
            isRead: false
        },
        {
            title: "Le Seigneur des Anneaux",
            author: "J.R.R. Tolkien",
            description: "L'histoire d'une quête pour détruire un anneau maléfique.",
            rating: 5,
            isRead: false
        },
        {
            title: "Le Parfum",
            author: "Patrick Süskind",
            description: "L'histoire d'un homme doté d'un sens de l'odorat exceptionnel qui cherche à créer un parfum parfait.",
            rating: 4,
            isRead: false
        }
    ];

    // Initialiser les livres avec une lecture de localStorage si côté client
    const storedBooks = isClient ? localStorage.getItem('books') : null;
    const initialBooks = storedBooks ? JSON.parse(storedBooks) : defaultBooks;

    const { subscribe, set, update } = writable(initialBooks);

    if (isClient) {
        // Synchroniser les livres avec localStorage à chaque changement
        subscribe((books) => {
            localStorage.setItem('books', JSON.stringify(books));
        });
    }

    return {
        subscribe,
        update,
        set
    };
}

// Créer et exporter le store
export const books = createBooksStore();
