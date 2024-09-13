document.addEventListener("DOMContentLoaded", function(){
    const productID= localStorage.getItem('productId');
    console.log(productID);

    if (productID) {
        getProductDetails(productID);
    }
    else { 
        console.log("No se encontró el productID");
    }

    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainDisplay = document.getElementById('main-display');

    thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        mainDisplay.src = this.src.replace('small', 'large'); // Cambia la imagen grande al hacer clic
    });
});
});


function getProductDetails(id) {
    const url = PRODUCT_INFO_URL + id + EXT_TYPE;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const product = data;
            if (data) {
                const productContainer = document.getElementById("contenedor");
                productContainer.innerHTML = `
                    <div class="car">
                        <div class="image-gallery">
                            <div class="thumbnail-images">
                                <img src="${data.images[1]}" alt="small image" class="thumbnail">
                                <img src="${data.images[2]}" alt="small image" class="thumbnail">
                                <img src="${data.images[3]}" alt="small image" class="thumbnail">
                            </div>
                            <div class="main-image">
                                <img src="${data.images[0]}" alt="Main image" id="main-display">
                            </div>
                        </div>
                        <div class="descripcion">
                            <h5 class="title">${data.name}</h5>
                            <p class="description">${data.description}</p>
                            <p class="soldCount">Vendidos: ${data.soldCount}</p>
                            <h6 class="category">${data.category}</h6>
                        </div>
                    </div>

            `}
            else {
                console.log("No se encontró el producto");
            }
        })
        .catch(error => {
            console.error("Error al cargar los detalles del producto:", error);
        });
}