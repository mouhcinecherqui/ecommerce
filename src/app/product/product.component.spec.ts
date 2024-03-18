import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Product } from '../product';
import { CommonModule } from '@angular/common';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let cartService: jasmine.SpyObj<CartService>;
  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', ['getProducts']);
    cartService = jasmine.createSpyObj('CartService', ['getItems', 'addToCart']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        CommonModule
      ],
        providers: [
          { provide: ProductService, useValue: productService },
          { provide: CartService, useValue: cartService }
        ]


    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on init', () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Product 1', price: 10, description: 'Product 1',
    category: 'Product 1',
    image: 'Product 1'},
    { id: 2, title: 'Product 2', price: 20, description: 'Product 2',
    category: 'Product 2',
    image: 'Product 2'}
    ];
    productService.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();

    expect(component.products).toEqual(mockProducts);
  });

  it('should add product to cart', () => {
    const mockProduct: Product = { id: 1, title: 'Product 1', price: 10, description: 'Product 1',
    category: 'Product 1',
    image: 'Product 1'};
    const mockQuantity = 2;

    component.addToCart(mockProduct, mockQuantity);

    expect(cartService.addToCart).toHaveBeenCalledWith(mockProduct, mockQuantity);
    expect(component.quantity).toEqual(1); // Verify quantity reset
  });

  it('should navigate to cart', () => {
    spyOn(component['router'], 'navigate');

    component.goToCart();

    expect(component['router'].navigate).toHaveBeenCalledWith(['/cart']);
  });
});
