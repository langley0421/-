// 最近追加されたカードを表示するためのコード

import {
    displayCards,
    showDetailModal
} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const recentlyLink = document.querySelector('.nav-link[href="#section3"]');
    const cardList = document.getElementById('card-list');
    let allCardsData = [];

    fetch('../JSON/data.json')
        .then(res => res.json())
        .then(data => {
            allCardsData = data;
        });

    recentlyLink.addEventListener('click', () => {
        const sortedByCreatedAt = [...allCardsData].sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        displayCards(sortedByCreatedAt, cardList, showDetailModal);
    });
});
