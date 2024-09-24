// Guardar el id del elemento en el localStorage
function saveProductId(productId) {
  localStorage.setItem('productId', productId);
  window.location.href = 'product-info.html';
}

document.addEventListener("DOMContentLoaded", function () {
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('categoria') || 'autos'; // Por defecto, "autos"

  // Seleccionar los elementos que se cambian dependiendo de la categoría
  const mainFoto = document.getElementsByClassName('contenedor')[0];
  const titulo = document.querySelector('h1');
  const boton1 = document.getElementById('ofertasBtn');
  const boton2 = document.getElementById('nuevosIngresosBtn');
  const titulo3 = document.querySelector('h3');
  const barra = document.getElementsByClassName('btn-ofertas')[0];
  const productContainer = document.getElementById("product-container");
  const searchBox = document.getElementById('searchBox');
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");
  const filterPriceBtn = document.getElementById("filterPriceBtn");
  const clearFilterBtn = document.getElementById("clearFilterBtn");
  const sortOptions = document.getElementById("sortOptions");
  const currencySelect = document.getElementById("currencySelect");

  let productos = []; // Array global para almacenar los productos cargados

  // Definir la URL correcta para cada categoría
  let apiUrl;
  if (categoria === 'autos') {
    apiUrl = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
    // Mostrar los botones "Ofertas" y "Nuevos Ingresos" solo para la categoría autos
    boton1.style.display = "inline-block";
    boton2.style.display = "inline-block";
  } else if (categoria === 'juguetes') {
    apiUrl = 'https://japceibal.github.io/emercado-api/cats_products/102.json';
    mainFoto.style.backgroundImage = "url('img/toys_index.jpg')";
    titulo.innerHTML = "ENCONTRÁ LOS JUGUETES<br> DE TUS SUEÑOS";
    boton1.style.display = "none";
    boton2.style.display = "none";
    titulo3.textContent = "JUGUETES JAP";
    barra.style.justifyContent = "center";
  } else if (categoria === 'muebles') {
    apiUrl = 'https://japceibal.github.io/emercado-api/cats_products/103.json';
    mainFoto.style.backgroundImage = "url('img/furniture_index.jpg')";
    titulo.innerHTML = "ENCONTRÁ LOS MUEBLES<br> DE TUS SUEÑOS";
    boton1.style.display = "none";
    boton2.style.display = "none";
    titulo3.textContent = "MUEBLES JAP";
    barra.style.justifyContent = "center";
  }

  // Función para mostrar productos
  function mostrarProductos(listaProductos) {
    productContainer.innerHTML = ''; // Limpiar el contenedor
    listaProductos.forEach((producto) => {
      const productItem = `
        <div class="colum col-lg-4 col-md-6 col-12">
          <div class="card mb-4 shadow-sm" onclick="saveProductId(${producto.id})">
            <img src="${producto.image}" alt="${producto.name}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${producto.name}</h5>
              <p class="card-text">${producto.description}</p>
              <p class="card-text"><strong>Precio:</strong> ${producto.cost} ${producto.currency}</p>
              <p class="card-text"><strong>Vendidos:</strong> ${producto.soldCount}</p>
            </div>
          </div>
        </div>`;
      productContainer.innerHTML += productItem;
    });
  }

  // Cargar productos desde la API (para todas las categorías)
  function cargarProductos() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        productos = data.products; // Guardar los productos en el array global
        mostrarProductos(productos); // Mostrar productos
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        productContainer.innerHTML = `<p>Error al cargar los productos. Intenta nuevamente más tarde.</p>`;
      });
  }

  // Cargar productos de Ofertas (archivo JSON local)
