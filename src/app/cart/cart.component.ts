import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class CartComponent implements OnInit {
  items: { product: Product, quantity: number }[] = [];
  total: number = 0;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getItems();
    this.calculateTotal();
  }

  getItems(): void {
    this.items = this.cartService.getItems();
  }

  removeFromCart(item: { product: Product, quantity: number }): void {
    this.cartService.removeFromCart(item.product);
    this.getItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    let total = 0;
    if(this.items?.length > 0)
    {
      for (const item of this.items) {
          total += item.product.price * item.quantity;
      }
    }
    this.total = total;
}

  updateQuantity(item: { product: Product, quantity: number }, newQuantity: number): void {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
      this.cartService.updateQuantity(item.product, newQuantity);
      this.calculateTotal();
    }
  }

}
