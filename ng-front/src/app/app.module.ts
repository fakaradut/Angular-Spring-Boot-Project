import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './Components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateProductComponent } from './Components/create-product/create-product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { CreateCustomerComponent } from './Components/create-customer/create-customer.component';
import { LoginComponent } from './Components/login/login.component';
import { UpdateCustomerComponent } from './Components/update-customer/update-customer.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CreateProductComponent,
    UpdateProductComponent,
    CreateCustomerComponent,
    LoginComponent,
    UpdateCustomerComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
