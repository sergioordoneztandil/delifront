import { Component, OnInit } from '@angular/core';
import { WebService } from './../webservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUser } from './../current-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  spinnerIn;
  currentUser: CurrentUser;
  historial;
  panelOpenState = false;
  
  constructor(private spinner: NgxSpinnerService, private webService: WebService, private myRoute: Router) {
      this.spinnerIn = spinner;
  }

  ngOnInit() {
    this.getHistorial();
  }

  getHistorial() {
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');

    this.spinner.show();
    this.webService.getHistorial()
    .subscribe((historial: any[]) => {
        if (historial && historial['ko'] != null) {
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            localStorage.removeItem('expiryTimeDelibox');
            this.myRoute.navigate(['login']);
        }
        this.historial = historial;
        this.spinner.hide();
    });
  }

}
