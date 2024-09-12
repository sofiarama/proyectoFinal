document.addEventListener('DOMContentLoaded', function () {
  // Asignar eventos de clic a las tarjetas
  document.getElementById('autos').addEventListener('click', function() {
    window.location.href = 'products.html?categoria=autos'; // Redirige a 'products.html' con la categoría 'autos'
  });

  document.getElementById('juguetes').addEventListener('click', function() {
    window.location.href = 'products.html?categoria=juguetes'; // Redirige a 'products.html' con la categoría 'juguetes'
  });

  document.getElementById('muebles').addEventListener('click', function() {
    window.location.href = 'products.html?categoria=muebles'; // Redirige a 'products.html' con la categoría 'muebles'
  });
});

