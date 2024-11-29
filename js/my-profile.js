document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("profileForm");
  const darkModeSwitch = document.getElementById("darkModeSwitch");
  const logoutButton = document.getElementById("logout");
  const profilePicInput = document.getElementById("profilePicInput");
  const profilePic = document.getElementById("profilePic");

  //Cargar datos del perfil
  loadProfileData();

  //enviamos el formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (form.checkValidity()) {
      saveProfileData();
      alert("Perfil actualizado con éxito!");
    } else {
      form.reportValidity();
    }
  });

  // Manejo de cambio de modo oscuro
  darkModeSwitch.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", darkModeSwitch.checked);
  });

  // Manejar cierre de sesión
  logoutButton.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
  });

  // Manejar cambio de foto de perfil
  profilePicInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        profilePic.src = event.target.result;
        localStorage.setItem("profilePic", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  const userEmail = localStorage.getItem("userEmail") || "ejemplo@correo.com"; // Usar sessionStorage o un correo por defecto
  // Mostrar las iniciales en el ícono del usuario
  const userDisplay = document.getElementById("userDisplay");
  userDisplay.textContent =
    userEmail[0].toUpperCase() + userEmail[1].toUpperCase(); // Mostrar las dos primeras letras del correo
});

// Funciones auxiliares
function loadProfileData() {
  const profileData = JSON.parse(localStorage.getItem("profileData")) || {};
  for (const [key, value] of Object.entries(profileData)) {
    if (document.getElementById(key)) {
      document.getElementById(key).value = value;
    }
  }
  document.getElementById("userEmail").innerText =
    localStorage.getItem("userEmail") || "Usuario";
  document.getElementById("email").value =
    localStorage.getItem("userEmail") || "";
  darkModeSwitch.checked = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark-mode", darkModeSwitch.checked);
  profilePic.src =
    localStorage.getItem("profilePic") || "https://via.placeholder.com/150";
  const dropPic = document.getElementById("pictureID");
  dropPic.src =
    localStorage.getItem("profilePic") || "https://via.placeholder.com/50";
}

function saveProfileData() {
  const profileData = {
    nombre: document.getElementById("nombre").value,
    segundoNombre: document.getElementById("segundoNombre").value,
    apellido: document.getElementById("apellido").value,
    segundoApellido: document.getElementById("segundoApellido").value,
    telefono: document.getElementById("telefono").value,
  };
  localStorage.setItem("profileData", JSON.stringify(profileData));
  localStorage.setItem("userEmail", document.getElementById("email").value);
}
