import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../Models/Product';
import { ProductService } from '../../Services/product.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  products$: Observable<Product[]>;
  private idProduct: number;
  private idCustomer: number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {


    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.idCustomer = +params['idCustomer'];

          console.log("Table: " + this.idCustomer);
        }
      );
    this.getProductList();
  }

  getProductList() {
    this.products$ = this.productService.getProducts(this.idCustomer);
  }

  deleteProduct(id: number) {
    console.log(id);
    this.productService.deleteProduct(id)
      .subscribe(() => { this.getProductList() }, error => console.log(console.error()

      ));
    this.getProductList();
  }

  updateProduct(id: number) {
    this.router.navigate([`home/${this.idCustomer}/updateProduct/${id}`]);
  }

}
