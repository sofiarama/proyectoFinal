document.addEventListener("DOMContentLoaded", function () {
  const productID = localStorage.getItem("productId");
  const productContainer = document.getElementById("contenedor");
  const relatedProductsContainer = document.getElementById(
    "listaProductosRelacionados"
  );
  const comentariosContainer = document.getElementById("comentarios-container");
  const btnCalif = document.getElementById("btnCalif");
  const comentarioInput = document.getElementById("comentario");
  const puntuacionInput = document.getElementById("puntuacion");

  if (!productID) {
    productContainer.innerHTML = "<p>Error: No se seleccionó un producto.</p>";
    return;
  }

  // Cargar detalles del producto
  fetch(`json/products/${productID}.json`)
    .then((response) => response.json())
    .then((productData) => {
      mostrarProductoPrincipal(productData);

      if (productData.relatedProducts) {
        mostrarProductosRelacionados(productData.relatedProducts);
      } else {
        relatedProductsContainer.innerHTML =
          "<p>No hay productos relacionados disponibles.</p>";
      }
    });

  // Cargar comentarios
  fetch(`json/comments/${productID}.json`)
    .then((response) => response.json())
    .then((commentsData) => {
      mostrarComentarios(commentsData);
    })
    .catch((error) => {
      console.error("Error al cargar comentarios:", error);
      comentariosContainer.innerHTML =
        "<p>No se pudieron cargar los comentarios.</p>";
    });

  // Mostrar el producto principal
  function mostrarProductoPrincipal(productData) {
    productContainer.innerHTML = `
      <div class="row">
        <div class="col-md-4">
          <div class="thumbnail-images d-flex flex-column">
            ${productData.images
              .map(
                (img) =>
                  `<img src="${img}" alt="Imagen secundaria" class="thumbnail img-fluid mb-2">`
              )
              .join("")}
          </div>
        </div>
        <div class="col-md-8">
          <img
            src="${productData.images[0]}"
            alt="Imagen principal del producto"
            id="main-display"
            class="img-fluid mb-4"
          />
          <h2>${productData.name}</h2>
          <p>${productData.description}</p>
          <p><strong>Precio:</strong> ${productData.currency} ${
      productData.cost
    }</p>
          <p><strong>Vendidos:</strong> ${productData.soldCount}</p>
          <div class="d-flex align-items-center mt-3">
            <input
              type="number"
              id="cantidad"
              class="form-control w-25 me-2"
              value="1"
              min="1"
            />
            <button id="addToCart" class="btn btn-primary">Agregar al carrito</button>
          </div>
        </div>
      </div>
    `;

    // Agregar al carrito
    const addToCartBtn = document.getElementById("addToCart");
    addToCartBtn.addEventListener("click", function () {
      const cantidad = parseInt(document.getElementById("cantidad").value);
      const subtotal = cantidad * productData.cost;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const productInCart = cart.find((item) => item.id === productData.id);
      if (productInCart) {
        productInCart.quantity += cantidad;
        productInCart.subtotal = productInCart.quantity * productData.cost;
      } else {
        cart.push({
          id: productData.id,
          name: productData.name,
          cost: productData.cost,
          currency: productData.currency,
          quantity: cantidad,
          subtotal: subtotal,
          image: productData.images[0],
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Producto agregado al carrito.");
      window.location.href = "cart.html";
    });

    // Cambiar imagen principal al hacer clic en miniaturas
    const thumbnails = document.querySelectorAll(".thumbnail");
    const mainImage = document.getElementById("main-display");
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", function () {
        mainImage.src = this.src;
      });
    });
  }

  // Mostrar productos relacionados
  function mostrarProductosRelacionados(products) {
    relatedProductsContainer.innerHTML = ""; // Limpiar contenedor

    products.forEach((producto) => {
      const productCard = document.createElement("div");
      productCard.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

      productCard.innerHTML = `
        <div class="card h-100">
          <img src="${producto.image}" class="card-img-top" alt="${producto.name}" />
          <div class="card-body">
            <h5 class="card-title">${producto.name}</h5>
            <button class="btn btn-primary w-100">Ver Producto</button>
          </div>
        </div>
      `;

      productCard.querySelector("button").addEventListener("click", () => {
        localStorage.setItem("productId", producto.id);
        location.reload();
      });

      relatedProductsContainer.appendChild(productCard);
    });
  }

  // Mostrar comentarios
  function mostrarComentarios(comments) {
    comentariosContainer.innerHTML = "";

    if (!comments || comments.length === 0) {
      comentariosContainer.innerHTML =
        "<p>No hay comentarios para este producto.</p>";
      return;
    }

    comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "comentario mb-4";

      commentDiv.innerHTML = `
        <p><strong>${comment.user}</strong> (${comment.dateTime})</p>
        <p>${comment.description}</p>
        <p>${generarEstrellas(comment.score)}</p>
        <hr />
      `;

      comentariosContainer.appendChild(commentDiv);
    });
  }

  // Publicar un nuevo comentario
  btnCalif.addEventListener("click", function (event) {
    event.preventDefault();

    const nuevoComentario = {
      user: "Usuario Actual",
      dateTime: new Date().toLocaleString(),
      description: comentarioInput.value,
      score: parseInt(puntuacionInput.value),
    };

    mostrarComentarios([
      nuevoComentario,
      ...JSON.parse(localStorage.getItem("comments") || "[]"),
    ]);
    comentarioInput.value = "";
    puntuacionInput.value = "5";
  });

  // Generar estrellas para la puntuación
  function generarEstrellas(score) {
    let estrellas = "";
    for (let i = 1; i <= 5; i++) {
      estrellas += `<span class="fa fa-star${
        i <= score ? " checked" : ""
      }"></span>`;
    }
    return estrellas;
  }
});
