import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchSectionComponent } from './components/sections/search-section/search-section.component';
import { ServicesSectionComponent } from './components/sections/services-section/services-section.component';
import { AboutSectionComponent } from './components/sections/about-section/about-section.component';
import { TeamSectionComponent } from './components/sections/team-section/team-section.component';
import { ContactSectionComponent } from './components/sections/contact-section/contact-section.component';
import { FooterComponent } from './components/sections/footer/footer.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FlightBookingComponent } from './components/sections/booking/flight-booking/flight-booking.component';
import { HotelBookingComponent } from './components/sections/booking/hotel-booking/hotel-booking.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {HttpClientModule} from "@angular/common/http";
import { UserRegisterComponent } from './components/user-register/user-register.component';
import {RouterModule, Routes} from "@angular/router";
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { BookingPageComponent } from './components/booking-page/booking-page.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import {ReplaceWidthHeightPipe} from "./pipes/replace-width-height.pipe";
import { CarRentalComponent } from './components/sections/booking/car-rental/car-rental.component';

const routes: Routes = [
  { path: 'register', component: UserRegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'mainpage', component: MainPageComponent },
  { path: 'flight-list', component: FlightListComponent },
  { path: 'hotel-list', component: HotelListComponent },
  { path: 'booking', component: BookingPageComponent },
  { path: '**', component: UserLoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchSectionComponent,
    ServicesSectionComponent,
    AboutSectionComponent,
    TeamSectionComponent,
    ContactSectionComponent,
    FooterComponent,
    FlightBookingComponent,
    HotelBookingComponent,
    UserLoginComponent,
    MainPageComponent,
    UserRegisterComponent,
    FlightListComponent,
    BookingPageComponent,
    HotelListComponent,
    ReplaceWidthHeightPipe,
    CarRentalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
