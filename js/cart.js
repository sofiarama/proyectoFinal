
document.addEventListener("DOMContentLoaded", function(){
    //Verificar si ya hay un cart o agarro el vacio
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const contenedor = document.getElementById('cart-items');
    contenedor.innerHTML = ''; // Vaciar el contenedor

    if (cart == []) { 
        contenedor.innerHTML = '<span class="m-2"> No hay productos en el carrito </span>';
    } else  {
    // Mostrar los elementos del carrito
    cart.forEach((product, index) => {
        const productItem = `
        <h4>Articulo: ${index +1}</h4>
        <div class="contenedorItem row">
            <div class="imagen col-12- col-lg-4">
                <img src="${product.image}" alt="${product.name}" class="img-fluid">
            </div>
            <div class="descripcion col-12 col-lg-4">
                <h5>${product.name}</h5>
                <label for="quantity-${index}" class="cantidad">Cantidad:</label>
                <input type="number" id="quantity-${index}" class="form-control cant" value="${product.quantity}" min="1" oninput="updateSubtotal(this, ${product.cost}, ${index})">
            </div>
            <div class="precio col-12 col-lg-4">
                <div class="importe">
                    <p>${product.currency} ${product.cost.toFixed(2)}</p>
                </div>
                <div class="subtotal">
                    <p">Subtotal: <span id="total-${index}">${cart[index].currency} ${(product.cost * product.quantity).toFixed(2)}</span></p>
                </div>
            </div>
        </div>
                `
        contenedor.innerHTML += productItem;
        });
        }
    });
    
function updateSubtotal(quantityInput, cost, index) {
    const quantity = parseInt(quantityInput.value);
    //actualizo la cantidad
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    //nuevo subtotal
    const subtotal = quantity * cost;
    const subtotalElement = document.getElementById(`total-${index}`);
    if (subtotalElement) {
        subtotalElement.innerText = `${cart[index].currency} ${subtotal.toFixed(2)}`;
    }
}