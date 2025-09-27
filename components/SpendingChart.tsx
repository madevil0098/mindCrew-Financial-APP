import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');
const chartWidth = (width - 60) / 2;

export function SpendingChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [2400, 2100, 2800, 2300, 2600, 2200],
        colors: [(opacity = 1) => `rgba(99, 102, 241, ${opacity})`],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.7,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Spending</Text>
      <Text style={styles.amount}>$2,240</Text>
      <Text style={styles.change}>-12% from last month</Text>
      
      <BarChart
        data={data}
        width={chartWidth - 20}
        height={120}
        yAxisLabel="$"
        yAxisSuffix="k"
        chartConfig={chartConfig}
        style={styles.chart}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        showValuesOnTopOfBars={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    padding: 16,
    width: chartWidth,
  },
  title: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 8,
  },
  amount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  change: {
    color: '#22c55e',
    fontSize: 12,
    marginBottom: 16,
  },
  chart: {
    marginLeft: -15,
  },
});