import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from './product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected products', () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Product 1', price: 10, description: 'Product 1',
      category: 'Product 1',
      image: 'Product 1'},
      { id: 2, title: 'Product 2', price: 20, description: 'Product 2',
      category: 'Product 2',
      image: 'Product 2'}
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const request = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(request.request.method).toBe('GET');
    request.flush(mockProducts);
  });

});
