import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AirportService} from "../../../../services/airport.service";
import {Airport} from "../../../../common/airport";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit{

  //Form variables
  registerForm:any = FormGroup;
  submitted = false;

  toQuery!: string;
  fromQuery!: string;
  suggestedFromAirports: Airport[] = [];
  suggestedToAirports: Airport[] = [];
  selectedFromAirport: any;
  selectedToAirport: any;

  constructor( private formBuilder: FormBuilder, private airportService: AirportService, private router: Router, private route: ActivatedRoute){ }

  //Add user form actions
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value.ffrom = this.selectedFromAirport;
    this.registerForm.value.fto = this.selectedToAirport;
    //True if all the fields are filled
    if(this.submitted)
    {
      console.log(this.selectedFromAirport?.iata)
      console.log(this.selectedToAirport?.iata)
      const queryParams = {
        departure: this.selectedFromAirport?.iata,
        destination: this.selectedToAirport?.iata,
        date: this.registerForm.value.dparting.toString()
      };

      // Navigate to FlightListComponent with query parameters
      this.router.navigate(['/flight-list'], { queryParams });
    }
    let departure = this.selectedToAirport?.code;
    let destination = this.selectedFromAirport?.code;
    let date = this.registerForm.value.dparting.toString();


  }
  ngOnInit() {
    //Add form validations
    this.registerForm = this.formBuilder.group({
      ffrom: ['', [Validators.required]],
      fto: ['', [Validators.required]],
      dparting: ['', [Validators.required]],
      returning: ['', [Validators.required]],
      adults: ['', [Validators.required]],
      children: ['', [Validators.required]],
      travel: ['', [Validators.required]],
    });

    document.addEventListener('click', this.handleOutsideClick);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event: any) => {
    const clickedElement = event.target;
    const dropdownElements = document.querySelectorAll('.airport-dropdown');

    dropdownElements.forEach((dropdownElement) => {
      if (!dropdownElement.contains(clickedElement)) {
        this.suggestedFromAirports = [];
        this.suggestedToAirports = [];
      }
    });
  };

  fetchFromAirports(query: string) {
    if (query && query?.length > 2) {
      this.airportService.getAirports(query, 10).subscribe(
        (response: Airport[]) => {
          this.suggestedFromAirports = response;
        },
        (error) => {
          console.error('Error fetching airports:', error);
        }
      );
    }
  }
  fetchToAirports(query: string) {
    if (query && query?.length > 2) {
      this.airportService.getAirports(query, 10).subscribe(
        (response: Airport[]) => {
          this.suggestedToAirports = response;
        },
        (error) => {
          console.error('Error fetching airports:', error);
        }
      );
    }
  }

  selectFromAirport(airport: Airport) {
    this.fromQuery = airport.name;
    this.selectedFromAirport = airport;
    this.suggestedFromAirports = [];
  }

  selectToAirport(airport: Airport) {
    this.toQuery = airport.name;
    this.selectedToAirport = airport;
    this.suggestedToAirports = [];
  }
}
