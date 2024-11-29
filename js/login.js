document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const registerFormContainer = document.getElementById("registerFormContainer");
  const loginFormContainer = document.getElementById("loginFormContainer");
  const showRegisterForm = document.getElementById("showRegisterForm");
  const showLoginForm = document.getElementById("showLoginForm");

  // Alternar entre formularios
  showRegisterForm.addEventListener("click", (e) => {
    e.preventDefault();
    loginFormContainer.style.display = "none";
    registerFormContainer.style.display = "block";
  });

  showLoginForm.addEventListener("click", (e) => {
    e.preventDefault();
    registerFormContainer.style.display = "none";
    loginFormContainer.style.display = "block";
  });

  // Manejo de inicio de sesión
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Por favor, complete ambos campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        alert(result.message);
        sessionStorage.setItem("token", result.token);
        localStorage.setItem("userEmail", email);
        window.location.href = "index.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con el inicio de sesión.");
    }
  });

  // Manejo de registro
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    if (!email || !password) {
      alert("Por favor, complete ambos campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.status === 201) {
        alert(result.message);
        registerFormContainer.style.display = "none";
        loginFormContainer.style.display = "block";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con el registro.");
    }
  });
});






