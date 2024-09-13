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
                        <div class="car">
                            <div class="image-gallery">  <!-- una galeria para mostrar unas imagenes como opcionales -->
                                <div class="thumbnail-images">  <!-- ver si todas tienen 4 fotos -->
                                    <img src="${product.images[1]}" alt="small image" class="thumbnail">
                                    <img src="${product.images[2]}" alt="small image" class="thumbnail">
                                    <img src="${product.images[3]}" alt="small image" class="thumbnail">
                                </div>
                                <div class="main-image">
                                    <img src="${product.images[0]}" alt="Main image" id="main-display">
                                </div>
                            </div>
                            <div class="descripcion">
                                <h5 class="title">${product.name}</h5>
                                <p class="description">${product.description}</p>
                                <p class="soldCount">Vendidos: ${product.soldCount}</p>
                                <h6 class="category">${product.category}</h6>
                            </div>
                        </div>`

                    //cambiar la foto main para ver mas grande
                    const fotoMain = document.getElementById('main-display');
                    const fotosSmall = document.getElementsByClassName('thumbnail');
                    for (let i = 0; i < fotosSmall.length; i++) {
                        fotosSmall[i].addEventListener('click', function() {
                            let auxFoto = fotoMain.src;
                            fotoMain.src = this.src; //tradea las fotos
                            this.src = auxFoto; //en la imagen chica pone la q es main
                        });
                    }
                }
                else {
                    console.log("No se encontró el producto");
                }
            })
            .catch(error => {
                console.error("Error al cargar los detalles del producto:", error);
            });
    }                                 
    else {                            //si es null o indefinido muestra un mensaje de error
        console.log("No se encontró el productID");
    }
});



