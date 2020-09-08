import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  idCustomer;
  adresProduct;
  adresCreate;
  adresCustomer;
  adresHome;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.idCustomer = +params['idCustomer'];
          console.log(this.idCustomer);
        }
      );

    this.adresProduct = "/home/" + this.idCustomer + "/productList";
    this.adresCreate = "/home/" + this.idCustomer + "/createProduct";
    this.adresCustomer = "/home/" + this.idCustomer + "/updateCustomer";
    this.adresHome = "/home/" + this.idCustomer;
  }

}
