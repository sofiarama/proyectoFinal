
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    
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
        sessionStorage.setItem("username", username); // Guardar el nombre de usuario

        // Redirigimos a la página principal
        window.location.href = "index.html";
    });
});
/* funcionalidad de ver o tapar password*/
document.getElementById('togglePassword').addEventListener('click', function () {
  const passwordField = document.getElementById('password');
  const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordField.setAttribute('type', type);

  // Cambiar el ícono del ojo
  this.classList.toggle('fa-eye-slash');
}); 
