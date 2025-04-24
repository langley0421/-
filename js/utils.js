//モジュール化したJavaScriptコード



// ---単一の名刺カードを生成する関数。クリック時のコールバックも登録可能---
export function createCardElement(cardData, onCardClick) {
    const { company, name } = cardData;

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h3>${name}</h3>
        <p>${company}</p>
    `;
    card.dataset.details = generateCardDetailsHTML(cardData);

    card.addEventListener('click', () => {
        onCardClick(cardData, card);
    });

    return card;
}


// ---名刺一覧を表示する。空配列なら「該当なし」のメッセージを表示---
export function displayCards(cards, cardList, onCardClick) {
    cardList.innerHTML = '';

    if (cards.length === 0) {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = '該当する名刺がありません。';
        noResultMessage.classList.add('no-result-message');
        cardList.appendChild(noResultMessage);
        return;
    }

    cards.forEach(cardData => {
        const card = createCardElement(cardData, onCardClick);
        cardList.appendChild(card);
    });
}


// ---名刺データから詳細表示用のHTML文字列を生成する関数---
export function generateCardDetailsHTML(data) {
    return `
        <h3>${data.name}</h3>
        <p>会社名: ${data.company}</p>
        <p>郵便番号: ${data.zipcode}</p>
        <p>住所: ${data.address}</p>
        <p>部署名: ${data.department}</p>
        <p>電話番号: ${data.phone}</p>
        <p>役職名: ${data.position}</p>
        <p>メールアドレス: ${data.email}</p>
        <p>備考: ${data.remarks}</p>
    `;
}


// ---名刺詳細をモーダルで表示し、編集・削除・お気に入り・閉じるボタンを追加する関数---
export function showDetailModal(cardData, cardElement) {
    const detailModal = document.createElement('div');
    detailModal.classList.add('modal', 'show');
    detailModal.innerHTML = `
        <div class="modal-contents">
            ${cardElement.dataset.details}
            <button class="edit-button">編集</button>
            <button class="delete-button">削除</button>
            <button class="favorite-button">${cardData.favorite ? '★ お気に入り' : '☆ お気に入り'}</button>
            <button class="close-button">閉じる</button>
        </div>
    `;
    document.body.appendChild(detailModal);

    detailModal.querySelector('.edit-button').addEventListener('click', () => {
        // 編集処理をここに追加
    });

    detailModal.querySelector('.delete-button').addEventListener('click', () => {
        // 削除処理をここに追加
    });

    const favoriteButton = detailModal.querySelector('.favorite-button');
    favoriteButton.addEventListener('click', () => {
        cardData.favorite = !cardData.favorite;
        favoriteButton.textContent = cardData.favorite ? '★ お気に入り' : '☆ お気に入り';
    });

    detailModal.querySelector('.close-button').addEventListener('click', () => {
        document.body.removeChild(detailModal);
    });
}


// ---「検索モード」「最近追加モード」など、表示切替を行う関数---
export function toggleViewMode(mode) {
    const searchBar = document.querySelector('.search-bar');
    const recentFilter = document.getElementById('recent-filter');

    switch (mode) {
        case 'recent':
            searchBar.classList.add('hidden');
            recentFilter.classList.remove('hidden');
            break;
        case 'search':
            searchBar.classList.remove('hidden');
            recentFilter.classList.add('hidden');
            break;
        case 'none':
        default:
            searchBar.classList.add('hidden');
            recentFilter.classList.add('hidden');
            break;
    }
}


// ---ダークモードのON/OFFを切り替え、アイコンも更新する関数---
export function toggleDarkMode() {
    const iconContainer = document.getElementById('icon'); // アイコンのコンテナを取得
    document.body.classList.toggle('dark-mode');

    // アイコンを切り替える
    if (document.body.classList.contains('dark-mode')) {
        iconContainer.innerHTML = `<svg class="icon-moon" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg>`;
    } else {
        iconContainer.innerHTML = `<svg class="icon-sun" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg>`;
    }
}


// ---サイドバーのアクティブリンクを設定する関数---
export function setActiveLink(navLinks, activeClass = 'active', defaultHref = '#section1') {
    // 初期アクティブ設定
    const defaultLink = [...navLinks].find(link => link.getAttribute('href') === defaultHref);
    if (defaultLink) {
        defaultLink.classList.add(activeClass);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(nav => nav.classList.remove(activeClass));
            link.classList.add(activeClass);
        });
    });
}


// ---モーダルを「表示」状態にする関数---
export function openModal(modal) {
    modal.classList.add('show');
    modal.classList.remove('hidden');
}


// ---モーダルを「非表示」状態にする関数---
export function closeModal(modal) {
    modal.classList.remove('show');
    modal.classList.add('hidden');
}


// ---モーダルの外側をクリックした時にモーダルを閉じる処理---
export function setupModalCloseOnOutsideClick(modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}