document.addEventListener("DOMContentLoaded", async () => {
  // Obtener el token y mostrar en consola para debugging
  const token = sessionStorage.getItem("token");
  console.log("Token obtenido del sessionStorage:", token);

  if (!token) {
    alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
    window.location.href = "login.html";
    return;
  }

  // Mostrar las iniciales del usuario si está logueado
  const userEmail = sessionStorage.getItem("userEmail");
  if (userEmail) {
    const userDisplay = document.getElementById("userDisplay");
    userDisplay.textContent = userEmail.charAt(0).toUpperCase();
  }

  // Asignar eventos para redirigir a `products.html` según la categoría
  document.getElementById("autos").addEventListener("click", () => {
    localStorage.setItem("selectedCategory", "autos");
    window.location.href = "products.html";
  });

  document.getElementById("juguetes").addEventListener("click", () => {
    localStorage.setItem("selectedCategory", "juguetes");
    window.location.href = "products.html";
  });

  document.getElementById("muebles").addEventListener("click", () => {
    localStorage.setItem("selectedCategory", "muebles");
    window.location.href = "products.html";
  });
});
