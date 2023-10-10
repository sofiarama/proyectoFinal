// function duplicar(num1, num2) {
//        return num1 + num2;
// }

// console.log(duplicar(30, 60));
// console.log(duplicar(10, 10));


  
// function showname(name, lastName){
//       return "tu nombre es " + name + lastName;

// }
// console.log(showname("sule", " leyva"))

// function numeroAleatorio(){
//        return Math.random() * 100;
// }
// console.log(numeroAleatorio())
// console.log(numeroAleatorio())
// console.log(numeroAleatorio())
// console.log(numeroAleatorio())

// console.log(showname("edgar", " durand"))
// console.log(showname("sule", " leyva"))

// var day = "lunes";
// if(day === "sabado"){
//        console.log("Hoy vamos a la playa");
// }else{
//        console.log("nos quedamos en casa")
// }
// var anioNacimuento = 1898;
// if(anioNacimuento >=1890 && anioNacimuento <=1995){
//        console.log("eres un millenial")
// }

// var genero = "rojos";
// if(genero === "verde" || genero === "amarillo" || genero === "azul"){
//        alert("tenemos en stoc puede realizar su compra")
// } else{
// alert("este color no se encuentra disponible en estos momentos")
// }


// var hora = 10
// if(hora > 18){
//        alert("es tarde, el local esta cerrado");
// }else if(hora < 9) {
// alert("aun es muy temprano vuelva luego");
// }else{
//    alert("bienbenido")  
// }

// function buscarNumPar(num1){
//       if(num1 % 2 === 0){
// return true;
//       }else{
//        return false;
//       }

// }
// console.log(buscarNumPar(4));
// console.log(buscarNumPar(7));

// function dosNumeros(num1, num2){
//        if(num1 > num2){
//               return num1
//        }else if(num1 == num2){
//               return "los dos numeros son iguales"
//        }
//        else{
//               return num2
//        }
// }
// console.log(dosNumeros(3, 8));
// console.log(dosNumeros(7, 7));

// function esFinDeSemana(dia){
//        if(dia == "sabado" || dia == "domingo"){
//               return true;
//        }else if(dia !== "lunes" && dia !== "martes" && dia !== "miercoles" && dia !== "jueves" && dia !== "viernes"){
//               return "ingresa un dia de la semana";
//        }
//        else {
//               return false;
//        }
// }
// console.log(esFinDeSemana("domingo"))
// console.log(esFinDeSemana("naranja"))
// console.log(esFinDeSemana("martes"))

// var mainTitle = document.querySelector("h1");
// mainTitle.style.color = "red";
// mainTitle.style.backgroundColor = "black";
// mainTitle.style.fontSize = "100px" ;
// mainTitle.innerText = "permite agregar texto";
// mainTitle.innerHTML += " <em> tambien agrega texto pero con estilos css<mark>ejemplo<mark><em>" 
// mainTitle.classList.add("prueba02");
// // mainTitle.classList.remove("remueve la clase");
// // mainTitle.classList.toggle("si esta la elimina y si no esta la agrega");
// console.log(mainTitle);


// console.log(mainTitle.classList);
// console.log(mainTitle.classList.contains("prueba02"));
// if(mainTitle.classList.contains("prueba02")){
//        alert("este clase existe");
// }
// // arrays

// var miArray = ["martha", "roger", "yoyi", "ema"];
// // esto se usa para remplasar un valor a menos que lo agreges al final que si crea uno nuevo
// miArray[4] = "test";
// miArray[0] = "otroTest";

// console.log(miArray[1]);
// console.log(miArray);

// var capturaTitulos = document.querySelectorAll("h1");
// console.log(capturaTitulos);
// capturaTitulos[1].style.color = "blue";
// capturaTitulos[1].innerHTML += "<h1>lo logre<h1>";
// capturaTitulos[4].classList.add("lo_logre");

// seguimos con los arrays formas de manipular el array
// miArray.push(" agrega el valor que quieres siempre al final");
// myArray.unshift(); inserta al inicio
// miArray.pop(); elimina el ultimo elemento no se le pasa valor en el parametro
// miArray.shift(); elimina del indice 0 el primer elemento no se le pasa valor en el parametro 
// myArray.toString(); retorna un srting con los elementos delmarray sepARADOS por comas
// myArray.join("-"); retorna un string pero te deja elejir el tipo de separador

// uso de for

// for(var i = 1; i <=1000; i++){
//        console.log("iteraccion num: " + i );
// };
// document.addEventListener('DOMContentLoaded', () => {
//      var selectAnio = document.querySelector(".anio");
// for(var i = 2023; i >= 1990; i--){
//        selectAnio.innerHTML += "<option>" + i + "</option>"
// }
// console.log(selectAnio)

