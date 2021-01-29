import {Component, OnInit} from '@angular/core';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthServiceComponent) {
  }

  ngOnInit(): void {
  }

  loginIn(): boolean {
    return sessionStorage.getItem('username') !== null;
  }

  loginOut(): void {
    this.auth.logOut();
  }

  checkRole(): string {
    return sessionStorage.getItem('role');
  }

  checkAdmin(): boolean {
    return sessionStorage.getItem('role') === 'ADMIN';
  }
}
