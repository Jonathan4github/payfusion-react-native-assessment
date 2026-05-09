import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { buildLocale, type Country } from '../types/country';
import { theme } from '../theme';

type Props = {
  country: Country;
  onPress?: (country: Country) => void;
  selected?: boolean;
};

export const CountryCard: React.FC<Props> = ({ country, onPress, selected }) => {
  const locale = buildLocale(country);
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => onPress?.(country)}
        activeOpacity={0.85}
        style={[styles.card, selected && styles.cardSelected]}
        accessibilityRole="button"
        accessibilityLabel={`${country.countryName}, currency ${country.currencyCode}`}
        testID={`country-${country.internetCountryCode}`}
      >
        <Text style={styles.flag}>{country.flag ?? '🏳️'}</Text>
        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={1}>
            {country.countryName}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {country.internetCountryCode} · {country.countryCode} · {locale}
          </Text>
        </View>
        <View style={styles.currencyBlock}>
          <Text style={styles.currencyCode}>{country.currencyCode}</Text>
          <Text style={styles.currencyIcon}>{country.currencyIcon}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  cardSelected: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.surfaceAlt,
  },
  flag: {
    fontSize: 28,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  currencyBlock: {
    alignItems: 'flex-end',
  },
  currencyCode: {
    color: theme.colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  currencyIcon: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
});
