export type FlagURL = {
  png?: string;
  svg?: string;
  alt?: string;
};

export type Country = {
  countryId: string;
  countryName: string;
  countryCode: string;
  currency: string;
  currencyCode: string;
  currencyIcon: string;
  flag?: string;
  flagURL?: FlagURL;
  internetCountryCode: string;
};

export const buildLocale = (country: Pick<Country, 'internetCountryCode'>): string =>
  country.internetCountryCode ? `en-${country.internetCountryCode.toUpperCase()}` : 'en';
