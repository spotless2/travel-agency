import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../common/user";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8081/user';
  private jwtHelper: any;
  public user!: User;

  constructor(private httpClient: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  loginUser(user: User): Observable<any> {
    this.user = user;
    return this.httpClient.post(`${this.baseUrl}/login`, user);
  }

  // Save the JWT token in localStorage
  saveToken(token: string): void {
    console.log(token)
    localStorage.setItem('token', token);
  }

  // Retrieve the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  decodeToken(token: string): any {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken;
  }
}
