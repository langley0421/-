// カードを追加するコード

import {
    createCardElement,
    displayCards,
    showDetailModal
} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardList = document.getElementById('card-list');
    const homeLink = document.querySelector('.nav-link[href="#section1"]');
    const favoriteLink = document.querySelector('.nav-link[href="#section2"]');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const modal = document.querySelector('.modal');
    const addButton = document.querySelector('.add-button');
    const closeButton = document.querySelector('.close-button');
    const resetButton = document.querySelector('.modal-button-reset');
    const submitButton = document.querySelector('.modal-button-submit');

    let allCardsData = [];

    fetch('../JSON/data.json')
        .then(res => res.json())
        .then(data => {
            allCardsData = data;
            displayCards(allCardsData, cardList, showDetailModal);
        });

    addButton.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hidden');
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.classList.add('hidden');
    });

    resetButton.addEventListener('click', () => {
        document.querySelectorAll('.modal-content input').forEach(input => input.value = '');
    });

    submitButton.addEventListener('click', () => {
        const cardData = {
            company: document.querySelector('input[name="company"]').value,
            name: document.querySelector('input[name="name"]').value,
            zipcode: document.querySelector('input[name="zipcode"]').value,
            address: document.querySelector('input[name="address"]').value,
            department: document.querySelector('input[name="department"]').value,
            phone: document.querySelector('input[name="phone"]').value,
            position: document.querySelector('input[name="position"]').value,
            email: document.querySelector('input[name="email"]').value,
            remarks: document.querySelector('input[name="remarks"]').value,
            favorite: false
        };

        if (!cardData.name) {
            alert('氏名は必須です。');
            return;
        }

        const card = createCardElement(cardData, showDetailModal);
        cardList.appendChild(card);
        modal.classList.remove('show');
        modal.classList.add('hidden');
        resetButton.click();
    });

    homeLink.addEventListener('click', () => {
        displayCards(allCardsData, cardList, showDetailModal);
    });

    favoriteLink.addEventListener('click', () => {
        const favs = allCardsData.filter(card => card.favorite);
        displayCards(favs, cardList, showDetailModal);
    });

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        const filtered = allCardsData.filter(card =>
            card.name.toLowerCase().includes(query) ||
            card.company.toLowerCase().includes(query) ||
            card.department.toLowerCase().includes(query) ||
            card.remarks.toLowerCase().includes(query)
        );
        displayCards(filtered, cardList, showDetailModal);
    });
});
