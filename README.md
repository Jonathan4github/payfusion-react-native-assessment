# PayFusion React Native Assessment

An Expo + TypeScript app that consumes the PayFusion public Countries API. It lists, searches, and filters countries; opens a detail view; and lets the user pick an "active" country to drive a dynamic locale.

## Stack

- Expo SDK 52 (managed workflow), React Native 0.76, React 18.3
- TypeScript (strict mode, `noUncheckedIndexedAccess`)
- React Navigation 7 (native stack)
- TanStack Query v5 + AsyncStorage persistence (offline cache)
- React Native Reanimated for entry animations
- Jest + React Native Testing Library

## API

Source: `https://api.payfonte.com/payfusion/public/v1/countries`

The API returns each country with `countryName`, `countryCode` (phone), `currency`, `currencyCode`, `currencyIcon`, `flag`, `internetCountryCode` (ISO alpha-2). The screen displays name, ISO code, currency, and a derived locale (`en-{ISO}`) — the API does not return a locale string directly.

## Setup

Requires Node 18+ and npm. iOS/Android development requires Xcode/Android Studio, or you can run on a device with the Expo Go app.

```bash
npm install
npm start            # Expo dev server (press i / a / w to launch)
npm run android      # build & run on Android device/emulator
npm run ios          # build & run on iOS simulator
npm run web          # web build
npm test             # run Jest tests
npm run typecheck    # TypeScript --noEmit
```

If `expo` is not on your PATH, prefix scripts with `npx` (e.g. `npx expo start`).

## Architecture

```
App.tsx                          # Providers: GestureHandler, SafeArea, QueryPersist, AppContext
index.ts                         # Expo entry point
src/
├── api/
│   ├── client.ts                # Typed fetch wrapper with timeout + ApiError
│   └── countries.ts             # Countries fetcher (tolerant of envelope shapes)
├── components/
│   ├── CountryCard.tsx          # List row, animated entry
│   ├── CurrencyChips.tsx        # Horizontal currency filter
│   ├── SearchBar.tsx            # Debounce-free, controlled input
│   ├── SelectedCountryBanner.tsx
│   └── StateView.tsx            # Loading / error (with retry) / empty
├── context/
│   └── AppContext.tsx           # Selected country + locale, persisted via AsyncStorage
├── hooks/
│   └── useCountries.ts          # React Query hook + pure filter helper
├── lib/
│   └── queryClient.ts           # QueryClient + AsyncStorage persister (7-day cache)
├── navigation/
│   └── RootNavigator.tsx        # Native stack: Countries → CountryDetail
├── screens/
│   ├── CountriesScreen.tsx      # List + search + filter + pull-to-refresh
│   └── CountryDetailScreen.tsx  # Full detail with Intl.NumberFormat sample
├── types/
│   └── country.ts               # Country type + buildLocale helper
├── theme.ts                     # Centralized tokens
└── __tests__/                   # Jest test suites
```

## Features

- **Countries list** — fetched via React Query, rendered with virtualised `FlatList`.
- **Loading / error / empty states** — `StateView` covers all three; errors offer a retry button.
- **Search** — case-insensitive match across name, currency code, ISO code, and phone code.
- **Currency filter** — horizontal chips, combinable with the search term (AND).
- **Country detail screen** — pushed via the stack; shows phone code, currency, symbol, locale, and a `Intl.NumberFormat`-formatted sample amount.
- **Active country switching** — tapping a country sets it as active, which updates the app-wide locale (`en-{ISO}`) and persists it across launches via AsyncStorage.
- **Offline caching** — `PersistQueryClientProvider` writes the React Query cache to AsyncStorage; the list paints instantly on relaunch and survives offline restarts (cache `maxAge` 7 days).
- **Pull-to-refresh** on the list.
- **Animations** — Reanimated `FadeIn` on cards, `FadeInUp/Down` on the detail hero and grid.
- **Tests** — pure filter logic, locale builder, API client error handling, `SearchBar`, and `CountryCard`.

## Type safety

Strict TypeScript with `noUncheckedIndexedAccess`. The API client returns typed payloads via generics; navigation params are typed through `RootStackParamList`.

## Notes

- Native asset files (`assets/icon.png`, `assets/splash.png`, etc.) are referenced in `app.json` but not committed — Expo will warn at startup; replace with project assets before publishing. Run `npx expo install --fix` if any package version drifts from your local Expo SDK.
- The "locale" requirement is interpreted as a derived BCP-47 string from `internetCountryCode` since the API does not return one. If a real locale field is added later, swap the derivation in `src/types/country.ts:buildLocale`.
