document.addEventListener("DOMContentLoaded", function() {
    if (!sessionStorage.getItem("loggedIn")) {
        // Si el usuario no ha iniciado sesión, lo redirigimos a login.html
        window.location.href = "login.html";
    }
});
