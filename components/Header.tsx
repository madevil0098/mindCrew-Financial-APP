import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Bell, Search, Settings } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FinancialHealth } from '@/types';

interface HeaderProps {
  financialHealth?: FinancialHealth | null;
}

export function Header({ financialHealth }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSearch = () => {
    Alert.alert('Search', 'Search functionality coming soon!');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'You have 3 new insights and 1 bill reminder.');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Navigate to Profile tab for settings!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>JS</Text>
        </LinearGradient>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.userName}>John Smith</Text>
          {financialHealth && (
            <Text style={styles.healthScore}>
              Health Score: {financialHealth.score}
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSearch}>
          <Search size={20} color="#94a3b8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleNotifications}>
          <Bell size={20} color="#94a3b8" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleSettings}>
          <Settings size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    justifyContent: 'center',
  },
  greeting: {
    color: '#94a3b8',
    fontSize: 14,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
  healthScore: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
});