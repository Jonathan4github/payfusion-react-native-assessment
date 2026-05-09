import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { CountryCard } from '../components/CountryCard';
import type { Country } from '../types/country';

const ghana: Country = {
  countryId: '1',
  countryName: 'Ghana',
  countryCode: '+233',
  currency: 'Ghanaian cedi',
  currencyCode: 'GHS',
  currencyIcon: '₵',
  internetCountryCode: 'GH',
  flag: '🇬🇭',
};

describe('CountryCard', () => {
  it('renders country name, locale, and currency', () => {
    const { getByText } = render(<CountryCard country={ghana} />);
    expect(getByText('Ghana')).toBeTruthy();
    expect(getByText('GHS')).toBeTruthy();
    expect(getByText(/GH · \+233 · en-GH/)).toBeTruthy();
  });

  it('invokes onPress with the country', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<CountryCard country={ghana} onPress={onPress} />);
    fireEvent.press(getByTestId('country-GH'));
    expect(onPress).toHaveBeenCalledWith(ghana);
  });
});
