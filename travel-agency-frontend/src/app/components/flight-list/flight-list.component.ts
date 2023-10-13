import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlightsService} from "../../services/flights.service";

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit{
  flights: any[] = []; // Array to hold available flights
    showLegDetailsStates: boolean[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private flightService: FlightsService ) {}

  ngOnInit() {
    // Retrieve available flights from the service
    this.route.queryParams.subscribe(params => {
      const departure = params['departure'];
      const destination = params['destination'];
      const date = params['date'];

      // Call your API service to get flights based on criteria
      this.flightService.getFlights(departure, destination, date)
        .subscribe((response: any) => {
          this.flights = response.flightDetailsList; // Assuming the response is an array of flight objects
            this.flights.forEach(flight => {
              flight.arrivalDateTime = this.convertToReadableDate(flight.arrivalDateTime);
              flight.departureDateTime = this.convertToReadableDate(flight.departureDateTime);
              flight.totalPrice = this.getRandomPrice();
            })
        });
    });
    //   this.flights = JSON.parse(this.apiResponse).flightDetailsList;

      this.showLegDetailsStates = new Array(this.flights.length).fill(false);
  }

    convertToReadableDate(dateString: string): string {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        };

        return date.toLocaleString('en-US', options);
    }

  bookFlight(flight: any) {
      this.router.navigate(['/booking'], {
          queryParams: {
              source: 'flight', // Indicate that the source is the flight-list component
              flight: JSON.stringify(flight)
          }
      });
  }

    toggleFlightDetails(index: number): void {
        this.showLegDetailsStates[index] = !this.showLegDetailsStates[index];
    }

    goBack() {
        this.router.navigate(['/mainpage']);
    }

  private getRandomPrice() {
    // Generate a random number between 50 and 500
    return Math.floor(Math.random() * (500 - 50 + 1)) + 50;
  }
}