function cargarOfertas() {
  fetch('https://sofiarama.github.io/proyectoFinal/data/ofertas.json') // Archivo local para ofertas de autos
    .then((response) => response.json())
    .then((data) => {
      const productosOfertas = data.products;
      mostrarProductos(productosOfertas); // Mostrar solo productos de ofertas
      // Cambiar el título
      titulo.innerHTML = "Ofertas!!!";
      // Cambiar el texto del botón de ofertas a "Todos"
      boton1.textContent = "Todos";
      boton1.removeEventListener('click', cargarOfertas);
      boton1.addEventListener('click', function restaurarAutos() {
        cargarProductos(); // Volver a mostrar todos los productos
        titulo.innerHTML = `ENCUENTRA EL AUTO<br> DE TUS SUEÑOS`;
        boton1.textContent = "Ofertas";
        boton1.removeEventListener('click', restaurarAutos); // Restaurar función
        boton1.addEventListener('click', cargarOfertas);
      });
    })
    .catch((error) => {
      console.error("Error al cargar las ofertas:", error);
      productContainer.innerHTML = `<p>Error al cargar las ofertas. Intenta nuevamente más tarde.</p>`;
    });
}


  
  // Cargar productos de Nuevos Ingresos (archivo JSON local)
function cargarNuevosIngresos() {
  fetch('https://sofiarama.github.io/proyectoFinal/data/nuevos-ingresos.json') // Archivo local para nuevos ingresos de autos
    .then((response) => response.json())
    .then((data) => {
      const productosNuevos = data.products;
      mostrarProductos(productosNuevos); // Mostrar solo productos de nuevos ingresos
      // Cambiar el título
      titulo.innerHTML = "Últimos Ingresos!!!";
      // Cambiar el texto del botón de nuevos ingresos a "Todos"
      boton2.textContent = "Todos";
      boton2.removeEventListener('click', cargarNuevosIngresos);
      boton2.addEventListener('click', function restaurarAutos() {
        cargarProductos(); // Volver a mostrar todos los productos
        titulo.innerHTML = `ENCUENTRA EL AUTO<br> DE TUS SUEÑOS`;
        boton2.textContent = "Nuevos Ingresos";
        boton2.removeEventListener('click', restaurarAutos); // Restaurar función
        boton2.addEventListener('click', cargarNuevosIngresos);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los nuevos ingresos:", error);
      productContainer.innerHTML = `<p>Error al cargar los nuevos ingresos. Intenta nuevamente más tarde.</p>`;
    });
}


  // Eventos para los botones de ofertas y nuevos ingresos (solo para autos)
  if (categoria === 'autos') {
    boton1.addEventListener('click', cargarOfertas);
    boton2.addEventListener('click', cargarNuevosIngresos);
  }

  // Funciones de filtrado de productos (ya existentes)
  function filtrarProductos() {
    const searchTerm = searchBox.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => {
      return producto.name.toLowerCase().includes(searchTerm) ||
             producto.description.toLowerCase().includes(searchTerm);
    });
    mostrarProductos(productosFiltrados);
  }

  searchBox.addEventListener('input', filtrarProductos);

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
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    const selectedCurrency = currencySelect.value;

    if (minPrice > maxPrice) {
      alert("El precio mínimo no puede ser mayor que el precio máximo");
      return;
    }

    const productosFiltrados = productos.filter(producto => {
      let precioConvertido;
      if (selectedCurrency === 'UYU') {
        precioConvertido = convertirAPesos(producto.cost, producto.currency);
      } else {
        precioConvertido = convertirADolares(producto.cost, producto.currency);
      }
      return precioConvertido >= minPrice && precioConvertido <= maxPrice;
    });

    mostrarProductos(productosFiltrados);
  }

  // Función para ordenar los productos
  function ordenarProductos() {
    const opcionSeleccionada = sortOptions.value;
    const selectedCurrency = currencySelect.value;

    let productosOrdenados = [...productos];

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
    minPriceInput.value = '';
    maxPriceInput.value = '';
    mostrarProductos(productos); // Mostrar todos los productos sin filtrar
  }

  // Eventos para los botones de filtro, limpiar y ordenar
  filterPriceBtn.addEventListener('click', filtrarPorPrecio);
  clearFilterBtn.addEventListener('click', limpiarFiltro);
  sortOptions.addEventListener('change', ordenarProductos);

  // Cargar los productos al inicio
  cargarProductos();
});
