import { NgModule } from '@angular/core';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';


@NgModule({
  imports: [
    CustomersRoutingModule,
  ],
  declarations: [CustomerListComponent]
})
export class CustomersModule { }