// var arrayMeses = ["enero", "febrero", "marzo", "abril", "mayo", "junio" ];
// for(var i = 0; i < arrayMeses.length; i++){
//        console.log(arrayMeses[i]);
// }
// otra manera seria

// arrayMeses.forEach(function(febrero){
//        console.log(febrero)
// });
// var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
// var mes = document.querySelector(".month");

// for(var i = 0; i < meses.length; i++) {
//        mes.innerHTML += "<option>" + meses[i] + "</option>";    

// }  
// meses.forEach(function(lulu){
//        mes.innerHTML += "<option>" + lulu + "</option>";
// })
// for (var test of meses) {
//        mes.innerHTML += "<option>" + test + "</option>";   
// }

// var miTituloPrinc = document.querySelector("h1");
// var miPrimerPa = document.querySelector("p");
// // miTituloPrinc.addEventListener("click", function(){
// //        console.log("hice clikc")})
//        // otra manera seria
// // function otraManera (){
// //        console.log("se hiso click sobre el h1")
// // }
// // miTituloPrinc.addEventListener("click", otraManera)

// function clicSobreH1 (event){
//       var element = event.target
//      element.classList.toggle("otra-clase")
// }
// miTituloPrinc.addEventListener("click", clicSobreH1 )
// miPrimerPa.addEventListener("click", clicSobreH1 )

// //  aprendiendo de apis json

// var dataBase = {
//        name: "pablo",
//        age: 25
// }
// console.log(dataBase);
// var test = JSON.stringify(dataBase); 
// console.log(test)
// // de esta manera convierto objeto a string con JSON.stringify()

// var test02 = JSON.parse(test);
// console.log(test02)
// // y asi convierto de string a objeto
//  var miSubtitulo = document.querySelector("h2")
//  var miParagraph = document.querySelector("p")
// function hacerCLICK (event){
//       var elementoDeClikear = event.target;
// elementoDeClikear.classList.toggle("titulo")
// }
// miSubtitulo.addEventListener("click", hacerCLICK )
// miParagraph.addEventListener("click", hacerCLICK)



// var botonCliqueable = document.querySelector(".parrafito")

// // botonCliqueable.addEventListener("mouseover", function(){
// //        console.log("estoy en sima del parrafito")
// // })
// botonCliqueable.onmouseover = function(){
//        alert("pasate el mouse")
// }
// var user = {
//        name: "ana",
//        lastName: "maria",
//        age: 27
// }
// var miTitulo = document.querySelector("h1")
// miTitulo.innerText += " bienbenida " + user.name + " " + user.lastName

// objetos
// var students = [
//        {fullName: "pepe peres", subject: "phyton"},
//        {fullName: "maria leyva", subject: "phyton"},
//        {fullName: "manuel peres", subject: "phyton"},
//        {fullName: "luis peres", subject: "phyton"},
// ];
// var alumnosAsigntura = document.querySelector(".estudiantes-Asignaturas");

// for (var i = 0;  i < students.length; i++) {
//     alumnosAsigntura.innerHTML += "<li>"  + "me llamo " + students[i].fullName + " y estoy estudiando " + students[i].subject + "</li>";
// //     console.log(students[i].FullName)   
// }
// var user = {
//        firstName: "lola",
//        lastName: "peres",
      
//        age: 27,
//        getInfo: function(lang){
//               if(lang === "esp"){
//                      return " hola soy " + this.firstName + " " + this.lastName + " y tengo " + this.age + " anios de edad";  
//               }else if(lang === "eng"){
//                      return " hello i am " + this.firstName + " " + this.lastName + " and i am " + this.age + " years old";
//               }
         
//        }
// };
// var titulo = document.querySelector("h1");
// // titulo.innerText += user.getInfo("esp");
  
// // convertir de json a javascript y viseversa

// var user = {
//        name: "pedro",
//        lastName: "peres",
//        age: "27"
// }
// var userSTRING = JSON.stringify(user);
// console.log(typeof  userSTRING);

//  var convObject =  JSON.parse(userSTRING);
//  console.log(convObject)
// //  JSON.parse lo que hace es pasar de string a object 


// //  aprendiendo a consumirn y manipular apis
// var movieTitle = document.querySelector(".tituloMovie");
// fetch("https://private.omdbapi.com/?apikey=bef9c583&t=cinema+paradiso")
// .then (function (response){
//        return response.json();
// })
// .then(function (data){
//        console.log(data);
//        movieTitle.innerHTML = "<h2 class = 'titulo'>" + data.Title + "</h2>";
//        movieTitle.innerHTML += "<img src= ' " + data.Poster  +  " ' />";
//        movieTitle.innerHTML += "<p>" + data.Plot + "</p>"
// })
// .catch(function(error){
//        console.log(error);
// });

function miFuncion(nombre){
       alert("hola " + nombre );
}
 miFuncion("juan")
