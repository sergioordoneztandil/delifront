import { Injectable, Inject} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Menu } from './menu';
import { Plato } from './plato';
import { CurrentUser } from './current-user';
import { Cesta } from './cesta';
import { Periodo } from './periodo';
import { Empleado } from './empleado';
import { Seccion } from './seccion';

@Injectable({
  providedIn: 'root'
})
export class WebService {


    private logoutUrl;
    private currentUserUrl;
    private menuesUrl;
    private platosUrl;
    private enviarPedidorUrl;
    private empleadosUrl;
    private seccionesUrl;
    private periodoUrl;
    private historialUrl;

    constructor( private myRoute: Router, private http: HttpClient, @Inject('urlApiDT') urlBase: string) {
        this.currentUserUrl = urlBase + 'currentuser';
        this.logoutUrl = urlBase + 'logout';
        this.menuesUrl = urlBase + 'menues';
        this.platosUrl = urlBase + 'platos';
        this.enviarPedidorUrl = urlBase + 'enviarpedido';
        this.empleadosUrl = urlBase + 'empleados';
        this.seccionesUrl = urlBase + 'secciones';
        this.periodoUrl = urlBase + 'periodos';
        this.historialUrl = urlBase + 'historial';

    }

    logout(): Observable<Response> {
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      let data = {'email': email, 'token': token};
      let datajs = JSON.stringify(data);
      return this.http.post<Response>(this.logoutUrl, datajs).pipe(
        catchError(this.handleError('logout', null))
      );
    }

    getMenues(periodo): Observable<Menu[]> {
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      let data = {'email': email, 'token': token, 'periodo': periodo};
      let datajs = JSON.stringify(data);
      return this.http.post<Menu[]>(this.menuesUrl, datajs)
        .pipe(
            tap(response => {
            }),
            catchError(this.handleError('getMenues', null))
        );
    }

    getPlatos(menuId): Observable<Plato[]> {
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      let data = {'email': email, 'token': token, 'menuid': menuId};
      let datajs = JSON.stringify(data);
      return this.http.post<Plato[]>(this.platosUrl, datajs)
        .pipe(
            tap(response => {
            }),
            catchError(this.handleError('getPlatos', null))
        );
    }

    getEmpleados(clienteId): Observable<Empleado[]> {
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      let data = {'email': email, 'token':token, 'cliente': clienteId};
      let datajs = JSON.stringify(data);
      return this.http.post<Empleado[]>(this.empleadosUrl, datajs)
        .pipe(
            tap(response => {
            }),
            catchError(this.handleError('getEmpleados', null))
        );
    }

    getSecciones(clienteId): Observable<Seccion[]> {
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      let data = {'email': email, 'token':token, 'cliente': clienteId};
      let datajs = JSON.stringify(data);
      return this.http.post<Seccion[]>(this.seccionesUrl, datajs)
        .pipe(
            tap(response => {
            }),
            catchError(this.handleError('getSecciones', null))
        );
    }

    getPeriodos(): Observable<Periodo[]> {
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      let data = {'email': email, 'token':token};
      let datajs = JSON.stringify(data);
      return this.http.post<Periodo[]>(this.periodoUrl, datajs)
        .pipe(
            tap(response => {
            }),
            catchError(this.handleError('getPeriodos', null))
        );
    }

    getCurrentUser(): Observable<CurrentUser> {
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      let data = {'email': email, 'token': token};
      let datajs = JSON.stringify(data);
      return this.http.post<CurrentUser>(this.currentUserUrl, datajs)
        .pipe(
            tap(response => {
                if(response['result'] == 'KO') {
                    localStorage.clearAll();
                }
            }),
            catchError(this.handleError('getCurrentUser', null))
        );
    }

    enviarPedido(cesta: Cesta): Observable<CurrentUser> {
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      let data = {'email': email, 'token': token, cesta: cesta};
      let datajs = JSON.stringify(data);
      return this.http.post<any>(this.enviarPedidorUrl, datajs)
        .pipe(
            tap(response => {
            }),
            catchError(this.handleError('enviarPedido', null))
        );
    }

    getHistorial(): Observable<Menu[]> {
        let email = localStorage.getItem('email');
        let token = localStorage.getItem('token');
        let data = {'email': email, 'token': token};
        let datajs = JSON.stringify(data);
        return this.http.post<any[]>(this.historialUrl, datajs)
            .pipe(
                tap(response => {
                }),
                catchError(this.handleError('getHistorial', null))
            );
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('expiryTimeDelibox');
        this.myRoute.navigate(['login']);
        return of(result as T);
      };
    }
}

