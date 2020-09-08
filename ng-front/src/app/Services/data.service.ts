import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private idCustomer = new BehaviorSubject<string> ("");
  currentId = this.idCustomer.asObservable();

  private idPro = new BehaviorSubject <string>("");
  idProduct = this.idPro.asObservable();

  constructor() { }

  setIdSource(id: string) {
    this.idCustomer.next(id);
  }

  setIdProduct(id:string){
    this.idPro.next(id);
  }

}
