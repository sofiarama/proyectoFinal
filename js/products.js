function openTab(event, tabName){
    const tabcontent = document.querySelectorAll(".tabcontent");
    tabcontent.forEach(tabcontent => tabcontent.computedStyleMap.display = "none");
  
    const tablink = document.querySelectorAll(".tablink");
    tablink.forEach(tablink => tablink.className = tablink.className.replace(" active", "")); 
  
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += "active";
    }
  
  document.querySelector(".tablink").click();
  
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
                    <div class="col-md-4">
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
        const productContainer =
            document.getElementById("product-container");
        productContainer.innerHTML = `<p>Error al cargar los productos. Intenta nuevamente más tarde.</p>`;
        });
    });