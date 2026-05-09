import React, { useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  type ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CountryCard } from '../components/CountryCard';
import { CurrencyChips } from '../components/CurrencyChips';
import { SearchBar } from '../components/SearchBar';
import { SelectedCountryBanner } from '../components/SelectedCountryBanner';
import { StateView } from '../components/StateView';
import { useAppContext } from '../context/AppContext';
import { filterCountries, useCountries } from '../hooks/useCountries';
import { theme } from '../theme';
import type { Country } from '../types/country';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Countries'>;

export const CountriesScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedCountry, selectCountry } = useAppContext();
  const [search, setSearch] = useState('');
  const [currencyCode, setCurrencyCode] = useState<string | undefined>(undefined);

  const { data, isLoading, isRefetching, isError, error, refetch } = useCountries();

  const currencyOptions = useMemo(() => {
    if (!data) return [];
    const set = new Set(data.map((c) => c.currencyCode));
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(
    () => (data ? filterCountries(data, { search, currencyCode }) : []),
    [data, search, currencyCode],
  );

  const onPressCountry = (country: Country) => {
    selectCountry(country);
    navigation.navigate('CountryDetail', { country });
  };

  const renderItem = ({ item }: ListRenderItemInfo<Country>) => (
    <CountryCard
      country={item}
      onPress={onPressCountry}
      selected={selectedCountry?.countryId === item.countryId}
    />
  );

  const showLoadingState = isLoading && !data;
  const showErrorState = isError && !data;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <SearchBar value={search} onChange={setSearch} />
        {currencyOptions.length > 0 && (
          <CurrencyChips
            options={currencyOptions}
            value={currencyCode}
            onChange={setCurrencyCode}
          />
        )}
        <SelectedCountryBanner />

        {showLoadingState ? (
          <StateView kind="loading" message="Loading countries…" />
        ) : showErrorState ? (
          <StateView
            kind="error"
            message={(error as Error)?.message}
            onRetry={() => refetch()}
          />
        ) : filtered.length === 0 ? (
          <StateView
            kind="empty"
            title="No matches"
            subtitle={
              search || currencyCode
                ? 'Try a different search or filter.'
                : 'No countries available.'
            }
          />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(c) => c.countryId ?? c.internetCountryCode}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            initialNumToRender={12}
            windowSize={10}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
                tintColor={theme.colors.accent}
                colors={[theme.colors.accent]}
              />
            }
            testID="countries-list"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1 },
  listContent: { paddingVertical: theme.spacing.sm, paddingBottom: theme.spacing.xxl },
});
