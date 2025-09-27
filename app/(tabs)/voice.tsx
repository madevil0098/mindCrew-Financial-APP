import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic, MicOff, MessageCircle, Volume2 } from 'lucide-react-native';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';

export default function Voice() {
  const { isListening, queries, startListening, stopListening, processVoiceQuery } = useVoiceAssistant();

  const suggestions = [
    "Can I afford...",
    "How much have I saved...",
    "Set a budget for...",
    "What's my spending on...",
  ];

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    Alert.prompt(
      'Voice Query',
      `Complete your question starting with: "${suggestion}"`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Ask', 
          onPress: (text) => {
            if (text) {
              processVoiceQuery(suggestion + ' ' + text);
            }
          }
        }
      ],
      'plain-text'
    );
  };

  const handleQueryPress = (query: any) => {
    Alert.alert(
      'AI Response',
      query.response,
      [
        { text: 'OK', style: 'default' },
        { text: 'Ask Follow-up', onPress: () => Alert.alert('Feature Coming Soon', 'Follow-up questions coming soon!') }
      ]
    );
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };
  return (
    <LinearGradient
      colors={['#1a1b3e', '#0f172a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>AI Assistant</Text>
            <Text style={styles.subtitle}>Ask me anything about your finances</Text>
          </View>

          <View style={styles.voiceContainer}>
            <TouchableOpacity
              style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
              onPress={handleVoiceToggle}
            >
              <LinearGradient
                colors={isListening ? ['#ef4444', '#dc2626'] : ['#6366f1', '#8b5cf6']}
                style={styles.voiceButtonGradient}
              >
                {isListening ? (
                  <MicOff size={32} color="white" />
                ) : (
                  <Mic size={32} color="white" />
                )}
              </LinearGradient>
            </TouchableOpacity>
            
            <Text style={styles.voiceStatus}>
              {isListening ? 'Listening...' : 'Tap to speak'}
            </Text>
            
            {isListening && (
              <View style={styles.waveform}>
                <View style={[styles.wave, { height: 20 }]} />
                <View style={[styles.wave, { height: 35 }]} />
                <View style={[styles.wave, { height: 25 }]} />
                <View style={[styles.wave, { height: 40 }]} />
                <View style={[styles.wave, { height: 30 }]} />
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Suggestions</Text>
            <View style={styles.suggestionsList}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.suggestionCard}
                  onPress={() => handleSuggestionPress(suggestion)}
                >
                  <MessageCircle size={16} color="#6366f1" />
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Queries</Text>
            <View style={styles.queryList}>
              {queries.map((query) => (
                <TouchableOpacity 
                  key={query.id} 
                  style={styles.queryCard}
                  onPress={() => handleQueryPress(query)}
                >
                  <View style={styles.queryContent}>
                    <Text style={styles.queryText}>{query.query}</Text>
                    <Text style={styles.queryTime}>{formatTime(query.timestamp)}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleQueryPress(query)}>
                    <Volume2 size={16} color="#94a3b8" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 Voice Tips</Text>
            <Text style={styles.tipText}>
              Try asking: "Can I afford a $500 purchase?", "Show me my spending breakdown", 
              or "Set up automatic savings of $100 monthly"
            </Text>
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
    alignItems: 'center',
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
    textAlign: 'center',
  },
  voiceContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  voiceButton: {
    marginBottom: 20,
  },
  voiceButtonGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  voiceButtonActive: {
    transform: [{ scale: 1.05 }],
  },
  voiceStatus: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 20,
  },
  wave: {
    width: 4,
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  suggestionText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  queryList: {
    gap: 12,
  },
  queryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    padding: 16,
    borderRadius: 12,
  },
  queryContent: {
    flex: 1,
    marginRight: 12,
  },
  queryText: {
    color: 'white',
    fontSize: 14,
  },
  queryTime: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4,
  },
  tipCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 100,
  },
  tipTitle: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipText: {
    color: '#c4b5fd',
    fontSize: 14,
    lineHeight: 20,
  },
});