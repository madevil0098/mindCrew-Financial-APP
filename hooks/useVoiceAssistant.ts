import { useState } from 'react';

export interface VoiceQuery {
  id: string;
  query: string;
  response: string;
  timestamp: string;
}

export function useVoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [queries, setQueries] = useState<VoiceQuery[]>([
    {
      id: '1',
      query: "Can I afford a $200 dinner tonight?",
      response: "Based on your dining budget, you have $180 remaining this month. A $200 dinner would exceed your budget by $20. Consider a restaurant in the $150-180 range instead.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      query: "How much did I spend on groceries this month?",
      response: "You've spent $340 on groceries this month, which is $60 under your $400 budget. Great job staying within limits!",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      processVoiceQuery("What's my emergency fund balance?");
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const processVoiceQuery = (query: string) => {
    // Simple AI response simulation
    let response = "I'm processing your request...";
    
    if (query.toLowerCase().includes('afford')) {
      response = "Based on your current budget and spending patterns, I'll analyze if this purchase fits within your financial goals.";
    } else if (query.toLowerCase().includes('emergency fund')) {
      response = "Your emergency fund currently has $7,500, which is 75% of your $10,000 goal. You're on track to reach it by December 2025.";
    } else if (query.toLowerCase().includes('spend') || query.toLowerCase().includes('spent')) {
      response = "Let me check your recent spending patterns and provide a breakdown by category.";
    } else if (query.toLowerCase().includes('save') || query.toLowerCase().includes('savings')) {
      response = "Your current savings rate is 22%, which is excellent! You're saving $650 more than the average person in your income bracket.";
    }

    const newQuery: VoiceQuery = {
      id: Date.now().toString(),
      query,
      response,
      timestamp: new Date().toISOString(),
    };

    setQueries(prev => [newQuery, ...prev]);
  };

  return {
    isListening,
    queries,
    startListening,
    stopListening,
    processVoiceQuery,
  };
}