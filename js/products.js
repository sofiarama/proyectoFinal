document.addEventListener("DOMContentLoaded", async function () {
  const productContainer = document.getElementById("product-container");
  const searchBox = document.getElementById("searchBox");
  const currencySelect = document.getElementById("currencySelect");
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");

  const selectedCategory = localStorage.getItem("selectedCategory");
  const categoryUrls = {
    autos: "json/cats_products/101.json",
    juguetes: "json/cats_products/102.json",
    muebles: "json/cats_products/103.json",
  };

  let allProducts = []; // Variable para almacenar los productos originales

  if (!selectedCategory || !categoryUrls[selectedCategory]) {
    productContainer.innerHTML =
      "<p>Error: No se seleccionó una categoría válida.</p>";
    return;
  }

  try {
    const response = await fetch(categoryUrls[selectedCategory]);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    allProducts = data.products; // Guardar los productos originales
    mostrarProductos(allProducts);
  } catch (error) {
    console.error("Error al cargar productos:", error);
    productContainer.innerHTML =
      "<p>Hubo un error al cargar los productos. Intenta más tarde.</p>";
  }

  function mostrarProductos(listaProductos) {
    productContainer.innerHTML = ""; // Limpiar contenedor

    if (!listaProductos || listaProductos.length === 0) {
      productContainer.innerHTML =
        "<p>No hay productos disponibles para esta categoría.</p>";
      return;
    }

    listaProductos.forEach((producto) => {
      const productItem = document.createElement("div");
      productItem.className =
        "col-12 col-sm-6 col-md-4 col-lg-3 mb-4 p-3 border rounded shadow-sm bg-light";
      productItem.innerHTML = `
        <div class="product-card">
          <img src="${producto.image}" alt="${producto.name}" class="img-fluid mb-2">
          <h5>${producto.name}</h5>
          <p>${producto.description}</p>
          <p><strong>Precio:</strong> ${producto.cost} ${producto.currency}</p>
          <p><strong>Vendidos:</strong> ${producto.soldCount}</p>
          <button class="btn btn-primary btn-sm">Ver más</button>
        </div>
      `;

      productItem.querySelector("button").addEventListener("click", () => {
        localStorage.setItem("productId", producto.id);
        localStorage.setItem(
          "relatedProducts",
          JSON.stringify(listaProductos.filter((p) => p.id !== producto.id))
        );
        window.location.href = "product-info.html";
      });

      productContainer.appendChild(productItem);
    });
  }

  function filtrarProductos() {
    const searchQuery = searchBox.value.toLowerCase();
    const selectedCurrency = currencySelect.value;
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    const filteredProducts = allProducts.filter((producto) => {
      const matchesSearch =
        producto.name.toLowerCase().includes(searchQuery) ||
        producto.description.toLowerCase().includes(searchQuery);
      const matchesCurrency = producto.currency === selectedCurrency;
      const matchesPrice =
        producto.cost >= minPrice && producto.cost <= maxPrice;

      return matchesSearch && matchesCurrency && matchesPrice;
    });

    mostrarProductos(filteredProducts);
  }

  // Event listeners
  searchBox.addEventListener("input", filtrarProductos);
  currencySelect.addEventListener("change", filtrarProductos);
  minPriceInput.addEventListener("input", filtrarProductos);
  maxPriceInput.addEventListener("input", filtrarProductos);
});
