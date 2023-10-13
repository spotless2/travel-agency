import { Injectable } from '@angular/core';
import {User} from "../common/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user!: User; // You can replace 'any' with a specific interface or class for user details

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}

