import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppContext } from '../context/AppContext';
import { theme } from '../theme';

export const SelectedCountryBanner: React.FC = () => {
  const { selectedCountry, locale, selectCountry } = useAppContext();
  if (!selectedCountry) return null;
  return (
    <Animated.View entering={FadeInDown.duration(220)} style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.flag}>{selectedCountry.flag ?? '🏳️'}</Text>
        <View style={styles.textBlock}>
          <Text style={styles.label}>Active</Text>
          <Text style={styles.name} numberOfLines={1}>
            {selectedCountry.countryName} · {locale}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => selectCountry(null)}
        accessibilityRole="button"
        accessibilityLabel="Clear selected country"
        style={styles.clearBtn}
        testID="clear-selected"
      >
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
    minWidth: 0,
  },
  flag: { fontSize: 24 },
  textBlock: { flex: 1, minWidth: 0 },
  label: {
    color: theme.colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  name: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  clearBtn: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  clearText: {
    color: theme.colors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
});
