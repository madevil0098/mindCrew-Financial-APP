import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { X, DollarSign } from 'lucide-react-native';
import { Transaction } from '@/types';

interface AddTransactionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

const categories = [
  { name: 'Food & Dining', icon: '🍽️', color: '#f59e0b' },
  { name: 'Transportation', icon: '🚗', color: '#ef4444' },
  { name: 'Shopping', icon: '🛍️', color: '#6366f1' },
  { name: 'Bills', icon: '📄', color: '#8b5cf6' },
  { name: 'Entertainment', icon: '🎬', color: '#ec4899' },
  { name: 'Health', icon: '🏥', color: '#22c55e' },
  { name: 'Income', icon: '💰', color: '#22c55e' },
  { name: 'Other', icon: '📝', color: '#64748b' },
];

export function AddTransactionModal({ isVisible, onClose, onAdd }: AddTransactionModalProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleAdd = () => {
    if (!name.trim() || !amount.trim()) return;

    const transaction: Omit<Transaction, 'id'> = {
      name: name.trim(),
      category: selectedCategory.name,
      amount: type === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
      date: new Date().toISOString(),
      type,
      icon: selectedCategory.icon,
      color: selectedCategory.color,
    };

    onAdd(transaction);
    
    // Reset form
    setName('');
    setAmount('');
    setSelectedCategory(categories[0]);
    setType('expense');
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Transaction</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}
              onPress={() => setType('expense')}
            >
              <Text style={[styles.typeButtonText, type === 'expense' && styles.typeButtonTextActive]}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}
              onPress={() => setType('income')}
            >
              <Text style={[styles.typeButtonText, type === 'income' && styles.typeButtonTextActive]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter description"
              placeholderTextColor="#64748b"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountInput}>
              <DollarSign size={20} color="#94a3b8" />
              <TextInput
                style={styles.amountTextInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.name}
                    style={[
                      styles.categoryButton,
                      selectedCategory.name === category.name && styles.categoryButtonActive,
                      { borderColor: category.color }
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <Text style={[
                      styles.categoryText,
                      selectedCategory.name === category.name && styles.categoryTextActive
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.addButton, (!name.trim() || !amount.trim()) && styles.addButtonDisabled]}
          onPress={handleAdd}
          disabled={!name.trim() || !amount.trim()}
        >
          <Text style={styles.addButtonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  typeButtonActive: {
    backgroundColor: '#6366f1',
  },
  typeButtonText: {
    color: '#94a3b8',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: 'white',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  amountTextInput: {
    flex: 1,
    padding: 16,
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#334155',
    minWidth: 80,
  },
  categoryButtonActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryText: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#6366f1',
  },
  addButton: {
    backgroundColor: '#6366f1',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#334155',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});