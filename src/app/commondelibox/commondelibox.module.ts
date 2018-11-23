import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';
import {MatButtonModule} from '@angular/material';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    AlertModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    AlertComponent
  ],
  exports: [
     HeaderComponent,
     AlertComponent
   ]
})
export class CommondeliboxModule { }
