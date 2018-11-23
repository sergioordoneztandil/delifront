import { Injectable } from '@angular/core';
import { Cesta } from './cesta';
import { CestaItem } from './cestaitem';
import { CurrentUser } from './current-user';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  constructor() { }

  agregarACesta(idMenu: number, menu: string, idPlato: number, plato: string, 
    idEmpleado: number, empleado: string, idSeccion: number, seccion: string, 
    cantidad: number, dia: string): void {
    let cestaItem = new CestaItem();
    cestaItem.idMenu = idMenu;
    cestaItem.menu = menu;
    cestaItem.idPlato = idPlato;
    cestaItem.plato = plato;
    cestaItem.idEmpleado = idEmpleado;
    cestaItem.empleado = empleado;
    cestaItem.idSeccion = idSeccion;
    cestaItem.seccion = seccion;
    cestaItem.cantidad = cantidad;
    cestaItem.dia = dia;

    if (localStorage.getItem('cesta') == null && cantidad > 0) {
      let cesta: Cesta = new Cesta();
      let currentUser: CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
      cesta.idUsuario = currentUser.id;
      cesta.idEmpresa = currentUser.cliente.id;
      cesta.fechaEntrega = '';
      cesta.items = [];
      cesta.items.push(cestaItem);
      localStorage.setItem('cesta', JSON.stringify(cesta));
    } else {
      let cesta: Cesta = JSON.parse(localStorage.getItem('cesta'));
      let index: number = -1;
      if(cesta.items) {
        for (let i = 0; i < cesta.items.length; i++) {
          let item: CestaItem = cesta.items[i];
          if (item.idPlato == cestaItem.idPlato && item.dia == cestaItem.dia) {
            index = i;
            break;
          }
        }
      }
      if (index == -1) {
        cesta.items.push(cestaItem); //cesta.items.push(JSON.stringify(cestaItem));
        localStorage.setItem('cesta', JSON.stringify(cesta));
      } else {
        let item: CestaItem = cesta.items[index];
        if (cantidad > 0) {
          item.cantidad = cantidad;
          cesta.items[index] = item;//JSON.stringify(item);
        } else if (cantidad == 0) {
          cesta.items.splice(index, 1);
        } else {
          item.cantidad += 1;
          cesta.items[index] = item;//JSON.stringify(item);
        }
        localStorage.setItem('cesta', JSON.stringify(cesta));
      }
    }
  }

  eliminarDeCesta(idPlato: number, dia: string): void {
    let cesta: Cesta = JSON.parse(localStorage.getItem('cesta'));
    for (let i = 0; i < cesta.items.length; i++) {
      let cestaItem: CestaItem = cesta.items[i];
      if (idPlato == cestaItem.idPlato && dia == cestaItem.dia) {
        cesta.items.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('cesta', JSON.stringify(cesta));
  }
}
