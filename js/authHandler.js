document.addEventListener("DOMContentLoaded", async function () {
  const userDisplay = document.getElementById("userDisplay");
  const userEmail = localStorage.getItem("userEmail");

  if (userEmail && userDisplay) {
    const initials = userEmail.slice(0, 2).toUpperCase();
    userDisplay.textContent = initials;
    userDisplay.classList.add("user-icon");
  }

  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("Token no encontrado.");
    }

    const response = await fetch("http://localhost:3000/validateToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!result.valid) {
      alert("Token inválido. Por favor, inicie sesión nuevamente.");
      sessionStorage.removeItem("token");
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error("Error al validar el token:", error.message);
    alert("Su sesión ha expirado. Redirigiendo a login...");
    sessionStorage.removeItem("token");
    window.location.href = "login.html";
  }
});
