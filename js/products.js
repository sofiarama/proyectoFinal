function openTab(event, tabName){
    const tabcontent = document.querySelectorAll(".tabcontent");
    tabcontent.forEach(tabcontent => tabcontent.computedStyleMap.display = "none");
  
    const tablink = document.querySelectorAll(".tablink");
    tablink.forEach(tablink => tablink.className = tablink.className.replace(" active", "")); 
  
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += "active";
    }
  
  document.querySelector(".tablink").click();



document.addEventListener("DOMContentLoaded", function(){
    //const productContainer = document.getElementsByClassName("pb-5 container")[0];
    //const categoryId = "101"; // ID de categoria a mostrar
    //const url = PRODUCTS_URL + categoryId + EXT_TYPE;

    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //let products = resultObj.data.products; 

            productsArray = sortProducts (ORDER_ASC_BY_COST, productsArray);
        }
        
    });
    showProductsList(productsArray);
    //products.forEach(product => {
        //let productHTML = `
            //<div class="product-item">
                //<img src="${product.image}" alt="${product.name}">
                //<h2>${product.name}</h2>
                //<p>${product.description}</p>
                //<p>Precio: ${product.currency} ${product.cost}</p>
                //<p>Cantidad vendidos: ${product.soldCount}</p>
            //</div>
        //`;
        //productContainer.innerHTML += productHTML;
   // });
//} else {
  //  productContainer.innerHTML = "<p>Error al cargar los productos.</p>";
});

