import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { buildLocale, type Country } from '../types/country';

type AppContextValue = {
  selectedCountry: Country | null;
  locale: string;
  selectCountry: (country: Country | null) => void;
  setLocale: (locale: string) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const STORAGE_KEY = 'payfusion-app-prefs-v1';

type Persisted = {
  selectedCountry: Country | null;
  locale: string;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [locale, setLocaleState] = useState<string>('en');

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!mounted || !raw) return;
      try {
        const parsed = JSON.parse(raw) as Persisted;
        if (parsed.selectedCountry) setSelectedCountry(parsed.selectedCountry);
        if (parsed.locale) setLocaleState(parsed.locale);
      } catch {
        // ignore corrupt prefs
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback((next: Persisted) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const selectCountry = useCallback(
    (country: Country | null) => {
      setSelectedCountry(country);
      const nextLocale = country ? buildLocale(country) : locale;
      setLocaleState(nextLocale);
      persist({ selectedCountry: country, locale: nextLocale });
    },
    [locale, persist],
  );

  const setLocale = useCallback(
    (next: string) => {
      setLocaleState(next);
      persist({ selectedCountry, locale: next });
    },
    [selectedCountry, persist],
  );

  const value = useMemo<AppContextValue>(
    () => ({ selectedCountry, locale, selectCountry, setLocale }),
    [selectedCountry, locale, selectCountry, setLocale],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
