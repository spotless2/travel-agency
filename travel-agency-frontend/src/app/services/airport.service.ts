import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getAirports(query: string, limit: number) {
    const params = { q: query, limit: limit.toString() };
    return this.http.get<any[]>(`${this.baseUrl}/airports`, { params });
  }

}
