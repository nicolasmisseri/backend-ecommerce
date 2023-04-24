class CartManager {
  constructor() {
    this.cart = {};
  }

  addItem(productId, quantity) {
    if (this.cart.hasOwnProperty(productId)) {
      this.cart[productId] += quantity;
    } else {
      this.cart[productId] = quantity;
    }
  }

  removeItem(productId) {
    if (this.cart.hasOwnProperty(productId)) {
      delete this.cart[productId];
    }
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = {};
  }
}

module.exports = CartManager;
