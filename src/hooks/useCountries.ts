import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../api/countries';
import type { Country } from '../types/country';

export const COUNTRIES_QUERY_KEY = ['countries'] as const;

export function useCountries() {
  return useQuery({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: fetchCountries,
  });
}

export type CountryFilters = {
  search: string;
  currencyCode?: string;
};

export function filterCountries(countries: Country[], filters: CountryFilters): Country[] {
  const term = filters.search.trim().toLowerCase();
  return countries.filter((c) => {
    if (filters.currencyCode && c.currencyCode !== filters.currencyCode) return false;
    if (!term) return true;
    return (
      c.countryName.toLowerCase().includes(term) ||
      c.currencyCode.toLowerCase().includes(term) ||
      c.internetCountryCode.toLowerCase().includes(term) ||
      c.countryCode.toLowerCase().includes(term)
    );
  });
}
