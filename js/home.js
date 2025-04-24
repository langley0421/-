import { toggleDarkMode } from './utils.js';

const darkModeToggle = document.getElementById('dark-mode-toggle');

// ダークモード切替処理
darkModeToggle.addEventListener('click', toggleDarkMode);

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');

    // 最初に「ホーム」をアクティブに設定
    const homeLink = document.querySelector('.sidebar .nav-link[href="#section1"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // 他のリンクから active クラスを削除
            navLinks.forEach(nav => nav.classList.remove('active'));
            // クリックされたリンクに active クラスを追加
            link.classList.add('active');
        });
    });

    const addButton = document.querySelector('.add-button');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');

    // モーダルを表示
    addButton.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hidden');
    });

    // モーダルを閉じる
    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.classList.add('hidden');
    });

    // モーダル外をクリックして閉じる
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
            modal.classList.add('hidden');
        }
    });
});

