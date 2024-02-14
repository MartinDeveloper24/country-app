import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStorage: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { selectedRegion: "", countries: [] },
  }

  constructor(private http: HttpClient) { }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of([])),
      // delay(1000)
    );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null ),
      catchError( () => of(null))
    );
  }


  searchCapital( capital: string ): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${capital}`)
    .pipe(
      tap( countries => this.cacheStorage.byCapital = { term: capital, countries: countries} )
    );
  }

  searchCountry( country: string ): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${country}`);
  }

  searchRegion( region: string ): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`);
  }

}
