import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Customer } from '../Models/Customer';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = "http://localhost:8080/api/customer";

  constructor(private http: HttpClient) { }

  createCustomer(customer: Customer): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, customer);
  }

  getCustomer(username: string, password: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${username}/${password}`)
    .pipe(tap(_ => console.log(`customer${username} fetched succesfully `)),
    catchError(this.handleError<Customer>(`customer not found`))
  );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`)
      return of(result as T);
    };
  }

  updateCustomer(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

}
