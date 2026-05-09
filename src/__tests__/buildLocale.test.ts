import { buildLocale } from '../types/country';

describe('buildLocale', () => {
  it('builds en-XX from internet country code', () => {
    expect(buildLocale({ internetCountryCode: 'GH' })).toBe('en-GH');
  });

  it('uppercases lowercase codes', () => {
    expect(buildLocale({ internetCountryCode: 'ng' })).toBe('en-NG');
  });

  it('falls back to en when code is missing', () => {
    expect(buildLocale({ internetCountryCode: '' })).toBe('en');
  });
});
