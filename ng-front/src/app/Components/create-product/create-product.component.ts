import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = new Product();
  submit: boolean = false;
  idCustomer: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(
      (params: Params) => {
        this.idCustomer = +params['idCustomer'];
        console.log(this.idCustomer);
      }
    );
  }

  onSubmit(): void {
    this.product.idCustomer=this.idCustomer;
    this.productService.createProduct(this.product, this.idCustomer)
      .subscribe(
        () => {
          this.submit = true;
          this.router.navigate([`/home/${this.idCustomer}/createProduct`]);
        },
        error => console.log(error)
      );
  }

}
