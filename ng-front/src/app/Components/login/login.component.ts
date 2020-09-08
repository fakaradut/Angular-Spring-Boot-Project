import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/customer.service';
import { Customer } from 'src/app/Models/Customer';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customer: Customer;
  id: string;

  constructor(
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.customer = new Customer();

  }

  onSubmit(): void {
    this.customerService.getCustomer(this.customer.name.trim(), this.customer.password)
      .subscribe(
        () => {
          this.customerService
            .getCustomer(this.customer.name, this.customer.password)
            .subscribe(c => {
              this.id = c.id + "";
          this.router.navigate([`home/${this.id}`]);   });


        },
        error => {
          console.error(error);
        }
      )
  }

  create(): void {
    this.router.navigate(['createAccount']);
  }
}
