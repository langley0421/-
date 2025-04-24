// domSelectors.js
//要素取得は DOMContentLoaded 後に実行されるように気を付ける（nullになる）

export const darkModeToggle = document.getElementById('dark-mode-toggle');
export const navLinks = document.querySelectorAll('.sidebar .nav-link');
export const addButton = document.querySelector('.add-button');
export const modal = document.getElementById('modal');
export const closeButton = document.querySelector('.close-button');
