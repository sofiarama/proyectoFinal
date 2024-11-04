document.addEventListener("DOMContentLoaded", function(){
    // Verificar si ya hay un cart o crear uno vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const contenedor = document.getElementById('cart-items');
    const cartBadge = document.getElementById("cart-badge");

    // Función para actualizar el badge con la cantidad de productos en el carrito
    function updateCartBadge() {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = totalQuantity;
    }

    // Mostrar el mensaje si el carrito está vacío
    if (cart.length === 0) {
        contenedor.innerHTML = '<span class="m-2"> No hay productos en el carrito </span>';
    } else {
        // Mostrar los elementos del carrito
        cart.forEach((product, index) => {
            const productItem = `
                <h4>Articulo: ${index + 1}</h4>
                <div class="contenedorItem row">
                    <div class="imagen col">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    </div>
                    <div class="descripcion col">
                        <h5>${product.name}</h5>
                        <label for="quantity-${index}" class="cantidad">Cantidad:</label>
                        <input type="number" id="quantity-${index}" class="form-control cant" value="${product.quantity}" min="1" oninput="updateSubtotal(this, ${product.cost}, ${index})">
                    </div>
                    <div class="precio col">
                        <div class="importe">
                            <p>${product.currency} ${product.cost.toFixed(2)}</p>
                        </div>
                        <div class="subtotal">
                            <p>Subtotal: <span id="total-${index}">${product.currency} ${(product.cost * product.quantity).toFixed(2)}</span></p>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += productItem;
        });
    }

    // Inicializar el badge de cantidad
    updateCartBadge();
});

// Función para actualizar el subtotal
function updateSubtotal(quantityInput, cost, index) {
    const quantity = parseInt(quantityInput.value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Actualizar cantidad en el carrito y en el localStorage
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));

    // Calcular y mostrar el nuevo subtotal
    const subtotal = quantity * cost;
    const subtotalElement = document.getElementById(`total-${index}`);
    if (subtotalElement) {
        subtotalElement.innerText = `${cart[index].currency} ${subtotal.toFixed(2)}`;
    }

    // Actualizar el badge del carrito
    updateCartBadge();
}

// Función para actualizar el badge de cantidad en el carrito
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.getElementById("cart-badge");
    cartBadge.textContent = totalQuantity;
}
