import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

type Props = {
  options: string[];
  value?: string;
  onChange: (next: string | undefined) => void;
};

export const CurrencyChips: React.FC<Props> = ({ options, value, onChange }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.scroll}
    >
      <Chip
        label="All"
        active={!value}
        onPress={() => onChange(undefined)}
        testID="chip-all"
      />
      {options.map((opt) => (
        <Chip
          key={opt}
          label={opt}
          active={value === opt}
          onPress={() => onChange(opt === value ? undefined : opt)}
          testID={`chip-${opt}`}
        />
      ))}
    </ScrollView>
  );
};

const Chip: React.FC<{ label: string; active: boolean; onPress: () => void; testID?: string }> = ({
  label,
  active,
  onPress,
  testID,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, active && styles.chipActive]}
    accessibilityRole="button"
    accessibilityState={{ selected: active }}
    testID={testID}
  >
    <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  row: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
    minHeight: 36,
    borderRadius: 999,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  chipLabel: {
    color: theme.colors.textMuted,
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 18,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  chipLabelActive: {
    color: theme.colors.background,
  },
});
