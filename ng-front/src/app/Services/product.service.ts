import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,of } from 'rxjs';
import { Product } from '../Models/Product';
import { catchError ,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getProducts(customerId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/${customerId}/products`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${productId}`)
    .pipe(
      tap( _ => console.log("fetched product")),
      catchError(this.handleError<Product>("failed to get product")  )
    );
  }
  createProduct(product: Product, customerId: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/product/${customerId}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/product/delete/${id}`, { responseType: 'text' });
  }

  updateProduct(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/product/update/${id}`, value);
  }

  patchProduct(id: number, value: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/product/${id}`, value);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`)
      return of(result as T);
    };
  }

}
