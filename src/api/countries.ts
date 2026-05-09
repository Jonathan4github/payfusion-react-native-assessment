import { apiFetch } from './client';
import type { Country } from '../types/country';

type CountriesEnvelope =
  | Country[]
  | { data?: Country[]; countries?: Country[]; result?: Country[] };

export async function fetchCountries(): Promise<Country[]> {
  const raw = await apiFetch<CountriesEnvelope>('/countries');
  const list = Array.isArray(raw)
    ? raw
    : raw.data ?? raw.countries ?? raw.result ?? [];
  return list.filter((c): c is Country => !!c && typeof c.countryName === 'string');
}
