import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { X, Target, Calendar, DollarSign } from 'lucide-react-native';
import { Goal } from '@/types';

interface AddGoalModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (goal: Omit<Goal, 'id'>) => void;
}

const goalTypes = [
  { name: 'Emergency Fund', icon: '🛡️', color: ['#22c55e', '#16a34a'], category: 'emergency' as const },
  { name: 'Vacation', icon: '✈️', color: ['#f59e0b', '#d97706'], category: 'vacation' as const },
  { name: 'Investment', icon: '📈', color: ['#6366f1', '#4f46e5'], category: 'investment' as const },
  { name: 'Purchase', icon: '🛍️', color: ['#8b5cf6', '#7c3aed'], category: 'purchase' as const },
  { name: 'Other', icon: '🎯', color: ['#64748b', '#475569'], category: 'other' as const },
];

export function AddGoalModal({ isVisible, onClose, onAdd }: AddGoalModalProps) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedType, setSelectedType] = useState(goalTypes[0]);

  const handleAdd = () => {
    if (!name.trim() || !target.trim() || !deadline.trim()) return;

    const goal: Omit<Goal, 'id'> = {
      name: name.trim(),
      current: 0,
      target: parseFloat(target),
      deadline: deadline.trim(),
      color: selectedType.color,
      icon: selectedType.icon,
      category: selectedType.category,
    };

    onAdd(goal);
    
    // Reset form
    setName('');
    setTarget('');
    setDeadline('');
    setSelectedType(goalTypes[0]);
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
          <Text style={styles.title}>Create New Goal</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Goal Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter goal name"
              placeholderTextColor="#64748b"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Target Amount</Text>
            <View style={styles.amountInput}>
              <DollarSign size={20} color="#94a3b8" />
              <TextInput
                style={styles.amountTextInput}
                value={target}
                onChangeText={setTarget}
                placeholder="0.00"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Target Date</Text>
            <View style={styles.dateInput}>
              <Calendar size={20} color="#94a3b8" />
              <TextInput
                style={styles.dateTextInput}
                value={deadline}
                onChangeText={setDeadline}
                placeholder="e.g., Dec 2025"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Goal Type</Text>
            <View style={styles.typesContainer}>
              {goalTypes.map((type) => (
                <TouchableOpacity
                  key={type.name}
                  style={[
                    styles.typeButton,
                    selectedType.name === type.name && styles.typeButtonActive
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text style={styles.typeIcon}>{type.icon}</Text>
                  <Text style={[
                    styles.typeText,
                    selectedType.name === type.name && styles.typeTextActive
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.createButton, (!name.trim() || !target.trim() || !deadline.trim()) && styles.createButtonDisabled]}
          onPress={handleAdd}
          disabled={!name.trim() || !target.trim() || !deadline.trim()}
        >
          <Target size={20} color="white" />
          <Text style={styles.createButtonText}>Create Goal</Text>
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
    maxHeight: '85%',
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
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  dateTextInput: {
    flex: 1,
    padding: 16,
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#334155',
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: '45%',
  },
  typeButtonActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderColor: '#6366f1',
  },
  typeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  typeText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  typeTextActive: {
    color: '#6366f1',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6366f1',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 12,
  },
  createButtonDisabled: {
    backgroundColor: '#334155',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});