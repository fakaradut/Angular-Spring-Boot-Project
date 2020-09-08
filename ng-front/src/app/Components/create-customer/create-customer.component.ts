import { Component, OnInit } from '@angular/core';
import { Customer } from '../../Models/Customer';
import { CustomerService } from '../../Services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customer: Customer;
  submit: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.submit = false;
    this.customer = new Customer();
  }

  onSubmit(): void {
    this.customerService.createCustomer(this.customer)
      .subscribe(() => {
        console.log("Customer created!");
        this.submit = true;
        this.router.navigate([`home/${this.customer.id}`]);
      }
        , error => console.log(error));
  }

}
