import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { AppComponent } from './app.component';
import { HistorialComponent } from './historial/historial.component';

const routes: Routes = [
    {
      path: 'customers',
      loadChildren: './customers/customers.module#CustomersModule',
      canActivate: [AuthGuardService]
    },
    {
      path: 'products',
      loadChildren: './products/products.module#ProductsModule',
      canActivate: [AuthGuardService]
    },
    {
      path: 'products/empresa',
      loadChildren: './products/products.module#ProductsModule',
      canActivate: [AuthGuardService]
    },
    {
      path: 'historial',
      component: HistorialComponent,
      canActivate: [AuthGuardService]
    },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: AppComponent, canActivate: [AuthGuardService] },
    { path: '', redirectTo: '/products', pathMatch: 'full', canActivate: [AuthGuardService] },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ CommonModule, RouterModule.forRoot(routes) ]
})

export class AppRoutingModule {}