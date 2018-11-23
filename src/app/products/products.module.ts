import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { CommondeliboxModule } from './../commondelibox/commondelibox.module';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatNativeDateModule, MatDatepickerModule, MatFormFieldModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProductListEmpresaComponent } from './product-list-empresa/product-list-empresa.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    ProductsRoutingModule,
    NgxSpinnerModule,
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    CommondeliboxModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [
    ProductsListComponent,
    ProductsViewComponent,
    ProductListEmpresaComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ProductsModule { }
