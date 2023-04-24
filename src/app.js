const express = require("express");
const ProductManager = require("./ProductManager");
const app = express();
const port = 8080;
const http = require("http").Server(app);
const io = require("socket.io")(http);
const handlebars = require("express-handlebars");

// Set up handlebars as the view engine
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const productManager = new ProductManager("./products.json");

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await productManager.getProducts(limit);
    res.send({ products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);
    if (!product) {
      res.status(404).send({ error: "Este id de producto no existe" });
    } else {
      res.send({ product });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
