class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.nextId = 1;
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    // Verificar que todos los campos obligatorios se proporcionan
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    // Verificar que el campo "code" no está duplicado
    if (this.products.some((product) => product.code === code)) {
      console.error("El código ya existe");
      return;
    }
    // Agregar el producto con un id autoincrementable
    this.products.push({
      id: this.nextId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
  };

  getProducts = () => {
    return this.products;
  };

  getProductById = (id) => {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      // En caso de no ocincidir con ningun id, mostrar en la consola el error "Not Found"
      console.error("Not Found");
    }
    return product;
  };
}

// PRUEBAS
const productManager = new ProductManager();

productManager.addProduct(
  "Producto 1",
  "Descripción del producto 1",
  100,
  "ruta/de/imagen/1",
  "PROD1",
  10
);
productManager.addProduct(
  "Producto 2",
  "Descripción del producto 2",
  200,
  "ruta/de/imagen/2",
  "PROD2",
  5
);

const allProducts = productManager.getProducts();
console.log("TODOS LOS PRODUCTOS", allProducts);

const product = productManager.getProductById(1);
console.log("UN SOLO PRODUCTO POR ID", product);
