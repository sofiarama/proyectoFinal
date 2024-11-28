const express = require("express"); // Importa ExpressJS
const cors = require("cors");
const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(cors());
app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

/* --MAPEO--- */
const filemap = {
    categories: {folder: "cats", file: "cat.json"},
    cart: {folder: "cart", file: "buy.json"},
    sell: {folder: "sell", file: "publish.json"},
    user_cart: {folder: "user_cart", file: "25801.json"},
};

/* MANDAMOS TODA LA INFORMACIÓN */
app.get("/:category", (req, res) => {
  const category = req.params.category; // vemos la categoria q se require
  const mapping = filemap[category]; //buscamos su json
  try {
    const data = require(`./json/${mapping.folder}/${mapping.file}`);
    res.json(data);
  }
  catch (error) {
    res.status(500).send({error: "Error al cargar el archivo"});
  }
});

//SE MANDAN LOS PRODUCTOS DEPENDIENDO LA CATEGORIA
app.get("/:productsCategory/:index", (req, res) => {
  const productsCategory = require(`./json/${req.params.productsCategory}/${req.params.index}.json`);
  res.json(productsCategory); // Enviamos el elemento solicitado por su índice
});

app.post("/products_comments/:index", (req, res) => {
  const section = require(`./json/products_comments/${req.params.index}`)
  section.push(req.body); // Añadimos un nuevo elemento al array
  res.json(section); // Le respondemos al cliente el objeto añadido
});

app.put("/people/:index", (req, res) => {
  /* COMPLETA EL CÓDIGO NECESARIO:
     Para que se pueda actualizar el objeto asociado al índice indicado en la URL 
   */
  people[req.params.index] = req.body; // Actualizamos el elemento en el array

  res.json(req.body); // Le respondemos al cliente el objeto actualizado
});

app.delete("/people/:index", (req, res) => {
  /* COMPLETA EL CÓDIGO NECESARIO:
     Para que se pueda eliminar el objeto asociado al índice indicado en la URL 
   */
  people.splice(req.params.index, 1); // Eliminamos el elemento del array

  res.json({message: "Elemento eliminado con éxito" });
});

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
