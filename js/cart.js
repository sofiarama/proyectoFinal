document.addEventListener("DOMContentLoaded", function () {
    // Verificar si ya hay un cart o crear uno vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const contenedor = document.getElementById('cart-items');
    const cartBadge = document.getElementById("cart-badge");

    // Verificar si el contenedor existe
    if (!contenedor) {
        console.error("El contenedor con el id 'cart-items' no se encontró en el DOM.");
        return;
    }


    // Función para mostrar productos del carrito
    function renderCartItems() {
        contenedor.innerHTML = ''; // Limpiar el contenedor
        if (cart.length === 0) {
            contenedor.innerHTML = '<span class="m-2"> No hay productos en el carrito </span>';
        } else {
            cart.forEach((product, index) => {
                const productItem = `
                    <h4 class="mt-3">Artículo ${index + 1}</h4>
                    <div class="contenedorItem row align-items-center border-bottom py-3">
                        <div class="imagen col-4 col-md-3 col-lg-2 mb-2 mb-md-0">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
                        </div>
                        <div class="descripcion col-8 col-md-5 col-lg-6 mb-2 mb-md-0">
                            <h5 class="fw-bold">${product.name}</h5>
                            <div class="d-flex align-items-center">
                                <label for="quantity-${index}" class="cantidad me-2 mb-0">Cantidad:</label>
                                <input type="number" id="quantity-${index}" class="form-control w-50 cant" value="${product.quantity}" min="1" oninput="updateQuantity(${index}, this.value)">
                            </div>

                        </div>
                        <div class="precio col-12 col-md-4 col-lg-4 mt-2 mt-md-0 text-md-end">
                            <div class="importe">
                                <p class="fw-bold mb-1">${product.currency} ${product.cost.toFixed(2)}</p>
                            </div>
                            <div class="subtotal">
                                <p>Subtotal: <span id="total-${index}">${product.currency} ${(product.cost * product.quantity).toFixed(2)}</span></p>
                                <button class="btn btn-sm mt-2" onclick="removeItem(${index})"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>

                `;
                contenedor.innerHTML += productItem;
            });
        }
        calculateCosts(); // Recalcular costos al renderizar elementos

    }

    // Función para actualizar la cantidad de un producto
    window.updateQuantity = function (index, quantity) {
        quantity = parseInt(quantity) || 1;
        cart[index].quantity = quantity;
        
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems(); // Volver a renderizar los elementos
        updateCartBadge(); // Actualizar badge
    }

    // Función para eliminar un producto
    window.removeItem = function (index) {
    
    cart.splice(index, 1);  // Eliminar el producto del carrito
    localStorage.setItem('cart', JSON.stringify(cart));   // Guardar los cambios en localStorage
    // Actualizar 
    renderCartItems();
    updateCartBadge();
};

    // Función para calcular costos
    function calculateCosts() {
        const subtotal = cart.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
        const selectedShipping = document.querySelector('input[name="shippingType"]:checked');
        const shippingPercentage = selectedShipping ? parseFloat(selectedShipping.value) / 100 : 0;
        const shippingCost = subtotal * shippingPercentage;
        const totalCost = subtotal + shippingCost;

        // Actualizar costos en el DOM
        const subtotalElem = document.getElementById('subtotal');
        const shippingCostElem = document.getElementById('shippingCost');
        const totalCostElem = document.getElementById('totalCost');

        if (subtotalElem && shippingCostElem && totalCostElem) {
            subtotalElem.textContent = subtotal.toFixed(2) ;
            shippingCostElem.textContent = shippingCost.toFixed(2);
            totalCostElem.textContent = totalCost.toFixed(2);
        }
    }

    // Función para actualizar el badge de cantidad en el carrito
    function updateCartBadge() {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartBadge) {
            cartBadge.textContent = totalQuantity;
        }
    }

    // Escuchar cambios en el tipo de envío
    const shippingInputs = document.querySelectorAll('input[name="shippingType"]');
    shippingInputs.forEach(input => {
        input.addEventListener('change', calculateCosts);
    });
  
   // Escuchar el evento de clic para el botón "Finalizar Compra"
   const checkoutBtn = document.getElementById('checkoutBtn');
   if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function (event) {
        // Prevenir la acción predeterminada si hay campos vacíos
        event.preventDefault();

        // Obtener los campos de dirección de envío
        const department = document.getElementById('department');
        const locality = document.getElementById('locality');
        const street = document.getElementById('street');
        const number = document.getElementById('number');
        const corner = document.getElementById('corner');

        // Validar si los campos están vacíos
        if (
            !department.value.trim() ||
            !locality.value.trim() ||
            !street.value.trim() ||
            !number.value.trim() ||
            !corner.value.trim()
        ) {
            alert('Por favor, completa todos los campos requeridos antes de finalizar la compra.');
            return;
        }

        // Si todos los campos están completos, muestra el mensaje de confirmación
        alert ('Gracias por tu compra!'); // Mensaje de confirmación
        localStorage.removeItem('cart'); // Vaciar el carrito
        window.location.href = 'index.html'; // Redirigir a la página de inicio o donde desees
    });
   }

    // Inicializar
    updateCartBadge();
    renderCartItems();
});


