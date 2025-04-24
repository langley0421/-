// ---DOMセレクター---



export function getDOMSelectors() {
    return {
        darkModeToggle: document.getElementById('dark-mode-toggle'),
        navLinks: document.querySelectorAll('.sidebar .nav-link'),
        addButton: document.querySelector('.add-button'),
        modal: document.querySelector('.modal'),
        closeButton: document.querySelector('.close-button'),
        resetButton: document.querySelector('.modal-button-reset'),
        submitButton: document.querySelector('.modal-button-submit'),
        cardList: document.getElementById('card-list'),
        homeLink: document.querySelector('.nav-link[href="#section1"]'),
        favoriteLink: document.querySelector('.nav-link[href="#section2"]'),
        searchInput: document.querySelector('.search-input'),
        searchButton: document.querySelector('.search-button'),
    };
}
