import { Component } from '@angular/core';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['../../../app.component.css']
})
export class SearchSectionComponent {
  selectedOption!: string;

  setOption(option: string): void {
    this.selectedOption = option;
  }
}
