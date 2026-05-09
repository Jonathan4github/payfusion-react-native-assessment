import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from '../context/AppContext';
import { buildLocale } from '../types/country';
import { theme } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryDetail'>;

export const CountryDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { country } = route.params;
  const { selectedCountry, selectCountry } = useAppContext();
  const isActive = selectedCountry?.countryId === country.countryId;
  const locale = buildLocale(country);

  const sampleAmount = 1250.5;
  let formattedAmount: string;
  try {
    formattedAmount = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: country.currencyCode,
    }).format(sampleAmount);
  } catch {
    formattedAmount = `${country.currencyIcon} ${sampleAmount.toFixed(2)}`;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.flag}>{country.flag ?? '🏳️'}</Text>
          <Text style={styles.name}>{country.countryName}</Text>
          <Text style={styles.subtitle}>
            {country.internetCountryCode} · {locale}
          </Text>
        </View>

        <View style={styles.grid}>
          <Detail label="Phone code" value={country.countryCode} />
          <Detail label="Currency" value={country.currency} />
          <Detail label="Currency code" value={country.currencyCode} />
          <Detail label="Symbol" value={country.currencyIcon} />
          <Detail label="Locale" value={locale} />
          <Detail label="Sample amount" value={formattedAmount} />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (isActive) {
              selectCountry(null);
            } else {
              selectCountry(country);
            }
            navigation.goBack();
          }}
          style={[styles.cta, isActive && styles.ctaActive]}
          accessibilityRole="button"
          testID="toggle-active"
        >
          <Text style={[styles.ctaText, isActive && styles.ctaTextActive]}>
            {isActive ? 'Clear active country' : 'Set as active country'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const Detail: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.cell}>
    <Text style={styles.cellLabel}>{label}</Text>
    <Text style={styles.cellValue} numberOfLines={2}>
      {value || '—'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.lg, gap: theme.spacing.lg },
  hero: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  flag: { fontSize: 64 },
  name: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginTop: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  cell: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cellLabel: {
    color: theme.colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  cellValue: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
  },
  cta: {
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
  },
  ctaActive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  ctaText: {
    color: theme.colors.background,
    fontWeight: '700',
    fontSize: 15,
  },
  ctaTextActive: {
    color: theme.colors.accent,
  },
});
