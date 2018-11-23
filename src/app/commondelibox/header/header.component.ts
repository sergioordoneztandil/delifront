import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../../app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private myRoute: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

  historial() {
    this.myRoute.navigate(['historial']);
  }

  pedido() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser.tipo === 0) {
      this.myRoute.navigate(['products']);
    } else if(currentUser.tipo === 1) {
        this.myRoute.navigate(['products/empresa']);
    }
  }

}
