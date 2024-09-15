document.addEventListener("DOMContentLoaded", function() {
    // Verificar si el usuario ha iniciado sesión usando sessionStorage
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

    // Recuperar el nombre del usuario desde el localStorage para mostrar iniciales
    const userName = localStorage.getItem("userName");

    if (userName) {
        // Obtener las primeras dos letras del nombre del usuario
        let userInitials = userName.trim().split(' ').map((word) => word.charAt(0)).join('');

        // Si solo hay una letra (un nombre de una sola palabra), toma las primeras dos letras
        if (userInitials.length === 1) {
            userInitials = userName.substring(0, 2).toUpperCase();
        } else {
            // Limitar a las primeras dos letras
            userInitials = userInitials.substring(0, 2).toUpperCase();
        }

        // Insertar las iniciales en el avatar en todas las páginas
        const avatarElement = document.getElementById("userAvatar");
        if (avatarElement) {
            avatarElement.innerText = userInitials;
        }
    }
});



