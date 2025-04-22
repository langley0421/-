document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input'); // 検索バーの入力フィールド
    const searchButton = document.querySelector('.search-button'); // 検索ボタン
    const cardList = document.getElementById('card-list'); // カードリスト
    let allCardsData = []; // 全てのカードデータを保持

    // JSONデータを読み込む
    fetch('../JSON/data.json') // JSONファイルのパスを指定
        .then(response => response.json())
        .then(data => {
            allCardsData = data; // データを保存
            displayCards(allCardsData); // 全てのカードを表示
        })
        .catch(error => console.error('JSONの読み込みに失敗しました:', error));

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
            <p>${department}</p>
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
                    <button class="close-button">閉じる</button>
                </div>
            `;
            document.body.appendChild(detailModal);

            // 詳細モーダルを閉じる
            detailModal.querySelector('.close-button').addEventListener('click', () => {
                document.body.removeChild(detailModal);
            });
        });

        // カードをリストに追加
        cardList.appendChild(card);
    }
});