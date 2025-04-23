//モジュール化したJavaScriptコード

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

export function displayCards(cards, cardList, onCardClick) {
    cardList.innerHTML = '';

    if (cards.length === 0) {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = '該当するカードがありません。';
        noResultMessage.classList.add('no-result-message');
        cardList.appendChild(noResultMessage);
        return;
    }

    cards.forEach(cardData => {
        const card = createCardElement(cardData, onCardClick);
        cardList.appendChild(card);
    });
}

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