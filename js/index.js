document.addEventListener('DOMContentLoaded', function () {
  // Asignar eventos de clic a las tarjetas
  document.getElementById('autos').addEventListener('click', function() {
    localStorage.setItem("catID",101);
    window.location.href = 'products.html?categoria=autos'; // Redirige a 'products.html' con la categoría 'autos'
  });

  document.getElementById('juguetes').addEventListener('click', function() {
    localStorage.setItem("catID",102);
    window.location.href = 'juguetes.html'; // Redirige a 'products.html' con la categoría 'juguetes'
  });

  document.getElementById('muebles').addEventListener('click', function() {
    localStorage.setItem("catID",103);
    window.location.href = 'muebles.html'; // Redirige a 'products.html' con la categoría 'muebles'
  });
});

