import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './Components/table/table.component';
import { LoginComponent } from './Components/login/login.component';
import { CreateCustomerComponent } from './Components/create-customer/create-customer.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { CreateProductComponent } from './Components/create-product/create-product.component';
import { UpdateCustomerComponent } from './Components/update-customer/update-customer.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home/:idCustomer', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createAccount', component: CreateCustomerComponent },
  { path: 'home/:idCustomer/createProduct', component: CreateProductComponent },
  { path: 'home/:idCustomer/productList', component: TableComponent },
  { path: 'home/:idCustomer/updateCustomer', component: UpdateCustomerComponent },
  { path: 'home/:idCustomer/updateProduct/:idProduct', component: UpdateProductComponent, },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
