// product.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [RouterOutlet, CommonModule, HttpClientModule,FormsModule],
  standalone: true

})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  quantity: number = 1;

  constructor(private productService: ProductService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();
   ;
  };

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  addToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, quantity);
    this.quantity = 1;
  }
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}

