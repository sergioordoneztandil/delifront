import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductListEmpresaComponent } from './product-list-empresa/product-list-empresa.component';
import { ProductsViewComponent } from './products-view/products-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent
  },
  {
    path: 'empresa',
    component: ProductListEmpresaComponent
  },
  {
    path: 'view',
    component: ProductsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
