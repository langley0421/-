    import {
        displayCards,
        showDetailModal,
        toggleViewMode
    } from './utils.js';
    
    document.addEventListener('DOMContentLoaded', () => {
        const recentlyLink = document.querySelector('.nav-link[href="#section3"]');
        const cardList = document.getElementById('card-list');
        const dayFilterInput = document.getElementById('day-filter');
        const applyFilterButton = document.getElementById('apply-filter');
    
        let allCardsData = [];
    
        fetch('../JSON/data.json')
            .then(res => res.json())
            .then(data => {
                allCardsData = data;
            });
    
        recentlyLink.addEventListener('click', () => {
            toggleViewMode('recent');
    
            const sortedByCreatedAt = [...allCardsData].sort((a, b) =>
                new Date(b.created_at) - new Date(a.created_at)
            );
            displayCards(sortedByCreatedAt, cardList, showDetailModal);
        });
    
        applyFilterButton.addEventListener('click', () => {
            const days = parseInt(dayFilterInput.value, 10);
            const now = new Date();
    
            const filtered = allCardsData.filter(card => {
                const createdAt = new Date(card.created_at);
                const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);
                return diffDays <= days;
            });
    
            const sorted = filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            displayCards(sorted, cardList, showDetailModal);
        });
    });