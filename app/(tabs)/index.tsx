import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { FinancialHealthCard } from '@/components/FinancialHealthCard';
import { SpendingChart } from '@/components/SpendingChart';
import { GoalProgress } from '@/components/GoalProgress';
import { AIInsights } from '@/components/AIInsights';
import { QuickActions } from '@/components/QuickActions';
import { RecentTransactions } from '@/components/RecentTransactions';
import { AddTransactionModal } from '@/components/modals/AddTransactionModal';
import { useFinancialData } from '@/hooks/useFinancialData';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const { 
    transactions, 
    goals, 
    financialHealth, 
    loading, 
    addTransaction,
    updateGoal 
  } = useFinancialData();
  
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Transfer':
        Alert.alert('Transfer', 'Transfer feature coming soon!');
        break;
      case 'Add Money':
        setShowAddTransaction(true);
        break;
      case 'Pay Bills':
        Alert.alert('Pay Bills', 'Bill payment feature coming soon!');
        break;
      case 'Set Goal':
        Alert.alert('Set Goal', 'Navigate to Goals tab to create new goals!');
        break;
      case 'Auto-Save':
        Alert.alert('Auto-Save', 'Automatic savings setup coming soon!');
        break;
      case 'Invest':
        Alert.alert('Invest', 'Investment features coming soon!');
        break;
      default:
        Alert.alert('Feature', `${action} feature coming soon!`);
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#1a1b3e', '#0f172a']} style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading your financial data...</Text>
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
        <Header financialHealth={financialHealth} />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <FinancialHealthCard financialHealth={financialHealth} />
          <AIInsights transactions={transactions} goals={goals} />
          <QuickActions onActionPress={handleQuickAction} />
          
          <View style={styles.chartsRow}>
            <SpendingChart transactions={transactions} />
            <GoalProgress goals={goals} onUpdateGoal={updateGoal} />
          </View>
          
          <RecentTransactions transactions={transactions} />
        </ScrollView>
        
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => setShowAddTransaction(true)}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
        
        <AddTransactionModal
          isVisible={showAddTransaction}
          onClose={() => setShowAddTransaction(false)}
          onAdd={addTransaction}
        />
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  chartsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 15,
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
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});