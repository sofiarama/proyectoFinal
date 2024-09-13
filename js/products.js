 //guardar el id del elemento en el localStorage 
function savePRoductId(productId) {
    localStorage.setItem('productId', productId);
    console.log('productId guardado:', localStorage.getItem('productId'));
    window.location.href = 'product-info.html';
}

document.addEventListener("DOMContentLoaded", function () {
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('categoria') || 'autos'; // Por defecto, "autos"

  // Definir la URL correcta para cada categoría
  let apiUrl;
  if (categoria === 'autos') {
    apiUrl = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
  } else if (categoria === 'juguetes') {
    apiUrl = 'https://japceibal.github.io/emercado-api/cats_products/102.json';
  } else if (categoria === 'muebles') {
    apiUrl = 'https://japceibal.github.io/emercado-api/cats_products/103.json';
  }

  const productContainer = document.getElementById("product-container");
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");
  const filterPriceBtn = document.getElementById("filterPriceBtn");
  const clearFilterBtn = document.getElementById("clearFilterBtn");
  const sortOptions = document.getElementById("sortOptions");
  const currencySelect = document.getElementById("currencySelect");

  let productos = []; // Array global para almacenar los productos cargados

  // Cargar productos de la API según la categoría seleccionada
  function cargarProductos() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        productos = data.products; // Guardar los productos en el array global
        mostrarProductos(productos); // Mostrar todos los productos al inicio
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        productContainer.innerHTML = `<p>Error al cargar los productos. Intenta nuevamente más tarde.</p>`;
      });
  }

  // Función para mostrar productos en la lista
 function mostrarProductos(listaProductos) {
  productContainer.innerHTML = ''; // Limpiar la lista de productos
  
  if (listaProductos.length === 0) {
    productContainer.innerHTML = `
      <div class="no-products-message text-center">
        <p>No hay productos en este rango de precios.</p>
        <i class="bi bi-emoji-frown" style="font-size: 2rem; color: gray;"></i> <!-- Ícono de Bootstrap Icons -->
      </div>`;
    return;
  }
    listaProductos.forEach((producto) => {
      const productItem = `
        <div class="col-lg-4 col-md-6 col-12">
          <div class="card mb-4 shadow-sm" onclick="saveProductId(${producto.id})">
            <img src="${producto.image}" alt="${producto.name}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${producto.name}</h5>
              <p class="card-text">${producto.description}</p>
              <p class="card-text"><strong>Precio:</strong> ${producto.cost} ${producto.currency}</p>
              <p class="card-text"><strong>Vendidos:</strong> ${producto.soldCount}</p>
            </div>
          </div>
        </div>
      `;
      productContainer.innerHTML += productItem;
    });
  }

  // Función para convertir precios a UYU (si es necesario)
  function convertirAPesos(cost, currency) {
    const conversionRate = 40; // 1 USD = 40 UYU
    return currency === 'USD' ? cost * conversionRate : cost;
  }

  // Función para convertir precios a USD (si es necesario)
  function convertirADolares(cost, currency) {
    const conversionRate = 40; // 1 USD = 40 UYU
    return currency === 'UYU' ? cost / conversionRate : cost;
  }

  // Función para filtrar productos por precio según la moneda seleccionada
  function filtrarPorPrecio() {
    const minPrice = parseFloat(minPriceInput.value) || 0; // Si no hay valor, usar 0
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity; // Si no hay valor, usar infinito
    const selectedCurrency = currencySelect.value; // Obtener la moneda seleccionada

    // Verificar si el rango es adecuado
    if (minPrice > maxPrice) {
      alert("El precio mínimo no puede ser mayor que el precio máximo");
      return;
    }

    const productosFiltrados = productos.filter(producto => {
      let precioConvertido;

      if (selectedCurrency === 'UYU') {
        precioConvertido = convertirAPesos(producto.cost, producto.currency); // Convertir todos a UYU
      } else {
        precioConvertido = convertirADolares(producto.cost, producto.currency); // Convertir todos a USD
      }

      return precioConvertido >= minPrice && precioConvertido <= maxPrice;
    });

    mostrarProductos(productosFiltrados); // Mostrar los productos filtrados
  }

  // Función para ordenar los productos
  function ordenarProductos() {
    const opcionSeleccionada = sortOptions.value;
    const selectedCurrency = currencySelect.value;

    let productosOrdenados = [...productos]; // Crear una copia del array original

    if (opcionSeleccionada === 'precioAsc') {
      productosOrdenados.sort((a, b) => {
        if (selectedCurrency === 'UYU') {
          return convertirAPesos(a.cost, a.currency) - convertirAPesos(b.cost, b.currency);
        } else {
          return convertirADolares(a.cost, a.currency) - convertirADolares(b.cost, b.currency);
        }
      });
    } else if (opcionSeleccionada === 'precioDesc') {
      productosOrdenados.sort((a, b) => {
        if (selectedCurrency === 'UYU') {
          return convertirAPesos(b.cost, b.currency) - convertirAPesos(a.cost, a.currency);
        } else {
          return convertirADolares(b.cost, b.currency) - convertirADolares(a.cost, a.currency);
        }
      });
    } else if (opcionSeleccionada === 'relevancia') {
      productosOrdenados.sort((a, b) => b.soldCount - a.soldCount);
    }

    mostrarProductos(productosOrdenados);
  }

  // Función para limpiar los filtros
  function limpiarFiltro() {
    minPriceInput.value = ''; // Limpiar campo de precio mínimo
    maxPriceInput.value = ''; // Limpiar campo de precio máximo
    mostrarProductos(productos); // Mostrar todos los productos sin filtrar
  }

  // Eventos para los botones de filtro, limpiar y ordenar
  filterPriceBtn.addEventListener('click', filtrarPorPrecio);
  clearFilterBtn.addEventListener('click', limpiarFiltro);
  sortOptions.addEventListener('change', ordenarProductos);

  // Cargar los productos al inicio
  cargarProductos();
});






