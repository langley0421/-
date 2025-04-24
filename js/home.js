import {
    toggleDarkMode,
    setActiveLink,
    openModal,
    closeModal,
    resetModalInputs,
    setupModalCloseOnOutsideClick,
    handleCardSubmission,
    displayCards,
    toggleViewMode,
    showDetailModal
} from './utils.js';

import { 
    getDOMSelectors 
} from './domSelectors.js';

document.addEventListener('DOMContentLoaded', () => {
    const dom = getDOMSelectors();
    let allCardsData = [];

    fetch('../JSON/data.json')
        .then(res => res.json())
        .then(data => {
            allCardsData = data;
            displayCards(allCardsData, dom.cardList, showDetailModal);
            setupCardFilters(dom, allCardsData); // データが取れたあとにフィルター設定
        });

    setupUIEvents(dom);
    setupModalEvents(dom);
});


// ---UI全般の初期化---
function setupUIEvents(dom) {
    dom.darkModeToggle.addEventListener('click', toggleDarkMode);
    setActiveLink(dom.navLinks);
}

// ---モーダル関連イベント---
function setupModalEvents(dom) {
    dom.addButton.addEventListener('click', () => openModal(dom.modal));
    dom.closeButton.addEventListener('click', () => closeModal(dom.modal));
    dom.resetButton.addEventListener('click', () => resetModalInputs());
    dom.submitButton.addEventListener('click', () => {
        handleCardSubmission(dom.cardList, dom.modal, showDetailModal, () => dom.resetButton.click());
    });
    setupModalCloseOnOutsideClick(dom.modal);
}


// ---フィルターや検索などカード表示切り替え---
function setupCardFilters(dom, allCardsData) {
    dom.homeLink.addEventListener('click', () => {
        toggleViewMode('search');
        displayCards(allCardsData, dom.cardList, showDetailModal);
    });

    dom.favoriteLink.addEventListener('click', () => {
        const favs = allCardsData.filter(card => card.favorite);
        displayCards(favs, dom.cardList, showDetailModal);
    });

    dom.searchButton.addEventListener('click', () => {
        const query = dom.searchInput.value.trim().toLowerCase();
        const filtered = allCardsData.filter(card =>
            card.name.toLowerCase().includes(query) ||
            card.company.toLowerCase().includes(query) ||
            card.department.toLowerCase().includes(query) ||
            card.remarks.toLowerCase().includes(query)
        );
        displayCards(filtered, dom.cardList, showDetailModal);
    });
}
