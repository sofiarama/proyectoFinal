//categoria de productos
const categoria = localStorage.getItem('catID');
const produ = localStorage.getItem('productId');

const CATEGORIES_URL = "http://localhost:3000/categories"; //
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell"; //
const PRODUCTS_URL = `http://localhost:3000/cats_products/${categoria}`; //
const PRODUCT_INFO_URL = `http://localhost:3000/products/${produ}`; //
const PRODUCT_INFO_COMMENTS_URL = `http://localhost:3000/products_comments/${produ}`; //
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "http://localhost:3000/cart"; //
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

var getJSONProd = function(url){
  var result = [];
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      if (response.products){
        result = response.products;
      } else {
        result = response;
      }
      return result;
    })
    .catch(function (error) {
      console.log("Error al cargar los productos", error);
    });
}

const coment = localStorage.getItem('comentario');
let comment = JSON.parse(coment);
var getJSONComent = function(url){
  var result = [];
  console.log(localStorage.getItem('comentario'));
  return fetch(url, {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "product": produ,
        "score": comment.punt,
        "description": comment.comentValue,
        "user": comment.name,
        "dateTime": comment.date,
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
      result = response;
      return result;
    })
    .catch(function (error) {
      console.log("Error al cargar los productos", error);
    });
}

