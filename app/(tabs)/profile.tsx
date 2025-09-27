import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Star,
  Award,
  Trophy
} from 'lucide-react-native';
import { useFinancialData } from '@/hooks/useFinancialData';

export default function Profile() {
  const { profile, goals, transactions, updateProfile } = useFinancialData();
  
  const menuItems = [
    { icon: Settings, title: 'Account Settings', subtitle: 'Privacy, security, language' },
    { icon: Bell, title: 'Notifications', subtitle: 'Push, email, SMS preferences' },
    { icon: Shield, title: 'Security & Privacy', subtitle: 'Two-factor auth, data export' },
    { icon: CreditCard, title: 'Payment Methods', subtitle: 'Manage cards and accounts' },
    { icon: Star, title: 'Premium Features', subtitle: 'Upgrade for advanced AI insights' },
    { icon: HelpCircle, title: 'Help & Support', subtitle: 'FAQ, contact us, tutorials' },
  ];

  const achievements = [
    { icon: '🎯', title: 'Goal Setter', description: 'Created 5 savings goals' },
    { icon: '💰', title: 'Smart Saver', description: 'Saved $10,000 this year' },
    { icon: '📊', title: 'Budget Master', description: 'Stayed within budget for 6 months' },
  ];

  const handleMenuPress = (item: any) => {
    switch (item.title) {
      case 'Account Settings':
        Alert.alert('Account Settings', 'Account settings coming soon!');
        break;
      case 'Notifications':
        Alert.alert(
          'Notifications',
          'Manage your notification preferences',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Enable All', onPress: () => Alert.alert('Success', 'All notifications enabled!') },
            { text: 'Disable All', onPress: () => Alert.alert('Success', 'All notifications disabled!') }
          ]
        );
        break;
      case 'Security & Privacy':
        Alert.alert('Security & Privacy', 'Security settings coming soon!');
        break;
      case 'Payment Methods':
        Alert.alert('Payment Methods', 'Payment method management coming soon!');
        break;
      case 'Premium Features':
        Alert.alert(
          'Premium Features',
          'Upgrade to Premium for:\n• Advanced AI insights\n• Unlimited goals\n• Priority support\n• Custom reports\n\nPrice: $9.99/month',
          [
            { text: 'Maybe Later', style: 'cancel' },
            { text: 'Upgrade Now', onPress: () => Alert.alert('Coming Soon', 'Premium upgrade coming soon!') }
          ]
        );
        break;
      case 'Help & Support':
        Alert.alert(
          'Help & Support',
          'How can we help you?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'FAQ', onPress: () => Alert.alert('FAQ', 'Frequently asked questions coming soon!') },
            { text: 'Contact Us', onPress: () => Alert.alert('Contact', 'Contact support coming soon!') }
          ]
        );
        break;
      default:
        Alert.alert('Feature Coming Soon', `${item.title} feature is coming soon!`);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => Alert.alert('Signed Out', 'You have been signed out successfully!') }
      ]
    );
  };

  const handleAchievementPress = (achievement: any) => {
    Alert.alert(
      achievement.title,
      `${achievement.description}\n\nCongratulations on this achievement!`,
      [{ text: 'Awesome!', style: 'default' }]
    );
  };

  const calculateStats = () => {
    const monthsActive = profile ? Math.floor((new Date().getTime() - new Date(profile.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 30)) : 0;
    return {
      healthScore: 850, // This would come from financial health calculation
      activeGoals: goals.length,
      monthsActive: Math.max(1, monthsActive)
    };
  };

  const stats = calculateStats();

  return (
    <LinearGradient
      colors={['#1a1b3e', '#0f172a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={styles.profileImage}
            >
              <Text style={styles.profileInitials}>{profile?.avatar || 'JS'}</Text>
            </LinearGradient>
            
            <Text style={styles.userName}>{profile?.name || 'John Smith'}</Text>
            <Text style={styles.userEmail}>{profile?.email || 'john.smith@example.com'}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.healthScore}</Text>
                <Text style={styles.statLabel}>Health Score</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.activeGoals}</Text>
                <Text style={styles.statLabel}>Active Goals</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.monthsActive}</Text>
                <Text style={styles.statLabel}>Months Active</Text>
              </View>
            </View>
          </View>

          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.achievementsList}>
                {achievements.map((achievement, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.achievementCard}
                    onPress={() => handleAchievementPress(achievement)}
                  >
                    <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.menuSection}>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity 
                  key={index} 
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item)}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconContainer}>
                      <IconComponent size={20} color="#6366f1" />
                    </View>
                    <View style={styles.menuItemContent}>
                      <Text style={styles.menuItemTitle}>{item.title}</Text>
                      <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#64748b" />
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Version 1.0.0</Text>
            <Text style={styles.footerText}>Made with ❤️ for smart financial management</Text>
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
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitials: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  userName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    padding: 20,
    gap: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  achievementsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  achievementsList: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  achievementCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    padding: 16,
    width: 140,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    color: '#94a3b8',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
  menuSection: {
    gap: 2,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 100,
    gap: 8,
  },
  footerText: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
  },
});