document.addEventListener("DOMContentLoaded", function () {
    const productID = localStorage.getItem('productId'); //recuperamos el valor asociado al productId, desde el almacenamiento del navegador

    if (productID) { //si productId tiene un valor se ejecuta el fetch
        const url = PRODUCT_INFO_URL + productID + EXT_TYPE; //creamos una url con la dire de info mas el id del producto elegido.

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const product = data;
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
                            </div>
                        </div>`;
                    // Cambiar la foto principal al hacer clic en las imágenes pequeñas
                    const fotoMain = document.getElementById('main-display');
                    const fotosSmall = document.getElementsByClassName('thumbnail');
                    for (let i = 0; i < fotosSmall.length; i++) {
                        fotosSmall[i].addEventListener('click', function () {
                            let auxFoto = fotoMain.src;
                            fotoMain.src = this.src; // Intercambia las fotos
                            this.src = auxFoto; // En la imagen pequeña pone la main
                        });
                    }
                    // Ahora cargar los productos relacionados
                    cargarProductosRelacionados(product.category);
                } else {
                    console.log("No se encontró el producto");
                }
            })
            .catch(error => {
                console.error("Error al cargar los detalles del producto:", error);
            });
    } else {
        console.log("No se encontró el productID");
    }

    //Sección Comentarios
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${productID}.json`)
        .then(response => response.json())
        .then(comentarios => {
            mostrarComentarios(comentarios);
        })
        .catch(error => {
            console.error("Error al cargar los comentarios:", error);
        });


    //agregar el comentario
    const btnMensaje = document.getElementById('btnCalif');
    btnMensaje.addEventListener("click", function () { 
        const comentario = document.getElementById('comentario');
        if (comentario.value !== "") {
            const puntuacion = document.getElementById('puntuacion');
            const nombre = sessionStorage.getItem('userEmail');
            let fecha = new Date().toLocaleDateString();
            let time = new Date().toLocaleTimeString();
            const comentariosContainer = document.getElementById('comentarios-container');
            const comentarioHTML = `
                    <div class="comentario">
                        <strong>${nombre.slice(0, nombre.length - 10)}</strong>  (${fecha} ${time}):
                        <p>${comentario.value}</p>
                        <p><strong>Puntuación:</strong> ${estrellas(puntuacion.value)}</p>
                    </div>
                    `;
            comentariosContainer.innerHTML += comentarioHTML;
            comentario.value = "";
        }
        });


});
    function estrellas(puntos) {
        let estrellasHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < puntos) {
                estrellasHtml += '<span class="fa fa-star checked"></span>';
            } else {
                estrellasHtml += '<span class="fa fa-star"></span>';
            }
        }
        return estrellasHtml;
    }

    function mostrarComentarios(comentarios) {
        const comentariosContainer = document.getElementById('comentarios-container');
        if (comentarios.length === 0) {
            comentariosContainer.innerHTML = '<p>No hay comentarios para este producto.</p>';
        } else {
            comentariosContainer.innerHTML = "";
            comentarios.forEach(comentario => {
                const comentarioHTML = `
                <div class="comentario">
                    <span class="comentUser">${comentario.user}</span>  (${comentario.dateTime}):
                    <p>${comentario.description}</p>
                    <p><strong>Puntuación:</strong> ${estrellas(comentario.score)}</p>
                </div>
                `;
                comentariosContainer.innerHTML += comentarioHTML;
            });
        }
    }

function cargarProductosRelacionados(category) {
    const categoryId = obtenerCategoryId(category); // Función para obtener el ID de la categoría, ajústalo según tu lógica

    fetch(`https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`) // Cargar productos de la misma categoría
        .then(response => response.json())
        .then(data => {
            mostrarProductosRelacionados(data.products);
        })
        .catch(error => {
            console.error("Error al cargar productos relacionados:", error);
        });
}

function mostrarProductosRelacionados(productos) {
    const contenedor = document.getElementById('listaProductosRelacionados');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'col-6 col-md-4 col-lg-3 mb-4'; // Clase de Bootstrap para hacer columnas responsivas

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
            localStorage.setItem('productId', producto.id); // Guardar el nuevo productId en localStorage
            window.location.href = 'product-info.html'; // Recargar la página para mostrar el nuevo producto
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
    return categoryMap[category] || 101; // Devuelve 102 (Juguetes) por defecto si no se encuentra la categoría
}

// Seleccionar los elementos principales
const body = document.body;
const themeIcon = document.getElementById('theme-icon');
const themeToggle = document.getElementById('theme-toggle');

// Comprobar el modo almacenado en localStorage
const storedTheme = localStorage.getItem('theme');

// Aplicar el tema almacenado al cargar la página
if (storedTheme === 'dark') {
  body.classList.add('bg-dark', 'text-light', 'text-light-mode');
  themeIcon.classList.replace('fa-sun', 'fa-moon');
} else {
  body.classList.add('bg-light', 'text-dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Alternar entre modo día y noche al hacer clic en el ícono
themeToggle.addEventListener('click', () => {
  if (themeIcon.classList.contains('fa-sun')) {
    // Cambiar a modo noche
    body.classList.remove('bg-light', 'text-dark');
    body.classList.add('bg-dark', 'text-light', 'text-light-mode');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark'); // Guardar el tema en localStorage
  } else {
    // Cambiar a modo día
    body.classList.remove('bg-dark', 'text-light', 'text-light-mode');
    body.classList.add('bg-light', 'text-dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light'); // Guardar el tema en localStorage
  }
});


