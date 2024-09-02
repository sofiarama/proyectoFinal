document.addEventListener("DOMContentLoaded", function() {
    // Verificar si el usuario ha iniciado sesión
    if (!sessionStorage.getItem("loggedIn")) {
        // Si el usuario no ha iniciado sesión, lo redirigimos a login.html
        window.location.href = "login.html";
        return; // Terminar la ejecución del resto del código
    }

    // Si el usuario ha iniciado sesión, mostramos un saludo personalizado
    const userDisplay = document.getElementById('userDisplay');
    const username = sessionStorage.getItem('username');
    if (username && userDisplay) {
        userDisplay.textContent = `${username}`;
    }
});
