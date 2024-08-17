document.addEventListener("DOMContentLoaded", function(){
    const productContainer = document.getElementsByClassName("pb-5 container")[0];
    const categoryId = "101"; // ID de categoria a mostrar
    const url = PRODUCTS_URL + categoryId + EXT_TYPE;

    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok") {
            let products = resultObj.data.products; 

            products.forEach(product => {
                let productHTML = `
                    <div class="product-item">
                        <img src="${product.image}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>Precio: ${product.currency} ${product.cost}</p>
                        <p>Cantidad vendidos: ${product.soldCount}</p>
                    </div>
                `;
                productContainer.innerHTML += productHTML;
            });
        } else {
            productContainer.innerHTML = "<p>Error al cargar los productos.</p>";
        }
    });
});



