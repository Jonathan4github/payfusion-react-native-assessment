import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';

type LoadingProps = { kind: 'loading'; message?: string };
type ErrorProps = { kind: 'error'; message?: string; onRetry?: () => void };
type EmptyProps = { kind: 'empty'; title?: string; subtitle?: string };

export type StateViewProps = LoadingProps | ErrorProps | EmptyProps;

export const StateView: React.FC<StateViewProps> = (props) => {
  if (props.kind === 'loading') {
    return (
      <View style={styles.container} testID="state-loading">
        <ActivityIndicator size="large" color={theme.colors.accent} />
        <Text style={styles.subtitle}>{props.message ?? 'Loading…'}</Text>
      </View>
    );
  }
  if (props.kind === 'error') {
    return (
      <View style={styles.container} testID="state-error">
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.subtitle}>
          {props.message ?? 'We could not reach the server.'}
        </Text>
        {props.onRetry ? (
          <TouchableOpacity
            onPress={props.onRetry}
            style={styles.retryButton}
            accessibilityRole="button"
            accessibilityLabel="Retry"
          >
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
  return (
    <View style={styles.container} testID="state-empty">
      <Text style={styles.title}>{props.title ?? 'No countries found'}</Text>
      {props.subtitle ? <Text style={styles.subtitle}>{props.subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.accent,
  },
  retryText: {
    color: theme.colors.background,
    fontWeight: '700',
  },
});
