document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Verificación de que los campos no estén vacíos
            if (username === "" || password === "") {
                alert("Por favor, complete ambos campos.");
                return;
            }

            // Verificación de que el campo de correo tenga un formato válido
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(username)) {
                alert("Por favor, ingrese un correo electrónico válido.");
                return;
            }

            // Simulación de autenticación exitosa (autenticación ficticia)
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("userEmail", username); // Guardar el email como userEmail

            // Redirigir a la página principal (index.html)
            window.location.href = "index.html";
        });
    }

    /* Funcionalidad para mostrar ícono del ojito dependiendo si se están mostrando u ocultando la contraseña */
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function(event) {
            const passwordField = document.getElementById('password');
            const icon = event.target;

            // Alternar el tipo de input entre password y text
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye'); // Cambiar a ojo abierto
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash'); // Cambiar a ojo cerrado
            }
        });
    }
});
