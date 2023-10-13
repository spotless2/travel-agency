import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  fetchLocationsBySearch(query: string) {
    const params = { query: query};
    return this.http.get<any[]>(`${environment.travelAgencyApiUrl}/search-location`, { params });
  }

  getHotels(params: any): Observable<any> {
    const apiUrl = `${environment.travelAgencyApiUrl}/hotels`; // Adjust the endpoint URL if necessary

    let httpParams = new HttpParams()
      .set('destination', params.destination)
      .set('checkIn', params.checkIn)
      .set('checkOut', params.checkOut);

    // Add other optional parameters if they are defined
    if (params.pageNumber) {
      httpParams = httpParams.set('pageNumber', params.pageNumber.toString());
    }
    if (params.adults) {
      httpParams = httpParams.set('adults', params.adults.toString());
    }
    if (params.rooms) {
      httpParams = httpParams.set('rooms', params.rooms.toString());
    }
    if (params.sort) {
      httpParams = httpParams.set('sort', params.sort);
    }
    if (params.currencyCode) {
      httpParams = httpParams.set('currencyCode', params.currencyCode);
    }
    if (params.priceMin) {
      httpParams = httpParams.set('priceMin', params.priceMin.toString());
    }
    if (params.priceMax) {
      httpParams = httpParams.set('priceMax', params.priceMax.toString());
    }

    return this.http.get(apiUrl, { params: httpParams });
  }
}
