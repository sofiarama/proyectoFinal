document.addEventListener('DOMContentLoaded', function () {
  // Asignar eventos de clic a las tarjetas
  document.getElementById('autos').addEventListener('click', function() {
    localStorage.setItem("catID", 101);
    window.location.href = 'products.html?categoria=autos'; // Redirige a 'products.html' con la categoría 'autos'
  });

  document.getElementById('juguetes').addEventListener('click', function() {
    localStorage.setItem("catID", 102);
    window.location.href = 'products.html?categoria=juguetes'; // Redirige a 'products.html' con la categoría 'juguetes'
  });

  document.getElementById('muebles').addEventListener('click', function() {
    localStorage.setItem("catID", 103);
    window.location.href = 'products.html?categoria=muebles'; // Redirige a 'products.html' con la categoría 'muebles'
  });

  const pictureId = localStorage.getItem('profilePic');
  if (pictureId) {
    document.getElementById("pictureID").src = pictureId;
  }

  // Simulación de login para obtener el correo del usuario
  const userEmail = localStorage.getItem('userEmail') || 'ejemplo@correo.com'; // Usar sessionStorage o un correo por defecto

  // Mostrar las iniciales en el ícono del usuario
  const userDisplay = document.getElementById('userDisplay');
  userDisplay.textContent = userEmail[0] + userEmail[1]; // Mostrar las dos primeras letras del correo

  // Mostrar el correo completo dentro del dropdown
  const userEmailElement = document.getElementById('userEmail');
  userEmailElement.textContent = userEmail;

  const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    });
});

