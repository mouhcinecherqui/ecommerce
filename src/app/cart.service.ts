import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: { product: Product, quantity: number }[] = [];

  constructor() { }

  addToCart(product: Product, quantity: number = 1): void {
    const index = this.items.findIndex(item => item.product === product);
    if (index !== -1) {
      this.items[index].quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeFromCart(product: Product): void {
    const index = this.items.findIndex(item => item.product === product);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  updateQuantity(product: Product, newQuantity: number): void {
    const index = this.items.findIndex(item => item.product === product);
    if (index !== -1) {
      this.items[index].quantity = newQuantity;
    }
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getItems(): { product: Product, quantity: number }[] {
    return this.items;
  }
}
