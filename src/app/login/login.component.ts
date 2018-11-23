import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebService } from './../webservice.service';
import { CurrentUser } from './../current-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form;
  alerts: any = [];
  spinnerIn;

  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService, 
    private spinner: NgxSpinnerService, 
    private webService: WebService) {
    this.spinnerIn = spinner;
    this.form = fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    localStorage.clear();
    this.spinner.hide();
  }

  login() {
    if (this.form.valid) {
        this.auth.login(this.form.value.email, this.form.value.password)
        .subscribe((response: Response) => {
            this.alerts = [
               {
                 type: 'danger',
                 msg: response['msg']
               }
             ];
             this.getCurrentUser();
        });
    }
  }

  logout() {
    this.auth.logout();
  }

  getCurrentUser() {
    this.spinner.show();
    this.webService.getCurrentUser()
    .subscribe((currentUser: CurrentUser) => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.spinner.hide();
    });
  }

}

