function agregarStringInvertida() {
    // Agrega un método al prototipo de "String" que devuelva la misma cadena de caracteres, pero invertida.
    // El método debe llamarse "reverse".
    // [PISTA]: necesitarás utilizar el objeto "this".
    String.prototype.reverse = function(){
 return this.split('').reverse().join('')
    }
 } 
 agregarStringInvertida();
  let cadena = "Hola mundo"
  let cadenaInvertida = cadena.reverse()
  console.log(cadenaInvertida)