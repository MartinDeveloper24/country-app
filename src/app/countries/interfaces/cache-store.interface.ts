import { Country } from "./country";
import { Region } from "./region.type";

export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  selectedRegion?: Region;
  countries: Country[];
}

export interface CacheStore {
  byCapital:   TermCountries,
  byCountries: TermCountries,
  byRegion:    RegionCountries,
}
