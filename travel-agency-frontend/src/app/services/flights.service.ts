import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private baseUrl = 'http://localhost:8081'; // Update with your API URL
  constructor(private http: HttpClient) { }

  getFlights(departureCode: string, destinationCode: string, date: string) {
    const params = { departure: departureCode, destination: destinationCode, date: date };
    return this.http.get<any[]>(`${this.baseUrl}/flights`, { params });
  }
}
