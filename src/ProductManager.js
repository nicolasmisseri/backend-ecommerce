const fs = require("fs").promises;

class ProductManager {
  constructor(path) {
    this.path = path;
    this.nextId = 1;
    this.ensureFileExists();
  }

  async ensureFileExists() {
    try {
      await fs.access(this.path);
    } catch (error) {
      await fs.writeFile(this.path, "[]");
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const existingProduct = products.find((p) => p.code === product.code);
    if (existingProduct) {
      throw new Error("Product already exists");
    }
    const newProduct = { id: this.nextId++, ...product };
    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products));
    return newProduct;
  }

  async getProducts(limit) {
    const productsJson = await fs.readFile(this.path, "utf-8");
    const products = JSON.parse(productsJson);
    if (limit) {
      return products.slice(0, limit);
    }
    return products;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) {
      return null;
    }
    return product;
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    const updatedProduct = { ...products[index], ...updatedFields, id };
    products[index] = updatedProduct;
    await fs.writeFile(this.path, JSON.stringify(products));
    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    products.splice(index, 1);
    await fs.writeFile(this.path, JSON.stringify(products));
  }
}

module.exports = ProductManager;

// PRUEBAS

// const pm = new ProductManager("/clase4/products.json");
// const nuevoProducto = {
//   title: "Camisa blanca",
//   description: "Camisa blanca de algodón",
//   price: 20,
//   thumbnail: "ruta/de/la/imagen",
//   code: "C001",
//   stock: 10,
// };

// pm.addProduct(nuevoProducto);

// const productos = pm.getProducts();
// console.log(productos); // muestra todos los productos
// console.log(productos.includes(nuevoProducto)); // true

// const productoObtenido = pm.getProductById(1); // suponiendo que el producto agregado tiene ID 1
// console.log(productoObtenido); // muestra el producto con ID 1
// console.log(productoObtenido === nuevoProducto); // true

// const productoActualizado = {
//   id: 1,
//   title: "Camisa blanca",
//   description: "Camisa blanca de algodón",
//   price: 25,
//   thumbnail: "ruta/de/la/imagen",
//   code: "C001",
//   stock: 8,
// };

// pm.updateProduct(1, productoActualizado); // actualiza el producto con ID 1

// const productoActualizadoObtenido = pm.getProductById(1);
// console.log(productoActualizadoObtenido); // muestra el producto actualizado
// console.log(productoActualizadoObtenido === productoActualizado); // true

// pm.deleteProduct(1); // elimina el producto con ID 1

// const productosActualizados = pm.getProducts();
// console.log(productosActualizados); // muestra todos los productos (sin el producto eliminado)
// console.log(productosActualizados.includes(productoActualizado)); // false
