import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthServiceComponent) {
    console.log('Header constructor called');
  }

  ngOnInit(): void {
  }

  loginIn(): boolean {
    console.log('LogIn - ' + sessionStorage.getItem('username') + ' ?');
    return sessionStorage.getItem('username') !== null;
  }

  loginOut(): void {
    this.auth.logOut();
  }

  checkRole(): string {
    return sessionStorage.getItem('role');
  }
}
