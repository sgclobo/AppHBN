import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MISA_SLOTS } from '../constants/misaSlots';
import { EventPlan } from '../utils/eventStorage';
import { Song } from './songs_data';

interface SlotPickerModalProps {
  visible: boolean;
  onClose: () => void;
  event: EventPlan;
  song: Song;
  onSelectSlot: (slotId: string) => void;
}

export const SlotPickerModal: React.FC<SlotPickerModalProps> = ({ visible, onClose, event, song, onSelectSlot }) => {
  const renderItem = ({ item }: { item: typeof MISA_SLOTS[0] }) => {
    const assignedSongs = event.slots?.[item.id] || [];
    const isFull = assignedSongs.length >= item.max;
    const isAlreadyAssigned = assignedSongs.some(s => s.id === song.id);
    
    const isDisabled = isFull || isAlreadyAssigned;

    return (
      <TouchableOpacity 
        style={[styles.slotItem, isDisabled && styles.slotDisabled]} 
        onPress={() => !isDisabled && onSelectSlot(item.id)}
        disabled={isDisabled}
      >
        <View style={styles.slotInfo}>
          <Text style={styles.slotLabel}>{item.label}</Text>
          <Text style={styles.slotCount}>{assignedSongs.length}/{item.max}</Text>
        </View>
        {isAlreadyAssigned && (
          <Ionicons name="checkmark-circle" size={24} color="#C0392B" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Adiciona ba: {event.name}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#4b2e1f" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={MISA_SLOTS}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fdfbf7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ead9cf',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4b2e1f',
  },
  listContent: {
    padding: 16,
  },
  slotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ead9cf',
  },
  slotDisabled: {
    opacity: 0.4,
  },
  slotInfo: {
    flex: 1,
  },
  slotLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4b2e1f',
  },
  slotCount: {
    fontSize: 12,
    color: '#a18d7c',
    marginTop: 2,
  },
});
