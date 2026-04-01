import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, UIManager, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Song, SONGS_DATA } from '../../components/songs_data';
import { ListaKnananukView } from '../../components/ListaKnananukView';
import { FavoritusView } from '../../components/FavoritusView';

// Enable layout animations for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function KnananukScreen() {
    const [activeTab, setActiveTab] = useState<'lista' | 'favoritus'>('lista');
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [indexVisible, setIndexVisible] = useState(false);

    // Alphabetical index for hamburger
    const alphabeticalSongs = useMemo(() => {
        return [...SONGS_DATA].sort((a, b) => a.title.localeCompare(b.title));
    }, []);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'lista' && styles.activeTab]}
                    onPress={() => setActiveTab('lista')}
                >
                    <Ionicons 
                        name="list" 
                        size={18} 
                        color={activeTab === 'lista' ? "#fff" : "#a18d7c"} 
                        style={{ marginRight: 6 }}
                    />
                    <Text style={[styles.tabText, activeTab === 'lista' && styles.activeTabText]}>Lista</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'favoritus' && styles.activeTab]}
                    onPress={() => setActiveTab('favoritus')}
                >
                    <Ionicons 
                        name="star" 
                        size={18} 
                        color={activeTab === 'favoritus' ? "#fff" : "#a18d7c"} 
                        style={{ marginRight: 6 }}
                    />
                    <Text style={[styles.tabText, activeTab === 'favoritus' && styles.activeTabText]}>Favoritus</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                {activeTab === 'lista' ? (
                    <ListaKnananukView 
                        onPressSong={setSelectedSong} 
                        onPressMenu={() => setIndexVisible(true)}
                    />
                ) : (
                    <FavoritusView onPressSong={setSelectedSong} />
                )}
            </View>

            {/* Song Detail Modal */}
            <Modal visible={!!selectedSong} animationType="slide">
                <View style={styles.modalBg}>
                    <View style={styles.detailHeader}>
                        <TouchableOpacity onPress={() => setSelectedSong(null)} style={styles.closeBtn}>
                            <Ionicons name="close" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={styles.headerInfo}>
                            <Text style={styles.detailId}>#{selectedSong?.id}</Text>
                            <Text style={styles.detailTitle} numberOfLines={1}>{selectedSong?.title}</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.detailContent}>
                        <View style={styles.detailMetaBox}>
                            <Text style={styles.detailMetaText}>{selectedSong?.category} • {selectedSong?.section}</Text>
                        </View>
                        
                        {selectedSong?.refrain && (
                            <View style={styles.refrainBox}>
                                <Text style={styles.refrainTitle}>Refrain</Text>
                                <Text style={styles.refrainText}>{selectedSong.refrain}</Text>
                            </View>
                        )}

                        <View style={styles.versesBox}>
                            {selectedSong?.verses.map((verse, idx) => (
                                <Text key={idx} style={styles.verseText}>{verse}</Text>
                            ))}
                        </View>
                        <View style={{height: 100}} />
                    </ScrollView>
                </View>
            </Modal>

            {/* Hamburger Modal (Alphabetical Index) */}
            <Modal visible={indexVisible} animationType="fade" transparent>
                <View style={styles.menuOverlay}>
                    <View style={styles.menuContent}>
                        <View style={styles.menuHeader}>
                            <Text style={styles.menuTitle}>Alphabetical Index</Text>
                            <TouchableOpacity onPress={() => setIndexVisible(false)}>
                                <Ionicons name="close" size={24} color="#4b2e1f" />
                            </TouchableOpacity>
                        </View>
                        <FlatList 
                            data={alphabeticalSongs}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={styles.menuItem} 
                                    onPress={() => {
                                        setIndexVisible(false);
                                        setSelectedSong(item);
                                    }}
                                >
                                    <Text style={styles.menuItemText}>{item.title}</Text>
                                    <Text style={styles.menuItemId}>{item.id}</Text>
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#fdfbf7" },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 50,
        marginBottom: 8,
        borderRadius: 14,
        padding: 4,
        borderWidth: 1,
        borderColor: '#ead9cf',
        shadowColor: "#4b2e1f", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#c1121f',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#a18d7c',
    },
    activeTabText: {
        color: '#fff',
    },
    modalBg: { flex: 1, backgroundColor: '#fdfbf7' },
    detailHeader: { 
        paddingTop: 50, paddingBottom: 20, paddingHorizontal: 16, 
        backgroundColor: '#c1121f', flexDirection: 'row', alignItems: 'center' 
    },
    closeBtn: { marginRight: 15 },
    headerInfo: { flex: 1 },
    detailId: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '800' },
    detailTitle: { color: '#fff', fontSize: 22, fontWeight: '900' },
    detailContent: { flex: 1, padding: 20 },
    detailMetaBox: { 
        backgroundColor: '#fff', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, 
        borderRadius: 8, borderWidth: 1, borderColor: '#ead9cf', marginBottom: 24 
    },
    detailMetaText: { fontSize: 13, fontWeight: '700', color: '#c1121f' },
    refrainBox: { 
        backgroundColor: '#fdf3f3', padding: 20, borderRadius: 16, 
        borderLeftWidth: 4, borderLeftColor: '#c1121f', marginBottom: 24 
    },
    refrainTitle: { fontSize: 14, fontWeight: '900', color: '#c1121f', textTransform: 'uppercase', marginBottom: 8 },
    refrainText: { fontSize: 18, color: '#4b2e1f', lineHeight: 28, fontStyle: 'italic' },
    versesBox: { paddingHorizontal: 8 },
    verseText: { fontSize: 18, color: '#4b2e1f', lineHeight: 28, marginBottom: 20 },
    menuOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    menuContent: { 
        backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, 
        maxHeight: '85%', paddingBottom: 20 
    },
    menuHeader: { 
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
        padding: 20, borderBottomWidth: 1, borderBottomColor: '#f7f2e8' 
    },
    menuTitle: { fontSize: 20, fontWeight: '900', color: '#4b2e1f' },
    menuItem: { 
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
        paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#fdfbf7' 
    },
    menuItemText: { fontSize: 16, fontWeight: '700', color: '#4b2e1f', flex: 1 },
    menuItemId: { fontSize: 14, fontWeight: '800', color: '#c1121f', opacity: 0.5 },
});
