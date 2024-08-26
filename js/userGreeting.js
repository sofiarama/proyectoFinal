document.addEventListener("DOMContentLoaded", function () {
    const userDisplay = document.getElementById('userDisplay');
    const username = sessionStorage.getItem('username');
    if (username && userDisplay) {
        userDisplay.textContent = `Hola, ${username}`;
    }
});
