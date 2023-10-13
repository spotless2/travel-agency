import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelService} from "../../../../services/hotel.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.css']
})
export class HotelBookingComponent implements OnInit{
  //Form variables
  registerForm:any = FormGroup;
  submitted = false;
  suggestedLocations: any;
  private selectedLocation: any;
  constructor( private formBuilder: FormBuilder, private hotelService: HotelService, private router: Router, private route: ActivatedRoute){}
//Add user form actions
  query!: string;
  get f() { return this.registerForm.controls; }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value.ffrom = this.selectedLocation;
    //True if all the fields are filled
    if(this.submitted)
    {
      const queryParams = {
        // mandatory params
        destination: this.selectedLocation?.geoId,
        checkIn: this.registerForm.value.checkIn.toString(),
        checkOut: this.registerForm.value.checkOut.toString(),

        // optional params
        pageNumber: null,
        adults: this.registerForm.value.adults,
        sort: null,
        rooms: this.registerForm.value.rooms,
        currencyCode: null,
        priceMin: null,
        priceMax: null
      };

      // Check if mandatory parameters are filled
      if (!queryParams.destination || !queryParams.checkIn || !queryParams.checkOut) {
        // Handle the error, show a message to the user, or take appropriate action
        alert('Mandatory parameters are not filled.');
      } else {
        // Navigate to HotelListComponent with query parameters
        this.router.navigate(['/hotel-list'], { queryParams });
      }
    }

  }
  ngOnInit() {
    //Add form validations
    this.registerForm = this.formBuilder.group({
      ffrom: ['', [Validators.required]],
      rooms: ['', [Validators.required]],
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
      adults: ['', [Validators.required]],
      children: ['', [Validators.required]],
    });
    document.addEventListener('click', this.handleOutsideClick);

  }

  fetchSearchLocation(query: string) {
    if (query && query.length > 2) {
      this.hotelService.fetchLocationsBySearch(query).subscribe(
        (response: any) => {
          // Now you can access properties of the array
          this.suggestedLocations = response['data'];
          this.fixTitleAndGeoId()
          console.log(this.suggestedLocations)
        },
        (error) => {
          console.error("Error fetching locations:", error);
        }
      );
    }
  }

  fixTitleAndGeoId() {
    if (this.suggestedLocations && Array.isArray(this.suggestedLocations)) {
      this.suggestedLocations.forEach((location: { title: string; geoId: string; }) => {
        location.title = location.title.replace(/<\/?b>/g, ''); // Removes <b> and </b> tags

        if (location.geoId) {
          const parts = location.geoId.split(';'); // Split the string by semicolon
          if (parts.length > 2) {
            parts.shift(); // Remove the first element
            parts.pop();   // Remove the last element
            location.geoId = parts.join(';'); // Join the remaining parts
          }
        }
      });
    }
  }

  selectLocation(location: any) {
    this.query = location.title;
    this.selectedLocation = location;
    this.suggestedLocations = [];
  }

  handleOutsideClick = (event: any) => {
    const clickedElement = event.target;
    const dropdownElements = document.querySelectorAll('.locations-dropdown');

    dropdownElements.forEach((dropdownElement) => {
      if (!dropdownElement.contains(clickedElement)) {
        this.suggestedLocations = [];
      }
    });
  };
}
