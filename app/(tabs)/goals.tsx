import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Target, Calendar, TrendingUp } from 'lucide-react-native';
import { AddGoalModal } from '@/components/modals/AddGoalModal';
import { useFinancialData } from '@/hooks/useFinancialData';
import { useState } from 'react';

export default function Goals() {
  const { goals, addGoal, updateGoal, deleteGoal, loading } = useFinancialData();
  const [showAddGoal, setShowAddGoal] = useState(false);

  const handleAddMoney = (goalId: string) => {
    Alert.prompt(
      'Add Money to Goal',
      'How much would you like to add?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add', 
          onPress: (amount) => {
            if (amount && !isNaN(parseFloat(amount))) {
              updateGoal(goalId, parseFloat(amount));
              Alert.alert('Success', `$${amount} added to your goal!`);
            }
          }
        }
      ],
      'numeric'
    );
  };

  const handleAutoSave = (goalId: string) => {
    Alert.alert(
      'Auto-Save Setup',
      'Set up automatic transfers to this goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Setup', onPress: () => Alert.alert('Feature Coming Soon', 'Auto-save setup coming soon!') }
      ]
    );
  };

  const handleGoalPress = (goal: any) => {
    const progress = goal.current / goal.target;
    Alert.alert(
      goal.name,
      `Progress: ${Math.round(progress * 100)}%\nCurrent: $${goal.current.toLocaleString()}\nTarget: $${goal.target.toLocaleString()}\nRemaining: $${(goal.target - goal.current).toLocaleString()}\nDeadline: ${goal.deadline}`,
      [
        { text: 'Close', style: 'cancel' },
        { text: 'Add Money', onPress: () => handleAddMoney(goal.id) },
        { text: 'Delete', style: 'destructive', onPress: () => {
          Alert.alert(
            'Delete Goal',
            `Are you sure you want to delete "${goal.name}"?`,
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => deleteGoal(goal.id) }
            ]
          );
        }}
      ]
    );
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const avgProgress = goals.length > 0 ? goals.reduce((sum, goal) => sum + (goal.current / goal.target), 0) / goals.length : 0;

  if (loading) {
    return (
      <LinearGradient colors={['#1a1b3e', '#0f172a']} style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading your goals...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#1a1b3e', '#0f172a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Financial Goals</Text>
              <Text style={styles.subtitle}>Track your progress</Text>
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddGoal(true)}
            >
              <Plus size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Goals Overview</Text>
            <View style={styles.summaryStats}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{goals.length}</Text>
                <Text style={styles.summaryLabel}>Active Goals</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>${(totalSaved / 1000).toFixed(1)}K</Text>
                <Text style={styles.summaryLabel}>Total Saved</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{Math.round(avgProgress * 100)}%</Text>
                <Text style={styles.summaryLabel}>Avg Progress</Text>
              </View>
            </View>
          </View>

          <View style={styles.goalsList}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                onPress={() => handleGoalPress(goal)}
              >
                <LinearGradient
                  colors={goal.color}
                  style={styles.goalCard}
                >
                  <View style={styles.goalHeader}>
                    <View style={styles.goalTitleSection}>
                      <Text style={styles.goalIcon}>{goal.icon}</Text>
                      <View>
                        <Text style={styles.goalName}>{goal.name}</Text>
                        <View style={styles.goalDeadline}>
                          <Calendar size={12} color="rgba(255, 255, 255, 0.8)" />
                          <Text style={styles.goalDeadlineText}>{goal.deadline}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.goalPercentage}>{Math.round((goal.current / goal.target) * 100)}%</Text>
                  </View>

                  <View style={styles.goalProgress}>
                    <View style={styles.goalAmounts}>
                      <Text style={styles.goalCurrent}>${goal.current.toLocaleString()}</Text>
                      <Text style={styles.goalTarget}>of ${goal.target.toLocaleString()}</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill,
                            { width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }
                          ]}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.goalActions}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleAddMoney(goal.id)}
                    >
                      <Plus size={16} color="white" />
                      <Text style={styles.actionText}>Add Money</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleAutoSave(goal.id)}
                    >
                      <TrendingUp size={16} color="white" />
                      <Text style={styles.actionText}>Auto-Save</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.createGoalCard}
            onPress={() => setShowAddGoal(true)}
          >
            <LinearGradient
              colors={['#374151', '#4b5563']}
              style={styles.createGoalGradient}
            >
              <Plus size={24} color="#94a3b8" />
              <Text style={styles.createGoalText}>Create New Goal</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <AddGoalModal
            isVisible={showAddGoal}
            onClose={() => setShowAddGoal(false)}
            onAdd={addGoal}
          />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  goalsList: {
    gap: 16,
  },
  goalCard: {
    borderRadius: 20,
    padding: 20,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  goalIcon: {
    fontSize: 24,
  },
  goalName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  goalDeadline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  goalDeadlineText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  goalPercentage: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  goalProgress: {
    marginBottom: 16,
  },
  goalAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalCurrent: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  goalTarget: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  goalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  createGoalCard: {
    marginTop: 16,
    marginBottom: 100,
  },
  createGoalGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
  },
  createGoalText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
});