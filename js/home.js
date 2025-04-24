import { 
    toggleDarkMode, 
    setActiveLink, 
    openModal, 
    closeModal, 
    setupModalCloseOnOutsideClick 
} from './utils.js';

import {
    darkModeToggle,
    navLinks,
    addButton,
    modal,
    closeButton
} from './domSelectors.js';

document.addEventListener('DOMContentLoaded', () => {

    // ---ダークモード切替処理---
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // ---サイドバーのアクティブ設定---
    setActiveLink(navLinks);

    // ---名刺の追加モーダルを表示処理---
    addButton.addEventListener('click', () => openModal(modal));

    // ---名刺の追加モーダルを閉じる処理---
    closeButton.addEventListener('click', () => closeModal(modal));

    // ---モーダル外をクリックした際のモーダルを閉じる処理---
    setupModalCloseOnOutsideClick(modal);
});

