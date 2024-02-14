import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];
  public regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStorage.byRegion.selectedRegion;
  }

  searchByRegion( term: Region ) {
    this.selectedRegion = term;
    this.countriesService.searchRegion(term)
    .subscribe( countries => this.countries = countries);
  }

}
