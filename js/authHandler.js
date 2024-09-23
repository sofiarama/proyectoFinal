document.addEventListener("DOMContentLoaded", function() { 
    // Verificar si el usuario ha iniciado sesión
    if (!sessionStorage.getItem("loggedIn")) {
        // Si el usuario no ha iniciado sesión, redirigir a login.html
        window.location.href = "login.html";
        return; // Terminar la ejecución del resto del código
    }

    // Si el usuario ha iniciado sesión, mostramos las iniciales en el círculo
    const userDisplay = document.getElementById('userDisplay');
    const userEmail = sessionStorage.getItem('userEmail');

    if (userEmail && userDisplay) {
        // Obtener las dos primeras iniciales del email en mayúsculas
        const initials = userEmail.slice(0, 2).toUpperCase();
        userDisplay.textContent = initials;

        // Añadir la clase CSS para que el texto se muestre en un círculo
        userDisplay.classList.add('user-icon');
    }
});


