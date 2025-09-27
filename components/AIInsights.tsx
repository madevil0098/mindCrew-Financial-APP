import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react-native';
import { Transaction, Goal } from '@/types';

interface AIInsightsProps {
  transactions: Transaction[];
  goals: Goal[];
}

export function AIInsights({ transactions, goals }: AIInsightsProps) {
  const generateInsights = () => {
    const insights = [];
    
    // Analyze spending patterns
    const recentExpenses = transactions
      .filter(t => t.type === 'expense')
      .slice(0, 10);
    
    const totalSpent = recentExpenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    if (totalSpent > 500) {
      insights.push({
        id: 1,
        type: 'warning',
        icon: AlertTriangle,
        color: '#f59e0b',
        title: 'High Spending Alert',
        description: `You've spent $${totalSpent.toFixed(0)} in recent transactions`,
      });
    }
    
    // Check goal progress
    const activeGoals = goals.filter(g => g.current < g.target);
    if (activeGoals.length > 0) {
      const avgProgress = activeGoals.reduce((sum, g) => sum + (g.current / g.target), 0) / activeGoals.length;
      if (avgProgress > 0.7) {
        insights.push({
          id: 2,
          type: 'opportunity',
          icon: TrendingUp,
          color: '#22c55e',
          title: 'Goals on Track',
          description: `${Math.round(avgProgress * 100)}% average progress across goals`,
        });
      }
    }
    
    // Savings opportunity
    insights.push({
      id: 3,
      type: 'opportunity',
      icon: Lightbulb,
      color: '#6366f1',
      title: 'Save $127/month',
      description: 'Switch to a high-yield savings account',
    });
    
    return insights.slice(0, 3);
  };

  const insights = generateInsights();

  const handleInsightPress = (insight: any) => {
    Alert.alert(
      insight.title,
      `${insight.description}\n\nWould you like to learn more about this recommendation?`,
      [
        { text: 'Later', style: 'cancel' },
        { text: 'Learn More', onPress: () => Alert.alert('Feature Coming Soon', 'Detailed insights coming soon!') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Brain size={20} color="#6366f1" />
        <Text style={styles.title}>AI Insights</Text>
      </View>
      
      <View style={styles.insightsList}>
        {insights.map((insight) => {
          const IconComponent = insight.icon;
          return (
            <TouchableOpacity 
              key={insight.id} 
              style={styles.insightCard}
              onPress={() => handleInsightPress(insight)}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${insight.color}20` }]}>
                <IconComponent size={16} color={insight.color} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightDescription}>{insight.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  insightsList: {
    gap: 12,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  insightDescription: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
});