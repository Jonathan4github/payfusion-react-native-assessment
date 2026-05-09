import { filterCountries } from '../hooks/useCountries';
import type { Country } from '../types/country';

const make = (over: Partial<Country>): Country => ({
  countryId: 'id',
  countryName: 'Country',
  countryCode: '+1',
  currency: 'Dollar',
  currencyCode: 'USD',
  currencyIcon: '$',
  internetCountryCode: 'US',
  ...over,
});

const sample: Country[] = [
  make({ countryId: '1', countryName: 'Ghana', currencyCode: 'GHS', internetCountryCode: 'GH', countryCode: '+233' }),
  make({ countryId: '2', countryName: 'Nigeria', currencyCode: 'NGN', internetCountryCode: 'NG', countryCode: '+234' }),
  make({ countryId: '3', countryName: 'Angola', currencyCode: 'AOA', internetCountryCode: 'AO', countryCode: '+244' }),
  make({ countryId: '4', countryName: 'Global', currencyCode: 'USD', internetCountryCode: 'GL', countryCode: '+0' }),
];

describe('filterCountries', () => {
  it('returns all when search is empty and no currency filter', () => {
    expect(filterCountries(sample, { search: '' })).toHaveLength(4);
  });

  it('matches by country name (case-insensitive)', () => {
    const r = filterCountries(sample, { search: 'gha' });
    expect(r).toHaveLength(1);
    expect(r[0]!.countryName).toBe('Ghana');
  });

  it('matches by currency code', () => {
    const r = filterCountries(sample, { search: 'NGN' });
    expect(r.map((c) => c.countryName)).toEqual(['Nigeria']);
  });

  it('matches by ISO internet code', () => {
    const r = filterCountries(sample, { search: 'ao' });
    expect(r.map((c) => c.countryName)).toEqual(['Angola']);
  });

  it('matches by phone code', () => {
    const r = filterCountries(sample, { search: '+234' });
    expect(r.map((c) => c.countryName)).toEqual(['Nigeria']);
  });

  it('applies currency filter independently of search', () => {
    const r = filterCountries(sample, { search: '', currencyCode: 'USD' });
    expect(r.map((c) => c.countryName)).toEqual(['Global']);
  });

  it('combines search and currency filter (AND)', () => {
    const r = filterCountries(sample, { search: 'global', currencyCode: 'GHS' });
    expect(r).toHaveLength(0);
  });

  it('returns empty for non-matching search', () => {
    expect(filterCountries(sample, { search: 'xyz' })).toEqual([]);
  });
});
