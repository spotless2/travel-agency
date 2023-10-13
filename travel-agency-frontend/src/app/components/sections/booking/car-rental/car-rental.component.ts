import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {
  rentalForm: any = FormGroup;
  submitted = false;
  carPrice: number = 0;
  ecoFriendlyCharge: number = 10;
  smallCarPrice: number = this.randomIntFromInterval(25, 50);
  familyCarPrice: number = this.randomIntFromInterval(75, 100);

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.rentalForm = this.formBuilder.group({
      location: ['', Validators.required],
      vehicleType: ['', Validators.required],
      ecoFriendly: [false]
    });


    this.rentalForm.get('vehicleType').valueChanges.subscribe(() => {
      this.updatePrice();
    });

    this.rentalForm.get('ecoFriendly').valueChanges.subscribe(() => {
      this.updatePrice();
    });
  }

  get r() { return this.rentalForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.rentalForm.invalid) {
      return;
    }

    // Implement your search logic here
    const location = this.rentalForm.value.location;
    const vehicleType = this.rentalForm.value.vehicleType;
    const ecoFriendly = this.rentalForm.value.ecoFriendly;

    const queryParams = {
      rentalLocation: location,
      vehicleType: vehicleType,
      isEcoFriendly: ecoFriendly,
      price: this.carPrice,
      source: "car"
    };

    // Navigate to FlightListComponent with query parameters
    this.router.navigate(['/booking'], { queryParams });
  }


  private updatePrice() {
    const vehicleType = this.rentalForm.get('vehicleType').value;
    const basePrice = vehicleType === 'small' ? this.smallCarPrice : this.familyCarPrice;
    const ecoFriendlyCharge = this.rentalForm.get('ecoFriendly').value ? this.ecoFriendlyCharge : 0;

    this.carPrice = basePrice + ecoFriendlyCharge;
  }

  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
