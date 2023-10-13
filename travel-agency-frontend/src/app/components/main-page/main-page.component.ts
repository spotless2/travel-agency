import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['../../app.component.css']
})
export class MainPageComponent {
  currentUser!: any;

  constructor(private userService: UserService, private loginService: LoginService, private router: Router) {
    const token = this.loginService.getToken();
    if (token) {
      // Decode the JWT token to extract user information
      this.currentUser = this.loginService.decodeToken(token);
    }
  }
  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login']);
  }
}



