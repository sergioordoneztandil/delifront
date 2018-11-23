import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommondeliboxModule } from './commondelibox/commondelibox.module';
import { MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CestaComponent } from './cesta/cesta.component';
import { HistorialComponent } from './historial/historial.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CestaComponent,
    HistorialComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CommondeliboxModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule
  ],
  providers: [
    /*{ provide: 'urlApiDT', useValue: 'http://delibox.localhost/app_dev.php/api/' }*/
    { provide: 'urlApiDT', useValue: 'http://test01.vanrec.com.ar/api/' }
    /*{ provide: 'urlApiDT', useValue: 'http://symfony4.localhost/index.php/api/' }*/

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
