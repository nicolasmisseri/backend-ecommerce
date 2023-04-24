const express = require("express");
const CartManager = require("./CartManager");

const router = express.Router();
const cartManager = new CartManager("./carts.json");

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).send({ cart: newCart });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      res.status(404).send({ error: "Este id de carrito no existe" });
    } else {
      res.send({ products: cart.products });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      res.status(404).send({ error: "Este id de carrito no existe" });
    } else {
      const product = await productManager.getProductById(pid);
      if (!product) {
        res.status(404).send({ error: "Este id de producto no existe" });
      } else {
        const addedProduct = await cartManager.addProductToCart(cid, product);
        res.send(addedProduct);
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
