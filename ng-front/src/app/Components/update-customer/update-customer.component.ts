import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Customer } from 'src/app/Models/Customer';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  customer: Customer = new Customer();
  update: boolean = false;
  idCustomer: number;
  constructor(
    private customerService: CustomerService,
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


  onUpdate(): void {
    console.log(this.customer.name)
    this.customerService.updateCustomer(this.idCustomer, this.customer)
      .subscribe(() => {
        this.router.navigate([`/home/${this.idCustomer}`]);
      }, error => console.log(error));
  }

  delete(): void {
    this.customerService.deleteCustomer(this.idCustomer)
      .subscribe(() => { this.router.navigate(['login']) },
        error => console.log(error));
  }

}
