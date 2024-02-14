import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{

  public countries: Country[] = [];
  public term = '';

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byCountries.countries;
    this.term = this.countriesService.cacheStorage.byCountries.term;
  }

  searchByCountry( term: string ) {
    this.countriesService.searchCountry(term)
    .subscribe( countries => this.countries = countries);
  }

}
