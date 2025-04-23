document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-button');
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.close-button');
    const submitButton = document.querySelector('.modal-button-submit');
    const resetButton = document.querySelector('.modal-button-reset');
    const cardList = document.getElementById('card-list');
    const favoriteLink = document.querySelector('.nav-link[href="#section2"]');
    const homeLink = document.querySelector('.nav-link[href="#section1"]');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    let allCardsData = [];

    addButton.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hidden');
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.classList.add('hidden');
    });

    resetButton.addEventListener('click', () => {
        document.querySelectorAll('.modal-content input').forEach(input => {
            input.value = '';
        });
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

        const card = createCardElement(cardData);
        cardList.appendChild(card);

        modal.classList.remove('show');
        modal.classList.add('hidden');
        resetButton.click();
    });

    fetch('../JSON/data.json')
        .then(response => response.json())
        .then(data => {
            allCardsData = data;
            displayCards(allCardsData);
        })
        .catch(error => console.error('JSONの読み込みに失敗しました:', error));

    favoriteLink.addEventListener('click', () => {
        const favoriteCards = allCardsData.filter(card => card.favorite);
        displayCards(favoriteCards);
    });

    homeLink.addEventListener('click', () => {
        displayCards(allCardsData);
    });

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        const filteredCards = allCardsData.filter(card =>
            card.name.toLowerCase().includes(query) ||
            card.company.toLowerCase().includes(query) ||
            card.department.toLowerCase().includes(query) ||
            card.remarks.toLowerCase().includes(query)
        );
        displayCards(filteredCards);
    });

    function displayCards(cards) {
        cardList.innerHTML = '';

        if (cards.length === 0) {
            const noResultMessage = document.createElement('p');
            noResultMessage.textContent = '該当するカードがありません。';
            noResultMessage.classList.add('no-result-message');
            cardList.appendChild(noResultMessage);
            return;
        }

        cards.forEach(cardData => {
            const card = createCardElement(cardData);
            cardList.appendChild(card);
        });
    }

    function createCardElement(cardData) {
        const { company, name } = cardData;

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${name}</h3>
            <p>${company}</p>
        `;
        card.dataset.details = generateCardDetailsHTML(cardData);

        card.addEventListener('click', () => {
            showDetailModal(cardData, card);
        });

        return card;
    }

    function generateCardDetailsHTML(data) {
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

    function showDetailModal(cardData, cardElement) {
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
});
