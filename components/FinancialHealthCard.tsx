import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Shield } from 'lucide-react-native';
import { FinancialHealth } from '@/types';

const { width } = Dimensions.get('window');

interface FinancialHealthCardProps {
  financialHealth?: FinancialHealth | null;
}

export function FinancialHealthCard({ financialHealth }: FinancialHealthCardProps) {
  if (!financialHealth) {
    return (
      <View style={[styles.container, { backgroundColor: '#334155' }]}>
        <Text style={styles.loadingText}>Loading financial health...</Text>
      </View>
    );
  }

  const getHealthStatus = (score: number) => {
    if (score >= 800) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 600) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6', '#ec4899']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Financial Health Score</Text>
          <Text style={styles.subtitle}>{getHealthStatus(financialHealth.score)}</Text>
        </View>
        <Shield size={24} color="white" />
      </View>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{financialHealth.score}</Text>
        <View style={styles.scoreDetails}>
          <View style={styles.scoreItem}>
            <TrendingUp size={16} color={financialHealth.trend === 'up' ? '#22c55e' : '#ef4444'} />
            <Text style={[
              styles.scoreChange,
              { color: financialHealth.trend === 'up' ? '#22c55e' : '#ef4444' }
            ]}>
              {financialHealth.trend === 'up' ? '+' : ''}{financialHealth.change} this month
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{financialHealth.savingsRate}%</Text>
          <Text style={styles.metricLabel}>Savings Rate</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>${(financialHealth.emergencyFund / 1000).toFixed(1)}K</Text>
          <Text style={styles.metricLabel}>Emergency Fund</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{financialHealth.debtRatio}%</Text>
          <Text style={styles.metricLabel}>Debt Ratio</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    width: width - 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  score: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreDetails: {
    marginTop: 8,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  scoreChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  metricLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 4,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    padding: 40,
  },
});