import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PaymentInfo} from "../common/payment-info";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private paymentIntentUrl = environment.travelAgencyApiUrl + '/payment-intent'

  constructor(private httpClient: HttpClient) { }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }
}
