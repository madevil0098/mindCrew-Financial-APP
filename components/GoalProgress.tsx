import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Target } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const chartWidth = (width - 60) / 2;

export function GoalProgress() {
  const goals = [
    { name: 'Emergency Fund', progress: 0.75, amount: '$7,500', target: '$10,000' },
    { name: 'Vacation', progress: 0.45, amount: '$1,350', target: '$3,000' },
    { name: 'Investment', progress: 0.60, amount: '$6,000', target: '$10,000' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Target size={16} color="#94a3b8" />
        <Text style={styles.title}>Goals Progress</Text>
      </View>
      
      <View style={styles.goalsList}>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalName}>{goal.name}</Text>
              <Text style={styles.goalPercentage}>{Math.round(goal.progress * 100)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${goal.progress * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.goalAmount}>{goal.amount} of {goal.target}</Text>
          </View>
        ))}
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    color: '#94a3b8',
    fontSize: 14,
  },
  goalsList: {
    gap: 16,
  },
  goalItem: {
    gap: 6,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalName: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  goalPercentage: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 3,
  },
  goalAmount: {
    color: '#64748b',
    fontSize: 10,
  },
});