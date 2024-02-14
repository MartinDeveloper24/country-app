import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{
  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byCapital.countries;
  }

  searchByCapital( term: string ): void {
    this.countriesService.searchCapital( term )
    .subscribe( countries => {
      this.countries = countries;
    } );
  }
}
