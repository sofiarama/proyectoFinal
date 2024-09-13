/* function openTab(event, tabName){
    const tabcontent = document.querySelectorAll(".tabcontent");
    tabcontent.forEach(tabcontent => tabcontent.computedStyleMap.display = "none");
  
    const tablink = document.querySelectorAll(".tablink");
    tablink.forEach(tablink => tablink.className = tablink.className.replace(" active", "")); 
  
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += "active";
    }
  
  document.querySelector(".tablink").click(); */
 
function savePRoductId(productId) {
    localStorage.setItem('productId', productId);
    console.log('productId guardado:', localStorage.getItem('productId'));
    window.location.href = 'product-info.html';
}

document.addEventListener("DOMContentLoaded", function () {
    const url = PRODUCTS_URL + 101 + EXT_TYPE;
        /* "https://japceibal.github.io/emercado-api/cats_products/101.json"; */
    
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        const products = data.products;
        const productContainer =
            document.getElementById("product-container");
    
        products.forEach((product) => {
            const productItem = `
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="card mb-4 shadow-sm" onclick="savePRoductId(${product.id})">
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
/*esto es la funcion para que al dar clic sobre los btn ofertas y nuevos ingresos te lleve a las paginas correspondientes*/ 
    document.getElementById('ofertasBtn').addEventListener('click', function() {
  window.location.href = 'ofertas.html';
});

document.getElementById('nuevosIngresosBtn').addEventListener('click', function() {
  window.location.href = 'nuevos-ingresos.html';
});
