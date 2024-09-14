document.addEventListener("DOMContentLoaded", function () {
    const url = PRODUCTS_URL + 102 + EXT_TYPE;
        /* "https://japceibal.github.io/emercado-api/cats_products/102.json"; */
    
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
        const products = data.products;
        const productContainer =
            document.getElementById("product-container");
    
            products.forEach((product) => {
             const productItem = `
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="card mb-4 shadow-sm">
                            <img src="${product.image}" alt="${product.name}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>Precio:</strong> ${product.cost} ${product.currency}</p>
                                <p class="card-text"><strong>Vendidos:</strong> ${product.soldCount}</p>
                            </div>
                        </div>
                    </div>
                `;
                productContainer.innerHTML += productItem;
            });
        })
        .catch((error) => {
            console.error("Error al cargar los productos:", error);
            const productContainer = document.getElementById("product-container");
          productContainer.innerHTML = `<p>Error al cargar los productos. Intenta nuevamente más tarde.</p>`;
        });
   });