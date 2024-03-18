import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../cart.service';
import { Product } from '../product';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    cartService = jasmine.createSpyObj('CartService', ['getItems', 'removeFromCart', 'updateQuantity']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule
      ],
      providers: [
        { provide: CartService, useValue: cartService },
        CurrencyPipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should remove item from cart', () => {
    const mockItem = { product: {  id: 1, title: 'Product 1', price: 10, description: 'Product 1',
    category: 'Product 1',
    image: 'Product 1' }, quantity: 2 };

    component.removeFromCart(mockItem);

    expect(cartService.removeFromCart).toHaveBeenCalledWith(mockItem.product);
  });

  it('should update quantity of item', () => {
    const mockItem = { product: {  id: 1, title: 'Product 1', price: 10, description: 'Product 1',
    category: 'Product 1',
    image: 'Product 1' }, quantity: 2 };
    const newQuantity = 3;

    component.updateQuantity(mockItem, newQuantity);

    expect(mockItem.quantity).toEqual(newQuantity);
    expect(cartService.updateQuantity).toHaveBeenCalledWith(mockItem.product, newQuantity);
  });


});
