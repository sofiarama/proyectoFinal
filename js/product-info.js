document.addEventListener("DOMContentLoaded", function () {
    let productData;
    const productID = localStorage.getItem('productId');
    const pictureId = localStorage.getItem('profilePic');

    // Mostrar imagen de perfil si existe
    if (pictureId) {
        const pictureElement = document.getElementById("pictureID");
        if (pictureElement) pictureElement.src = pictureId;
    }

    if (productID) {
        const url = PRODUCT_INFO_URL + productID + EXT_TYPE;

        fetch(url)
            .then(response => response.json())
            .then(product => {
                productData = product;
                if (product) {
                    const productContainer = document.getElementById("contenedor");
                    productContainer.innerHTML = `
                        <div class="car row">
                            <div class="image-gallery col-sm-12">
                                <div class="thumbnail-images d-flex justify-content-around mb-3">
                                    <img src="${product.images[1]}" alt="small image" class="thumbnail img-fluid">
                                    <img src="${product.images[2]}" alt="small image" class="thumbnail img-fluid">
                                    <img src="${product.images[3]}" alt="small image" class="thumbnail img-fluid">
                                </div>
                                <div class="main-image">
                                    <img src="${product.images[0]}" alt="Main image" id="main-display" class="img-fluid">
                                </div>
                            </div>
                            <div class="descripcion col-md-6 col-sm-12">
                                <h4 class="title">${product.name}</h4>
                                <hr class="linea2">
                                <p class="description">${product.description}</p>
                                <p class="soldCount">Vendidos: ${product.soldCount}</p>
                                <h6 class="category">${product.category}</h6>
                                <p class="price">Precio: ${product.currency} ${product.cost}</p>
                                <div class="d-flex align-items-center">
                                    <input type="number" id="cantidad" class="form-control w-25 me-2" value="1" min="1">
                                    <button id="buyButton" class="btn btn-primary">Comprar</button>
                                </div>
                            </div>
                        </div>
                    `;

                    // Funcionalidad del botón "Comprar"
                    document.getElementById("buyButton").addEventListener("click", function() {
                        // Recuperar o crear el carrito en localStorage
                        let cart = JSON.parse(localStorage.getItem("cart")) || [];
                        let cantidad = parseInt(document.getElementById("cantidad").value);
                        let subtotal = productData.cost * cantidad;

                        // Objeto con información del producto seleccionado
                        let productInfo = {
                            id: productData.id,
                            name: productData.name,
                            cost: productData.cost,
                            currency: productData.currency,
                            quantity: cantidad,
                            image: productData.images[0],
                            subtotal: subtotal
                        };

                        // Buscar si el producto ya está en el carrito
                        const index = cart.findIndex(item => item.id === productData.id);
                        if (index !== -1) {
                            // Actualizar cantidad y subtotal si ya está en el carrito
                            cart[index].quantity += cantidad;
                            cart[index].subtotal = cart[index].quantity * cart[index].cost;
                        } else {
                            // Agregar nuevo producto al carrito
                            cart.push(productInfo);
                        }

                        // Guardar el carrito actualizado en localStorage y redirigir al carrito
                        localStorage.setItem("cart", JSON.stringify(cart));
                        window.location.href = "cart.html";
                    });

                    // Cambiar imagen principal al hacer clic en miniaturas
                    const fotoMain = document.getElementById('main-display');
                    const fotosSmall = document.getElementsByClassName('thumbnail');
                    Array.from(fotosSmall).forEach(foto => {
                        foto.addEventListener('click', function () {
                            [fotoMain.src, this.src] = [this.src, fotoMain.src];
                        });
                    });

                    cargarProductosRelacionados(product.category);
                } else {
                    console.log("No se encontró el producto");
                }
            })
            .catch(error => console.error("Error al cargar los detalles del producto:", error));
    } else {
        console.log("No se encontró el productID");
    }

    // Cargar comentarios
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${productID}.json`)
        .then(response => response.json())
        .then(comentarios => mostrarComentarios(comentarios))
        .catch(error => console.error("Error al cargar los comentarios:", error));

    // Configuración del botón de comentarios
    const btnMensaje = document.getElementById('btnCalif');
    btnMensaje?.addEventListener("click", function () { 
        const comentario = document.getElementById('comentario');
        if (comentario?.value) {
            const puntuacion = document.getElementById('puntuacion');
            const nombre = sessionStorage.getItem('userEmail');
            const fecha = new Date().toLocaleDateString();
            const time = new Date().toLocaleTimeString();
            const comentariosContainer = document.getElementById('comentarios-container');
            const comentarioHTML = `
                <div class="comentario">
                    <p class="nombreUser">${nombre.slice(0, nombre.length - 10)}</p>  (${fecha} ${time}):
                    <p>${comentario.value}</p>
                    <p><strong>Puntuación:</strong> ${estrellas(puntuacion.value)}</p>
                </div>
            `;
            comentariosContainer.innerHTML += comentarioHTML;
            comentario.value = "";
        }
    });

    // Configuración para el botón de logout
    const logoutButton = document.getElementById('logout');
    logoutButton?.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    });

    // Configuración del tema oscuro
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    if (darkModeSwitch) {
        darkModeSwitch.checked = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
        
        darkModeSwitch.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', darkModeSwitch.checked);
        });
    }
});

// Función para mostrar estrellas de puntuación
function estrellas(puntos) {
    return Array(5).fill().map((_, i) =>
        `<span class="fa fa-star${i < puntos ? ' checked' : ''}"></span>`
    ).join('');
}

// Función para mostrar comentarios
function mostrarComentarios(comentarios) {
    const comentariosContainer = document.getElementById('comentarios-container');
    comentariosContainer.innerHTML = comentarios.length
        ? comentarios.map(comentario => `
            <div class="comentario">
                <span class="comentUser">${comentario.user}</span>  (${comentario.dateTime}):
                <p>${comentario.description}</p>
                <p><strong>Puntuación:</strong> ${estrellas(comentario.score)}</p>
            </div>
        `).join('')
        : '<p>No hay comentarios para este producto.</p>';
}

// Función para cargar productos relacionados
function cargarProductosRelacionados(category) {
    const categoryId = obtenerCategoryId(category);

    fetch(`https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`)
        .then(response => response.json())
        .then(data => mostrarProductosRelacionados(data.products))
        .catch(error => console.error("Error al cargar productos relacionados:", error));
}

function mostrarProductosRelacionados(productos) {
    const contenedor = document.getElementById('listaProductosRelacionados');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'col-6 col-md-4 col-lg-3 mb-4';

        div.innerHTML = `
            <div class="card">
              <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
              <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">${producto.currency} ${producto.cost}</p>
              </div>
            </div>
        `;

        div.onclick = () => {
            localStorage.setItem('productId', producto.id);
            window.location.href = 'product-info.html';
        };

        contenedor.appendChild(div);
    });
}

function obtenerCategoryId(category) {
    const categoryMap = {
        "Autos": 101,
        "Juguetes": 102,
        "Muebles": 103,
    };
    return categoryMap[category] || 101;
}

