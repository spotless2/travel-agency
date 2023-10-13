import { Component } from '@angular/core';
import {User} from "../../common/user";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  user: User = new User();
  loginState!: boolean;

  constructor(private loginService: LoginService, private userService: UserService, private router: Router) {
  }

  userLogin() {
    this.loginService.loginUser(this.user).subscribe((response: any) => {
      // Save the token and redirect to the main page
      this.loginService.saveToken(response.token);
      this.redirectToMainPage();
    }, error => {
      alert('Incorrect credentials, please try again');
    })
  }

  redirectToMainPage() {
      this.router.navigate(['/mainpage']);
  }

  redirectToRegister() {
    this.router.navigate(['/register']);

  }
}
