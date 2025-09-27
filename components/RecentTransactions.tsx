import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MoreHorizontal } from 'lucide-react-native';
import { Transaction } from '@/types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const handleSeeAll = () => {
    Alert.alert('All Transactions', 'Full transaction history coming soon!');
  };

  const handleTransactionPress = (transaction: Transaction) => {
    Alert.alert(
      transaction.name,
      `Category: ${transaction.category}\nAmount: $${Math.abs(transaction.amount).toFixed(2)}\nDate: ${new Date(transaction.date).toLocaleDateString()}`,
      [
        { text: 'OK', style: 'default' },
        { text: 'Edit', onPress: () => Alert.alert('Edit', 'Transaction editing coming soon!') }
      ]
    );
  };

  const handleMorePress = (transaction: Transaction) => {
    Alert.alert(
      'Transaction Options',
      `What would you like to do with "${transaction.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Edit', onPress: () => Alert.alert('Edit', 'Transaction editing coming soon!') },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Delete', 'Transaction deletion coming soon!') }
      ]
    );
  };

  const recentTransactions = transactions.slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.transactionsList}>
        {recentTransactions.map((transaction) => {
          return (
            <TouchableOpacity 
              key={transaction.id} 
              style={styles.transactionItem}
              onPress={() => handleTransactionPress(transaction)}
            >
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIcon, { backgroundColor: `${transaction.color}20` }]}>
                  <Text style={styles.transactionEmoji}>{transaction.icon}</Text>
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  <Text style={styles.transactionTime}>{formatTimeAgo(transaction.date)}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? '#22c55e' : 'white' }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </Text>
                <TouchableOpacity 
                  style={styles.moreButton}
                  onPress={() => handleMorePress(transaction)}
                >
                  <MoreHorizontal size={16} color="#64748b" />
                </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  seeAll: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  transactionsList: {
    gap: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionEmoji: {
    fontSize: 18,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  transactionCategory: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  transactionTime: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  transactionAmount: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  },
});