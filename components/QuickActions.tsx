import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Send, Plus, CreditCard, Target, Repeat, PiggyBank } from 'lucide-react-native';

interface QuickActionsProps {
  onActionPress: (action: string) => void;
}

export function QuickActions({ onActionPress }: QuickActionsProps) {
  const actions = [
    { id: 1, icon: Send, label: 'Transfer', color: '#6366f1' },
    { id: 2, icon: Plus, label: 'Add Money', color: '#22c55e' },
    { id: 3, icon: CreditCard, label: 'Pay Bills', color: '#f59e0b' },
    { id: 4, icon: Target, label: 'Set Goal', color: '#ec4899' },
    { id: 5, icon: Repeat, label: 'Auto-Save', color: '#8b5cf6' },
    { id: 6, icon: PiggyBank, label: 'Invest', color: '#06b6d4' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.actionsContainer}>
          {actions.map((action) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity 
                key={action.id} 
                style={styles.actionButton}
                onPress={() => onActionPress(action.label)}
              >
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                  <IconComponent size={20} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 20,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '500',
  },
});