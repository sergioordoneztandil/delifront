import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { WebService } from './webservice.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private loginUrl;
    private productTypes = Array(
        ''
    );

    constructor(private myRoute: Router, private webService: WebService,
        private spinner: NgxSpinnerService, private http: HttpClient, @Inject('urlApiDT') urlBase: string) { 
            this.loginUrl = urlBase+'login';
    }

    login(email: string, password: string): Observable<Response> {
        var data = {'email':email, 'password': password};
        let datajs = JSON.stringify(data);
        this.spinner.show();
        return this.http.post<Response>(this.loginUrl, datajs).pipe(
            tap(response => {
                if (response['loginok'] != null) {
                    localStorage.setItem('email', response['email']);
                    localStorage.setItem('token', response['token']);
                    let expiryTime = new Date().getTime();
                    localStorage.setItem('expiryTimeDelibox', ''+expiryTime);
                    this.spinner.hide();
                    if(response['tipo'] === 0) {
                        this.myRoute.navigate(['products']);
                    } else {
                        this.myRoute.navigate(['products/empresa']);
                    }
                } else {
                    this.spinner.hide();
                }
            }),
          catchError(this.handleError('login', null))
        );
    }

    logout() {
        let email = localStorage.getItem("email");
        let token = localStorage.getItem("token");
        this.spinner.show();
        this.webService.logout()
        .subscribe((response: Response) => {
            if(response && response['logoutok'] != null) {
                localStorage.clear();
                this.myRoute.navigate(["login"]);
            }
            this.spinner.hide();
        });
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        localStorage.clear();
         this.myRoute.navigate(["login"]);
         return of(result as T);
        };
    }

    isLoggednIn() {
        let expiryTime = new Date().getTime();
        let millis = expiryTime - parseInt(localStorage.getItem("expiryTimeDelibox"));
        let minutes = Math.floor(millis / 60000);
        if(minutes > 40) {
            this.logout();
            return false;
        }
        return localStorage.getItem("token") !== null;
    }
}
