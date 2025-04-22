document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-button');
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.close-button');
    const submitButton = document.querySelector('.modal-button-submit');
    const resetButton = document.querySelector('.modal-button-reset');
    const cardList = document.getElementById('card-list');

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
            data.forEach(cardData => {
                createCard(cardData); // 各データでカードを作成
            });
        })
        .catch(error => console.error('JSONの読み込みに失敗しました:', error));

    // カードを作成する関数
    function createCard(cardData) {
        const { company, name, zipcode, address, department, phone, position, email, remarks } = cardData;

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