
document.addEventListener("DOMContentLoaded", function(){
    //Verificar si ya hay un cart o agarro el vacio
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const contenedor = document.getElementById('cart-items');
    contenedor.innerHTML = ''; // Vaciar el contenedor

    if (cart.length == 0) { 
        contenedor.innerHTML = '<p> No hay productos en el carrito </p>';
    } else  {
    // Mostrar los elementos del carrito
    cart.forEach(producto => {
        const productItem = `
        <div class="contenedor de item flex">
            <div class="imagen">
            <img src= ${product.image}" alt="${product.name}" class="img-fluid">
            </div>

            <div class="nombre y cantidad">
            <h5>${product.name}</h5>
                    <label for="quantity">Cantidad:</label>
                    <input type="number" class="form-control" value="${product.quantity}" min="1" onchange="updateSubtotal(this, ${producto.cost})">
            </div>

            <div class="total">
                <div class="moneda y precio">
                <p>${product.currency} ${product.cost.toFixed(2)}</p>
                </div>

                <div class="subtotal">
                <p>Subtotal: <span class="subtotal-value">${(product.cost * product.quantity).toFixed(2)}</span></p>
                </div>
            </div>
        </div>
        `
        contenedor.innerHTML += productItem;
    });
}
})

// Subtotal cantidad
function updateSubtotal(quantityInput, cost) {
    const quantity = quantityInput.value;
    const subtotalElement = quantityInput.closest('.item').querySelector('.subtotal-value');
    subtotalElement.innerText = (cost * quantity).toFixed(2);
}