import { Component, OnInit, Input } from '@angular/core';
import { WebService } from './../../webservice.service';
import { CestaService } from './../../cesta.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Menu } from './../../menu';
import { CurrentUser } from './../../current-user';
import { Cesta } from 'src/app/cesta';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  spinnerIn;
  menues;
  currentUser: CurrentUser;
  cesta: Cesta;
  cestaReference: any[];
  fechaEntrega: string;
  name = '';
  alerts: any = [];
  checked = false;
  minDate = new Date(2018, 10, 15);


  constructor( private spinner: NgxSpinnerService, private webService: WebService, 
    private myRoute: Router, private cestaService: CestaService) {
    this.spinnerIn = spinner;
  }

  ngOnInit() {
    this.getCurrentUser();
    this.cestaReference = [];
    this.getMenues();
    this.cargarCesta();
  }

  getMenues() {
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      this.spinner.show();
      this.webService.getMenues(0)
      .subscribe((menues: Menu[]) => {
          if (menues && menues['ko'] != null) {
              localStorage.removeItem('email');
              localStorage.removeItem('token');
              localStorage.removeItem('expiryTimeDelibox');
              this.myRoute.navigate(['login']);
          }
          this.menues = menues;
          this.spinner.hide();
      });
  }

  agregarACesta(idMenu, menu, idPlato, plato, idEmpleado, cantidad, dia) {
    this.cestaService.agregarACesta(idMenu, menu, idPlato, plato, idEmpleado, plato, null, '', cantidad, dia);
    this.cargarCesta();
  }
  eliminarDeCesta(idPlato: number, dia: string) {
    this.cestaService.eliminarDeCesta(idPlato, dia);
    this.cargarCesta();
  }
  cargarCesta() {
    this.cesta = JSON.parse(localStorage.getItem('cesta'));
    this.cestaReference = [];
    if (this.cesta != null) {
      for (let item of this.cesta.items) {
        this.cestaReference[item.idMenu + '_' + item.idPlato + '_' + item.dia] = item.cantidad;
      }
    }
  }

  enviarPedido() {
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    if (!this.fechaEntrega) {
      this.alerts = [
        {
          type: 'danger',
          msg: 'Seleccione una fecha de entrega'
        }
      ];
      return false;
    }
    this.spinner.show();
    this.cesta.fechaEntrega = this.fechaEntrega;
    this.webService.enviarPedido(this.cesta)
    .subscribe((respuesta: any) => {
        if (respuesta && respuesta['ko'] != null) {
            localStorage.clear();
            this.myRoute.navigate(['login']);
        }
        this.alerts = [
          {
            type: 'success',
            msg: 'Pedido enviado'
          }
        ];
        this.cestaReference = [];
        this.cesta = null;
        localStorage.removeItem('cesta');
        this.spinner.hide();
    });
  }

  getCurrentUser() {
    this.spinner.show();
    this.webService.getCurrentUser()
    .subscribe((currentUser: CurrentUser) => {
        this.currentUser = currentUser;
        this.minDate = currentUser.minDatePedido;//.date;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.spinner.hide();
    });
  }
}