import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:4200/api/products/${id}`);
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:4200/api/products`);
  }
}
