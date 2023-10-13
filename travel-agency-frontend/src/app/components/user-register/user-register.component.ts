import { Component } from '@angular/core';
import {User} from "../../common/user";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  user: User = new User();

  constructor(private registerService: RegisterService, private router: Router) {
  }

  userRegister() {
    console.log(this.user)
    this.registerService.registerUser(this.user).subscribe(data => {
      alert('Register successfully');
      this.redirectToLogin();
    }, error => {
      alert('Incorrect credentials, please try again');
    })
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
