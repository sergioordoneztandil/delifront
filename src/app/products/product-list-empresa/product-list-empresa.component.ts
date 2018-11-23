import { Component, OnInit } from '@angular/core';
import { WebService } from './../../webservice.service';
import { CestaService } from './../../cesta.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Menu } from './../../menu';
import { Plato } from './../../plato';
import { CurrentUser } from './../../current-user';
import { Cesta } from 'src/app/cesta';
import { Periodo } from 'src/app/periodo';
import { Empleado } from 'src/app/empleado';
import { Seccion } from './../../seccion';

@Component({
  selector: 'app-product-list-empresa',
  templateUrl: './product-list-empresa.component.html',
  styleUrls: ['./product-list-empresa.component.css']
})
export class ProductListEmpresaComponent implements OnInit {

  spinnerIn;
  menues: Menu[];
  platos: Plato[];
  empleados: Empleado[];
  secciones: Seccion[];
  periodos: Periodo[];
  currentUser: CurrentUser;
  cesta: Cesta;
  cestaReferenceEmpresa: any[];
  fechaEntrega: string;
  name = '';
  alerts: any = [];
  currentEmployee;
  currentSeccion;
  currentDay;
  currentMenu;
  currentPlato;
  tiposSeleccion = [{id: 0, nombre: 'Empleados'}, {id: 1, nombre: 'Secciones'}];
  selectedPeriodo;
  selectedTipo;

  constructor(private spinner: NgxSpinnerService, private webService: WebService,
    private myRoute: Router, private cestaService: CestaService) {
      this.spinnerIn = spinner;
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getMenues(0);
    this.getPeriodos();
    this.cestaReferenceEmpresa = [];
    this.selectedTipo = 0;
    this.selectedPeriodo = 2;
    this.secciones = [];
    this.empleados = [];
  }

  getMenues(periodo) {
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    this.spinner.show();
    this.webService.getMenues(periodo)
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

  getPlatos() {
    if(this.currentEmployee != null && this.currentDay != null && this.currentMenu != null ) {
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      this.spinner.show();
      this.webService.getPlatos(this.currentMenu)
      .subscribe((platos: Plato[]) => {
          if (platos && platos['ko'] != null) {
              localStorage.removeItem('email');
              localStorage.removeItem('token');
              localStorage.removeItem('expiryTimeDelibox');
              this.myRoute.navigate(['login']);
          }
          this.platos = platos;
          this.spinner.hide();
      });
    }
  }

  getEmpleados() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    this.spinner.show();

    this.webService.getEmpleados(this.currentUser.cliente.id)
    .subscribe((empleados: Empleado[]) => {
        if (empleados && empleados['ko'] != null) {
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            localStorage.removeItem('expiryTimeDelibox');
            this.myRoute.navigate(['login']);
        }
        this.empleados = empleados;
        this.spinner.hide();
    });

  }

  getSecciones() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    this.spinner.show();

