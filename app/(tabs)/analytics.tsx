import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Analytics() {
  const spendingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [2400, 2100, 2800, 2300, 2600, 2200],
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const categoryData = [
    { name: 'Food', population: 35, color: '#f59e0b', legendFontColor: '#94a3b8' },
    { name: 'Transport', population: 20, color: '#ef4444', legendFontColor: '#94a3b8' },
    { name: 'Shopping', population: 25, color: '#6366f1', legendFontColor: '#94a3b8' },
    { name: 'Bills', population: 15, color: '#8b5cf6', legendFontColor: '#94a3b8' },
    { name: 'Other', population: 5, color: '#22c55e', legendFontColor: '#94a3b8' },
  ];

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <LinearGradient
      colors={['#1a1b3e', '#0f172a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Analytics</Text>
            <Text style={styles.subtitle}>Your financial insights</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: '#22c55e20' }]}>
              <TrendingUp size={20} color="#22c55e" />
              <Text style={styles.statValue}>+12.5%</Text>
              <Text style={styles.statLabel}>Income Growth</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#ef444420' }]}>
              <TrendingDown size={20} color="#ef4444" />
              <Text style={styles.statValue}>-8.2%</Text>
              <Text style={styles.statLabel}>Expense Reduction</Text>
            </View>
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <DollarSign size={20} color="#6366f1" />
              <Text style={styles.chartTitle}>Spending Trend</Text>
            </View>
            <LineChart
              data={spendingData}
              width={width - 60}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <PieChartIcon size={20} color="#8b5cf6" />
              <Text style={styles.chartTitle}>Expense Categories</Text>
            </View>
            <PieChart
              data={categoryData}
              width={width - 60}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          </View>

          <View style={styles.insightsCard}>
            <Text style={styles.insightsTitle}>AI-Generated Insights</Text>
            <View style={styles.insightsList}>
              <Text style={styles.insight}>• You spent 15% less on dining out compared to last month</Text>
              <Text style={styles.insight}>• Your transportation costs are 20% below average</Text>
              <Text style={styles.insight}>• Consider increasing your emergency fund by $200/month</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  chartTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  chart: {
    borderRadius: 16,
  },
  insightsCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 100,
  },
  insightsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  insightsList: {
    gap: 8,
  },
  insight: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
});