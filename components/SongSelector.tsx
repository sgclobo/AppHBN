import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Song, SONGS_DATA } from './songs_data';

interface SongSelectorProps {
  label: string;
  selectedSongId: number | null;
  onSelect: (song: Song | null) => void;
  onPressSongTitle?: (song: Song) => void;
}

export const SongSelector: React.FC<SongSelectorProps> = ({ 
  label, 
  selectedSongId, 
  onSelect,
  onPressSongTitle 
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedSong = useMemo(() => 
    SONGS_DATA.find(s => s.id === selectedSongId), 
    [selectedSongId]
  );

  const alphabeticalSongs = useMemo(() => {
    return [...SONGS_DATA].sort((a, b) => a.title.localeCompare(b.title));
  }, []);

  const filteredSongs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const seen = new Set();
    return alphabeticalSongs.filter(s => {
      const matches = s.title.toLowerCase().includes(query) || s.id.toString().includes(query);
      if (!matches) return false;
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });
  }, [searchQuery, alphabeticalSongs]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <View style={styles.selectorRow}>
        <TouchableOpacity 
          style={[styles.selectorButton, selectedSong && styles.selectedButton]} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.selectorText, !selectedSong && styles.placeholderText]} numberOfLines={1}>
            {selectedSong ? `${selectedSong.id} - ${selectedSong.title}` : "Select a song..."}
          </Text>
          <Ionicons name="search" size={18} color="#c1121f" />
        </TouchableOpacity>

        {selectedSong && (
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={() => onSelect(null)}
          >
            <Ionicons name="close-circle" size={24} color="#a18d7c" />
          </TouchableOpacity>
        )}
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseBtn}>
              <Ionicons name="close" size={28} color="#4b2e1f" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Choose Song for {label}</Text>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#a18d7c" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search by ID or Title..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>

          <FlatList
            data={filteredSongs}
            keyExtractor={(item, index) => `song-${item.id}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.songItem} 
                onPress={() => {
                  onSelect(item);
                  setModalVisible(false);
                  setSearchQuery('');
                }}
              >
                <Text style={styles.songId}>{item.id}</Text>
                <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '800', color: '#6b4f3a', textTransform: 'uppercase', marginBottom: 6, marginLeft: 4 },
  selectorRow: { flexDirection: 'row', alignItems: 'center' },
  selectorButton: { 
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', height: 48, borderRadius: 12, paddingHorizontal: 12,
    borderWidth: 1, borderColor: '#ead9cf',
  },
  selectedButton: { borderColor: '#c1121f', backgroundColor: '#fdf3f3' },
  selectorText: { fontSize: 15, color: '#4b2e1f', fontWeight: '600', flex: 1, marginRight: 8 },
  placeholderText: { color: '#a18d7c', fontStyle: 'italic' },
  clearButton: { marginLeft: 8 },
  modalContainer: { flex: 1, backgroundColor: '#fdfbf7' },
  modalHeader: { 
    flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 50, 
    borderBottomWidth: 1, borderBottomColor: '#ead9cf', backgroundColor: '#fff' 
  },
  modalCloseBtn: { marginRight: 16 },
  modalTitle: { fontSize: 18, fontWeight: '900', color: '#4b2e1f' },
  searchBar: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', 
    margin: 16, paddingHorizontal: 12, height: 48, borderRadius: 12,
    borderWidth: 1, borderColor: '#ead9cf'
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#4b2e1f' },
  listContent: { paddingHorizontal: 16, paddingBottom: 40 },
  songItem: { 
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14, 
    borderBottomWidth: 1, borderBottomColor: '#f7f2e8' 
  },
  songId: { 
    width: 40, fontSize: 14, fontWeight: '800', color: '#c1121f', 
    backgroundColor: '#fdf3f3', padding: 4, borderRadius: 6, textAlign: 'center', marginRight: 12 
  },
  songTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#4b2e1f' },
});
