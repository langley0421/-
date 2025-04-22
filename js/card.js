document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-button');
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.close-button');
    const submitButton = document.querySelector('.modal-button-submit');
    const resetButton = document.querySelector('.modal-button-reset');
    const cardList = document.getElementById('card-list');
    const favoriteLink = document.querySelector('.nav-link[href="#section2"]');
    const homeLink = document.querySelector('.nav-link[href="#section1"]');
    const searchInput = document.querySelector('.search-input'); // 検索バーの入力フィールド
    const searchButton = document.querySelector('.search-button'); // 検索ボタン
    let allCardsData = []; // 全てのカードデータを保持

    // モーダルを開く
    addButton.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hidden');
    });

    // モーダルを閉じる
    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.classList.add('hidden');
    });

    // フォームをリセット
    resetButton.addEventListener('click', () => {
        document.querySelectorAll('.modal-content input').forEach(input => {
            input.value = '';
        });
    });

    // 名刺を追加
    submitButton.addEventListener('click', () => {
        const company = document.querySelector('input[name="company"]').value;
        const name = document.querySelector('input[name="name"]').value;
        const zipcode = document.querySelector('input[name="zipcode"]').value;
        const address = document.querySelector('input[name="address"]').value;
        const department = document.querySelector('input[name="department"]').value;
        const phone = document.querySelector('input[name="phone"]').value;
        const position = document.querySelector('input[name="position"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const remarks = document.querySelector('input[name="remarks"]').value;

        if (!name) {
            alert('氏名は必須です。');
            return;
        }

        // 名刺カードを作成（簡易表示）
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${name}</h3>
            <p>${company}</p>
        `;

        // 詳細情報を保存
        card.dataset.details = `
            <h3>${name}</h3>
            <p>会社名: ${company}</p>
            <p>郵便番号: ${zipcode}</p>
            <p>住所: ${address}</p>
            <p>部署名: ${department}</p>
            <p>電話番号: ${phone}</p>
            <p>役職名: ${position}</p>
            <p>メールアドレス: ${email}</p>
            <p>備考: ${remarks}</p>
        `;

        // カードをクリックしたときに詳細を表示
        card.addEventListener('click', () => {
            const detailModal = document.createElement('div');
            detailModal.classList.add('modal', 'show');
            detailModal.innerHTML = `
                <div class="modal-contents">
                    ${card.dataset.details}
                    <button class="edit-button">編集</button>
                    <button class="delete-button">削除</button>
                    <button class="favorite-button">☆ お気に入り</button>
                    <button class="close-button">閉じる</button>
                </div>
            `;
            document.body.appendChild(detailModal);

            // 編集ボタンの動作
            detailModal.querySelector('.edit-button').addEventListener('click', () => {
                // 編集処理をここに追加
            });

            // 削除ボタンの動作
            detailModal.querySelector('.delete-button').addEventListener('click', () => {
                // 削除処理をここに追加
            });

            // お気に入りボタンの動作
            const favoriteButton = detailModal.querySelector('.favorite-button');
            favoriteButton.addEventListener('click', () => {
                cardData.favorite = !cardData.favorite;
                favoriteButton.textContent = cardData.favorite ? '★ お気に入り' : '☆ お気に入り';
                // お気に入り状態を更新する処理をここに追加
            });

            // 詳細モーダルを閉じる
            detailModal.querySelector('.close-button').addEventListener('click', () => {
                document.body.removeChild(detailModal);
            });
        });

        // カードをリストに追加
        cardList.appendChild(card);

        // モーダルを閉じる
        modal.classList.remove('show');
        modal.classList.add('hidden');

        // フォームをリセット
        resetButton.click();
    });

    // JSONデータを読み込む
    fetch('../JSON/data.json') // JSONファイルのパスを指定
        .then(response => response.json())
        .then(data => {
            allCardsData = data; // データを保存
            displayCards(allCardsData); // 全てのカードを表示
        })
        .catch(error => console.error('JSONの読み込みに失敗しました:', error));

    // お気に入りリンクをクリックしたとき
    favoriteLink.addEventListener('click', () => {
        const favoriteCards = allCardsData.filter(card => card.favorite); // favoriteがtrueのものを取得
        displayCards(favoriteCards); // お気に入りカードを表示
    });

    // ホームリンクをクリックしたとき
    homeLink.addEventListener('click', () => {
        displayCards(allCardsData); // 全てのカードを表示
    });

    // 検索ボタンをクリックしたとき
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase(); // 検索クエリを取得し小文字に変換
        const filteredCards = allCardsData.filter(card => {
            // 検索条件: 名前、会社名、部署名、備考にクエリが含まれるか
            return (
                card.name.toLowerCase().includes(query) ||
                card.company.toLowerCase().includes(query) ||
                card.department.toLowerCase().includes(query) ||
                card.remarks.toLowerCase().includes(query)
            );
        });
        displayCards(filteredCards); // フィルタリングされたカードを表示
    });

    // カードを表示する関数
    function displayCards(cards) {
        cardList.innerHTML = ''; // 現在のカードをクリア

        if (cards.length === 0) {
            // 検索結果が空の場合のメッセージを表示
            const noResultMessage = document.createElement('p');
            noResultMessage.textContent = '該当するカードがありません。';
            noResultMessage.classList.add('no-result-message'); // 必要に応じてスタイルを追加
            cardList.appendChild(noResultMessage);
            return;
        }

        cards.forEach(cardData => {
            createCard(cardData); // 各カードを作成
        });
    }

    // カードを作成する関数
    function createCard(cardData) {
        const { company, name, zipcode, address, department, phone, position, email, remarks, favorite } = cardData;

        // 名刺カードを作成（簡易表示）
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${name}</h3>
            <p>${company}</p>
        `;

        // 詳細情報を保存
        card.dataset.details = `
            <h3>${name}</h3>
            <p>会社名: ${company}</p>
            <p>郵便番号: ${zipcode}</p>
            <p>住所: ${address}</p>
            <p>部署名: ${department}</p>
            <p>電話番号: ${phone}</p>
            <p>役職名: ${position}</p>
            <p>メールアドレス: ${email}</p>
            <p>備考: ${remarks}</p>
        `;

        // カードをクリックしたときに詳細を表示
        card.addEventListener('click', () => {
            const detailModal = document.createElement('div');
            detailModal.classList.add('modal', 'show');
            detailModal.innerHTML = `
                <div class="modal-contents">
                    ${card.dataset.details}
                    <button class="edit-button">編集</button>
                    <button class="delete-button">削除</button>
                    <button class="favorite-button">${favorite ? '★ お気に入り' : '☆ お気に入り'}</button>
                    <button class="close-button">閉じる</button>
                </div>
            `;
            document.body.appendChild(detailModal);

            // 編集ボタンの動作
            detailModal.querySelector('.edit-button').addEventListener('click', () => {
                // 編集処理をここに追加
            });

            // 削除ボタンの動作
            detailModal.querySelector('.delete-button').addEventListener('click', () => {
                // 削除処理をここに追加
            });

            // お気に入りボタンの動作
            const favoriteButton = detailModal.querySelector('.favorite-button');
            favoriteButton.addEventListener('click', () => {
                cardData.favorite = !cardData.favorite;
                favoriteButton.textContent = cardData.favorite ? '★ お気に入り' : '☆ お気に入り';
                // お気に入り状態を更新する処理をここに追加
            });

            // 詳細モーダルを閉じる
            detailModal.querySelector('.close-button').addEventListener('click', () => {
                document.body.removeChild(detailModal);
            });
        });

        // カードをリストに追加
        cardList.appendChild(card);
    }
});