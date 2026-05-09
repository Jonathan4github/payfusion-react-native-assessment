import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { theme } from '../theme';

type Props = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder ?? 'Search by name, code, currency'}
        placeholderTextColor={theme.colors.textMuted}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        accessibilityLabel="Search countries"
        testID="search-input"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