    this.webService.getSecciones(this.currentUser.cliente.id)
    .subscribe((secciones: Seccion[]) => {
        if (secciones && secciones['ko'] != null) {
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            localStorage.removeItem('expiryTimeDelibox');
            this.myRoute.navigate(['login']);
        }
        this.secciones = secciones;
        this.spinner.hide();
    });

  }

  getPeriodos() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    this.spinner.show();

    this.webService.getPeriodos()
    .subscribe((periodos: Periodo[]) => {
        if (periodos && periodos['ko'] != null) {
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            localStorage.removeItem('expiryTimeDelibox');
            this.myRoute.navigate(['login']);
        }
        this.periodos = periodos;
        this.spinner.hide();
    });

  }

  getCurrentUser() {
    this.spinner.show();
    this.webService.getCurrentUser()
    .subscribe((currentUser: CurrentUser) => {
        this.currentUser = currentUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.getEmpleados();
        this.spinner.hide();
    });
  }

  enviarPedido() {
    if (!this.fechaEntrega) {
      this.alerts = [
        {
          type: 'danger',
          msg: 'Seleccione una fecha de entrega'
        }
      ];
      return false;
    }

    let cesta = new Cesta();
    cesta.idUsuario = this.currentUser.id;
    cesta.idEmpresa = this.currentUser.cliente.id;
    cesta.fechaEntrega = this.fechaEntrega;

    let employees = Object.keys(this.cestaReferenceEmpresa);
    let isEmpresa = true;
    if (this.secciones.length > 0) {
      isEmpresa = false;
    }
    for (let employee of employees) {
      let days = Object.keys(this.cestaReferenceEmpresa[employee]);
      for (let day of days) {
        let tipos = Object.keys(this.cestaReferenceEmpresa[employee][day]);
        for (let tipo of tipos) {
          let platos = Object.keys(this.cestaReferenceEmpresa[employee][day][tipo]);
          for (let plato of platos) {
            let valueEmpresa = employee;
            let valueSeccion = null;
            if (!isEmpresa) {
              valueEmpresa = null;
              valueSeccion = employee;
            }
            if (this.cestaReferenceEmpresa[employee][day][tipo][plato]) {
              this.cestaService.agregarACesta(this.currentMenu, '', 
                  Number(plato), 
                  '', Number(valueEmpresa), '', Number(valueSeccion), '', 
                  this.cestaReferenceEmpresa[employee][day][tipo][plato], day
                  );
            }
          }
        }
      }
    }
    this.cargarCesta();

    this.spinner.show();
    this.cesta.fechaEntrega = this.fechaEntrega;
    this.webService.enviarPedido(this.cesta)
    .subscribe((respuesta: any) => {
        if (respuesta && respuesta['ko'] != null) {
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            localStorage.removeItem('expiryTimeDelibox');
            this.myRoute.navigate(['login']);
        }
        this.alerts = [
          {
            type: 'success',
            msg: 'Pedido enviado'
          }
        ];
        this.clearData();
        this.spinner.hide();
    });
  }

  public selectEmployee(event: any, item: any) {
    this.currentPlato = null;
    this.currentEmployee = item;
    this.getPlatos();
  }

  public selectSeccion(event: any, item: any) {
    this.currentPlato = null;
    this.currentEmployee = item;
    this.getPlatos();
  }

  public selectDay(event: any, item: any, menuId) {
    this.currentPlato = null;
    this.currentDay = item;
    this.currentMenu = menuId;
    this.getPlatos();
  }

  public selectPlato(event: any, item: any, cantidad, tipo) {
    this.currentPlato = item;
    if (!this.cestaReferenceEmpresa[this.currentEmployee]) {
      this.cestaReferenceEmpresa[this.currentEmployee] = [];
    }
    if (!this.cestaReferenceEmpresa[this.currentEmployee][this.currentDay]) {
      this.cestaReferenceEmpresa[this.currentEmployee][this.currentDay] = [];
    }
    if (this.secciones.length > 0) {
      /* repite this.currentPlato en lugar de tipo */
      this.cestaReferenceEmpresa[this.currentEmployee][this.currentDay][this.currentPlato] = [];
      this.cestaReferenceEmpresa[this.currentEmployee][this.currentDay][this.currentPlato][this.currentPlato] = cantidad;
    } else {
      this.cestaReferenceEmpresa[this.currentEmployee][this.currentDay][tipo] = [];
      this.cestaReferenceEmpresa[this.currentEmployee][this.currentDay][tipo][this.currentPlato] = cantidad;
    }
  }

  public changeTipo(event: any) {
    this.clearData();
    this.secciones = [];
    this.empleados = [];
    if (event === 0) {
      this.getEmpleados();
    } else {
      this.getSecciones();
    }
  }

  public changePeriodo(event: any) {
    this.clearData();
    this.getMenues(event);
  }

  public clearData() {
    this.currentSeccion = [];
    this.currentEmployee = [];
    this.platos = [];
    this.cesta = null;
    localStorage.removeItem('cesta');
    this.cestaReferenceEmpresa = [];
    this.currentDay = '';
    this.currentMenu = '';
    this.currentPlato = '';
  }
  public cargarCesta() {
    this.cesta = JSON.parse(localStorage.getItem('cesta'));
  }

}
