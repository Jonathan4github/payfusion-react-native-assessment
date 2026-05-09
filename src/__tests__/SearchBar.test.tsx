import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SearchBar } from '../components/SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder and current value', () => {
    const { getByTestId } = render(<SearchBar value="ghana" onChange={() => {}} />);
    const input = getByTestId('search-input');
    expect(input.props.value).toBe('ghana');
  });

  it('calls onChange when text changes', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<SearchBar value="" onChange={onChange} />);
    fireEvent.changeText(getByTestId('search-input'), 'nig');
    expect(onChange).toHaveBeenCalledWith('nig');
  });
});
