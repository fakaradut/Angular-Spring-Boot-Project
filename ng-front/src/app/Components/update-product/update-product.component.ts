import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product = new Product();
  submit: boolean = false;
  idCustomer: number;
  idProduct: number;
  isProductExist: boolean;

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
          this.idProduct = +params['idProduct'];
          console.log(this.idCustomer);
          console.log(this.idProduct);
        }
      );

    this.productService.getProductById(this.idProduct)
      .subscribe(data => this.product = data,
        error => console.log(error));

    this.isProductExist = this.isProductExistControl();
    console.log(this.isProductExist)
  }

  onSubmit(): void {
    console.log("id customer"+this.idCustomer);
    this.product.idCustomer = this.idCustomer;
    this.productService.updateProduct(this.idProduct, this.product)
      .subscribe(
        () => {
          this.submit = true;
          this.router.navigate([`/home/${this.idCustomer}`]);
        },
        error => console.log(error)
      );
  }

  isProductExistControl(): boolean {
    return this.product === undefined || this.product === null;
  }

}
