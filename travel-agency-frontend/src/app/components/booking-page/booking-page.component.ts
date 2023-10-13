import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {PaymentInfo} from "../../common/payment-info";
import {CheckoutService} from "../../services/checkout.service";

@Component({
  selector: 'app-book-flight',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit{
  flight: any;
  hotel: any;
  carObject: any;

  // initialize Stripe Api
  stripe = Stripe(environment.stripePublishableKey);

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";
  source: string | null | undefined;
  private totalPrice: number = 0;
  constructor(private route: ActivatedRoute, private router: Router, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    // setup Stripe payment form
    this.setupStripePaymentForm();
    this.source = this.route.snapshot.queryParamMap.get('source');

    if (this.source == "car") {
      this.carObject = {}; // Initialize the carObject here

      const rentalLocation = this.route.snapshot.queryParamMap.get('rentalLocation');
      this.carObject.location = rentalLocation ? this.capitalizeFirstLetter(rentalLocation) : null;

      const vehicleType = this.route.snapshot.queryParamMap.get('vehicleType');
      this.carObject.vehicleType = vehicleType ? this.capitalizeFirstLetter(vehicleType) : null;

      this.carObject.isEcoFriendly = this.route.snapshot.queryParamMap.get('isEcoFriendly');
      this.carObject.price = this.route.snapshot.queryParamMap.get('price');
    }



    // Get the flight data from the query parameters
    this.route.queryParams.subscribe(params => {
      if (params['flight']) {
        this.flight = JSON.parse(params['flight']);
        console.log(this.flight);
      }
      if (params['hotel']) {
        this.hotel = JSON.parse(params['hotel']);
        console.log(this.hotel);
      }
    });
  }

  proceedToPayment() {
    // compute payment info
    if (this.source == "flight") {
      this.totalPrice = this.flight.totalPrice
    } else if (this.source == "hotel") {
      this.totalPrice =  parseFloat(this.hotel.priceForDisplay.replace('$', ''));;
    }
    else if (this.source == "car") {
      this.totalPrice = this.carObject.price;
    }
    this.paymentInfo.amount = this.totalPrice * 100
    this.paymentInfo.currency = "USD";

    // if valid form then
    // - create payment intent
    // - confirm card payment
    // - place order

    if (this.displayError.textContent === "") {

      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement
              }
            }, { handleActions: false})
            .then((result: any) => {
              if (result.error) {
                // inform the customer there was an error
                alert(`There was an error: ${result.error.message}`);
              } else {
                // call REST API via the CheckoutService
                alert("You succesfully bought the item")
              }
            })
        }
      );
    } else {
      // markAllAsTouched();
      return;
    }
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  setupStripePaymentForm() {

    // get a handle to stripe elements
    var elements = this.stripe.elements();

    // Create a card element ... and hide the zip-code field
    this.cardElement = elements.create('card', { hidePostalCode: true});

    // Add an instance of card UI component into the 'card-element- div
    this.cardElement.mount('#card-element')


    // Add event binding for the 'change' event on the card element
    this.cardElement.on('change', (event: any) => {

      // get a handle to card-errors element
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = "";
      } else if (event.error) {
        // show validation error to the customer
        this.displayError.textContent = event.error.message;
      }
    })

  }
}
