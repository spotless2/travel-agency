import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlightsService} from "../../services/flights.service";
import {HotelService} from "../../services/hotel.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit{

  constructor(private route: ActivatedRoute, private router: Router, private hotelService: HotelService) {
  }
  hotels: any;
  ngOnInit(): void {
    // Retrieve available hotels from the service
    this.route.queryParams.subscribe(params => {
      const destination = params['destination'];
      const checkIn = params['checkIn'];
      const checkOut = params['checkOut'];

      this.hotelService.getHotels(params).subscribe(response => {
        this.hotels = response.data.data;
        this.hotels.forEach((hotel: { checkIn: any; checkOut: any; }) => {
          hotel.checkIn = checkIn;
          hotel.checkOut = checkOut;
        })
      });

  });
}

  goBack() {
    this.router.navigate(['/mainpage']);
  }

  bookHotel(hotel: any) {
    this.router.navigate(['/booking'], {
      queryParams: {
        source: 'hotel', // Indicate that the source is the hotel-list component
        hotel: JSON.stringify(hotel)
      }
    });
  }
}
