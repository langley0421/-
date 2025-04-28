document.getElementById("registerForm").addEventListener('submit', function(event) {
    event.preventDefault();
    register();
});
    
function register() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("confirmPassword").value;

    if(password !== passwordConfirm) {
        alert("パスワードが一致しません。");
        return;
    }

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    
    if(userData[email]){
        alert("このメールアドレスは既に登録されています。");
        return;
    }

    userData[email] = { password };
    
    // ローカルストレージにデータを保存
    try {
        localStorage.setItem("userData", JSON.stringify(userData));
        alert("登録が完了しました。");
        window.location.href = "login.html"; // ログイン成功後、index.htmlにリダイレクト
    } catch (error) {
        console.error("ローカルストレージへの保存に失敗しました:", error);
        alert("データの保存に失敗しました。");
    }
    
}