import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../common/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = "http://localhost:8081/user/register";

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<object> {

    return this.httpClient.post(`${this.baseUrl}`, user);
  }
}
