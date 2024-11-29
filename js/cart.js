document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const contenedor = document.getElementById("cart-items");
  const cartBadge = document.getElementById("cart-badge");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const alertResult = document.getElementById("alertResult");
  const resultSpan = document.getElementById("resultSpan");
  const conversionRate = 40;

  function renderCartItems() {
    contenedor.innerHTML = ""; // Limpiar el contenedor
    if (cart.length === 0) {
      contenedor.innerHTML = `
        <div class="text-center mt-4">
          <h4>¡Tu carrito está vacío!</h4>
          <button class="btn btn-primary mt-3" onclick="history.back()">Volver</button>
        </div>
      `;
    } else {
      cart.forEach((product, index) => {
        const convertedCost =
          product.currency === "USD"
            ? product.cost * conversionRate
            : product.cost;
        const displayCurrency =
          product.currency === "USD" ? "UYU" : product.currency;

        const productItem = `
          <h4 class="mt-3">Artículo ${index + 1}</h4>
          <div class="contenedorItem row align-items-center border-bottom py-3">
            <div class="imagen col-4 col-md-3 col-lg-2 mb-2 mb-md-0">
              <img src="${product.image}" alt="${
          product.name
        }" class="img-fluid rounded">
            </div>
            <div class="descripcion col-8 col-md-5 col-lg-6 mb-2 mb-md-0">
              <h5 class="fw-bold">${product.name}</h5>
              <div class="d-flex align-items-center">
                <label for="quantity-${index}" class="cantidad me-2 mb-0">Cantidad:</label>
                <input type="number" id="quantity-${index}" class="form-control w-50 cant" value="${
          product.quantity
        }" min="1" oninput="updateQuantity(${index}, this.value)">
              </div>
            </div>
            <div class="precio col-12 col-md-4 col-lg-4 mt-2 mt-md-0 text-md-end">
              <p><strong>Precio Unitario:</strong> ${displayCurrency} ${convertedCost.toFixed(
          2
        )}</p>
              <p><strong>Subtotal:</strong> ${displayCurrency} ${(
          convertedCost * product.quantity
        ).toFixed(2)}</p>
              <button class="btn btn-sm btn-danger" onclick="removeItem(${index})"><i class="fas fa-trash-alt"></i> Eliminar</button>
            </div>
          </div>
        `;
        contenedor.innerHTML += productItem;
      });
    }
    calculateCosts();
    updateCartBadge();
  }

  window.updateQuantity = function (index, quantity) {
    quantity = parseInt(quantity) || 1;
    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  };

  window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  };

  function calculateCosts() {
    let subtotal = 0;
    cart.forEach((item) => {
      const cost =
        item.currency === "USD" ? item.cost * conversionRate : item.cost;
      subtotal += cost * item.quantity;
    });

    const selectedShipping = document.querySelector(
      'input[name="shippingType"]:checked'
    );
    const shippingCost =
      subtotal *
      (selectedShipping ? parseFloat(selectedShipping.value) / 100 : 0);
    const totalCost = subtotal + shippingCost;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("shippingCost").textContent =
      shippingCost.toFixed(2);
    document.getElementById("totalCost").textContent = totalCost.toFixed(2);
  }

  document.querySelectorAll('input[name="shippingType"]').forEach((input) => {
    input.addEventListener("change", calculateCosts);
  });

  checkoutBtn.addEventListener("click", function () {
    const department = document.getElementById("department").value.trim();
    const locality = document.getElementById("locality").value.trim();
    const street = document.getElementById("street").value.trim();
    const number = document.getElementById("number").value.trim();
    const corner = document.getElementById("corner").value.trim();

    if (!department || !locality || !street || !number || !corner) {
      resultSpan.textContent =
        "Por favor, completa todos los campos requeridos antes de finalizar la compra.";
      alertResult.classList.add("alert-danger", "show");
      setTimeout(() => alertResult.classList.remove("show"), 3000);
      return;
    }

    // Vaciar el carrito y mostrar mensaje de éxito
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();

    resultSpan.textContent = "¡Compra realizada con éxito!";
    alertResult.classList.remove("alert-danger");
    alertResult.classList.add("alert-success", "show");
    setTimeout(() => alertResult.classList.remove("show"), 3000);
  });

  function updateCartBadge() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = totalItems;
  }

  renderCartItems();
});
