document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");
    const emptyCartMessage = document.getElementById("empty-cart-message");

    // Recuperar producto del localStorage
    const product = JSON.parse(localStorage.getItem("product"));

    if (product) {
        // Si hay producto en localStorage, muestra sus detalles
        productContainer.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.name}" style="width:100px;">
                <h3>${product.name}</h3>
                <p>Costo: ${product.cost} ${product.currency}</p>
                <label>Cantidad: </label>
                <input type="number" id="quantity" value="${product.quantity}" min="1">
                <p>Subtotal: <span id="subtotal">${product.cost * product.quantity}</span> ${product.currency}</p>
            </div>
        `;

        // Actualizar subtotal al cambiar la cantidad
        document.getElementById("quantity").addEventListener("input", (e) => {
            const newQuantity = e.target.value;
            const newSubtotal = product.cost * newQuantity;
            document.getElementById("subtotal").textContent = newSubtotal;
        });
    } else {
        // Si no hay producto, muestra el mensaje de carrito vacío
        emptyCartMessage.style.display = "block";
    }
});
