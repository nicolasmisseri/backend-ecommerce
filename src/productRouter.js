const express = require("express");
const ProductManager = require("./ProductManager");

const router = express.Router();
const productManager = new ProductManager("./products.json");

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await productManager.getProducts(limit);
    res.send({ products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    res.status(201).send({ product: newProduct });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const updatedFields = req.body;
    const updatedProduct = await productManager.updateProduct(
      pid,
      updatedFields
    );
    res.send({ product: updatedProduct });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    await productManager.deleteProduct(pid);
    res.send({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
