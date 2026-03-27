import React, { useMemo, useState } from 'react';
import { LayoutAnimation, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Song, SONGS_DATA } from './songs_data';

interface ListaKnananukViewProps {
    onPressSong: (song: Song) => void;
    onPressMenu: () => void;
}

export const ListaKnananukView: React.FC<ListaKnananukViewProps> = ({ onPressSong, onPressMenu }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({ "Misa": true });
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const groupedData = useMemo(() => {
        const groups: Record<string, Record<string, Song[]>> = {};

        SONGS_DATA.forEach(song => {
            const section = song.section || 'Default';
            if (!groups[song.category]) groups[song.category] = {};
            if (!groups[song.category][section]) groups[song.category][section] = [];
            groups[song.category][section].push(song);
        });

        Object.keys(groups).forEach(cat => {
            Object.keys(groups[cat]).forEach(sec => {
                groups[cat][sec].sort((a, b) => a.id - b.id);
            });
        });

        return groups;
    }, []);

    const filteredSongs = useMemo(() => {
        if (!searchQuery) return [];
        const query = searchQuery.toLowerCase();
        return SONGS_DATA.filter(song => 
            song.title.toLowerCase().includes(query) || 
            song.id.toString().includes(query)
        ).sort((a, b) => a.id - b.id);
    }, [searchQuery]);

    const toggleCategory = (cat: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
    };

    const toggleSection = (sec: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSection(prev => prev === sec ? null : sec);
    };

    const renderSongRow = (song: Song, showMeta = false) => (
        <TouchableOpacity 
            key={song.id} 
            style={styles.songCard} 
            onPress={() => onPressSong(song)}
        >
            <View style={styles.songTag}>
                <Text style={styles.songId}>{song.id}</Text>
            </View>
            <View style={styles.songContent}>
                <Text style={styles.songTitle}>{song.title}</Text>
                {showMeta && (
                    <Text style={styles.songMeta}>{song.category} • {song.section}</Text>
                )}
            </View>
            <FontAwesome6 name="chevron-right" size={12} color="#c1121f" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onPressMenu} style={styles.iconButton}>
                    <Ionicons name="menu" size={28} color="#4b2e1f" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Lista Knananuk</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#6b4f3a" />
                    <TextInput 
                        placeholder="Search by ID or Title..."
                        placeholderTextColor="#a18d7c"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        clearButtonMode="while-editing"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#a18d7c" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Content */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {searchQuery.length > 0 ? (
                    <View>
                        <Text style={styles.resultsHeader}>Results for "{searchQuery}"</Text>
                        {filteredSongs.length > 0 ? (
                            filteredSongs.map(song => renderSongRow(song, true))
                        ) : (
                            <View style={styles.emptyState}>
                                <FontAwesome6 name="face-frown" size={40} color="#ead9cf" />
                                <Text style={styles.emptyText}>No songs found.</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    (() => {
                        const categoryOrder = ["Misa", "Misa Latin", "Tempo Litúrgico", "Maria", "Santu Sira", "Knananuk Portugues no Espanhol", "Knananuk Inglês", "Knananuk Indonesia"];
                        return Object.entries(groupedData).sort(([a], [b]) => {
                            const idxA = categoryOrder.indexOf(a);
                            const idxB = categoryOrder.indexOf(b);
                            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                            if (idxA !== -1) return -1;
                            if (idxB !== -1) return 1;
                            return a.localeCompare(b);
                        });
                    })().map(([category, sections]) => {
                        const isExpanded = expandedCategories[category];
                        const songCount = Object.values(sections).reduce((sum, s) => sum + s.length, 0);

                        return (
                            <View key={category} style={styles.categoryCard}>
                                <TouchableOpacity 
                                    style={styles.categoryHeader} 
                                    onPress={() => toggleCategory(category)}
                                    activeOpacity={0.7}
                                >
                                    <View>
                                        <Text style={styles.categoryTitle}>{category}</Text>
                                        <Text style={styles.categorySubtitle}>{songCount} songs</Text>
                                    </View>
                                    <Ionicons 
                                        name={isExpanded ? "chevron-up" : "chevron-down"} 
                                        size={20} 
                                        color="#c1121f" 
                                    />
                                </TouchableOpacity>

                                {isExpanded && (
                                    <View style={styles.categoryBody}>
                                        {["Misa", "Tempo Litúrgico", "Knananuk Portugues no Espanhol"].includes(category) ? (
                                            (() => {
                                                const order = category === "Misa" 
                                                    ? ['Entrada', 'Responsorial', 'Aleluia', 'Ofertório', 'Sanctus', 'Comunhão', 'Ação de Graças', 'Final']
                                                    : category === "Tempo Litúrgico"
                                                    ? ['Advento', 'Natal', 'Quaresma', 'Páscoa', 'Pentecostes']
                                                    : ['Portugues', 'Espanhol'];
                                                
                                                return Object.entries(sections).sort(([a], [b]) => {
                                                    const idxA = order.indexOf(a);
                                                    const idxB = order.indexOf(b);
                                                    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                                                    if (idxA !== -1) return -1;
                                                    if (idxB !== -1) return 1;
                                                    return a.localeCompare(b);
                                                });
                                            })().map(([section, songs]) => {
                                                const isSecExpanded = expandedSection === section;
                                                return (
                                                    <View key={section} style={styles.sectionAccordion}>
                                                        <TouchableOpacity 
                                                            style={styles.sectionAccordionHeader}
                                                            onPress={() => toggleSection(section)}
                                                        >
                                                            <Text style={styles.sectionTitle}>{section}</Text>
                                                            <Ionicons 
                                                                name={isSecExpanded ? "chevron-up" : "chevron-down"} 
                                                                size={16} 
                                                                color="#c1121f" 
                                                            />
                                                        </TouchableOpacity>
                                                        {isSecExpanded && (
                                                            <View style={styles.sectionAccordionBody}>
                                                                {songs.map(song => renderSongRow(song))}
                                                            </View>
                                                        )}
                                                    </View>
                                                );
                                            })
                                        ) : ["Misa Latin", "Maria", "Santu Sira", "Knananuk Inglês", "Knananuk Indonesia"].includes(category) ? (
                                            Object.values(sections).flat().sort((a, b) => a.id - b.id).map(song => renderSongRow(song))
                                        ) : (
                                            Object.entries(sections).map(([section, songs]) => (
                                                <View key={section} style={styles.sectionContainer}>
                                                    <View style={styles.sectionHeader}>
                                                        <View style={styles.sectionLine} />
                                                        <Text style={styles.sectionTitle}>{section}</Text>
                                                        <View style={styles.sectionLine} />
                                                    </View>
                                                    {songs.map(song => renderSongRow(song))}
                                                </View>
                                            ))
                                        )}
                                    </View>
                                )}
                            </View>
                        );
                    })
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerContainer: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12,
        backgroundColor: "#fdfbf7"
    },
    pageTitle: { fontSize: 24, fontWeight: "900", color: "#4b2e1f", letterSpacing: 1 },
    iconButton: { padding: 4 },
    searchContainer: { paddingHorizontal: 16, paddingVertical: 12 },
    searchBar: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
        borderRadius: 12, paddingHorizontal: 12, height: 48,
        borderWidth: 1, borderColor: '#ead9cf',
        shadowColor: "#4b2e1f", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#4b2e1f', fontWeight: '500' },
    scrollView: { flex: 1 },
    scrollContent: { padding: 16, paddingBottom: 40 },
    resultsHeader: { fontSize: 14, fontWeight: '700', color: '#6b4f3a', marginBottom: 12, marginLeft: 4, textTransform: 'uppercase' },
    emptyState: { alignItems: 'center', marginTop: 60 },
    emptyText: { color: '#a18d7c', marginTop: 12, fontSize: 16 },
    categoryCard: { 
        backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, overflow: 'hidden',
        borderWidth: 1, borderColor: '#ead9cf',
        shadowColor: "#4b2e1f", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
    },
    categoryHeader: { 
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        padding: 16, backgroundColor: '#fff'
    },
    categoryTitle: { fontSize: 20, fontWeight: '900', color: '#4b2e1f' },
    categorySubtitle: { fontSize: 13, color: '#a18d7c', marginTop: 2 },
    categoryBody: { paddingBottom: 16 },
    sectionContainer: { marginTop: 8 },
    sectionAccordion: { 
        borderBottomWidth: 1, borderBottomColor: '#f7f2e8',
    },
    sectionAccordionHeader: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#fdfbf7'
    },
    sectionAccordionBody: {
        backgroundColor: '#fff',
    },
    sectionHeader: { 
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginVertical: 8 
    },
    sectionLine: { flex: 1, height: 1, backgroundColor: '#ead9cf' },
    sectionTitle: { 
        fontSize: 13, fontWeight: '800', color: '#c1121f', textTransform: 'uppercase', letterSpacing: 1 
    },
    songCard: { 
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12,
        borderBottomWidth: 1, borderBottomColor: '#f7f2e8'
    },
    songTag: { 
        width: 36, height: 36, borderRadius: 10, backgroundColor: '#fdf3f3', 
        alignItems: 'center', justifyContent: 'center', marginRight: 12,
        borderWidth: 1, borderColor: '#fedcdc'
    },
    songId: { fontSize: 14, fontWeight: '800', color: '#c1121f' },
    songContent: { flex: 1 },
    songTitle: { fontSize: 16, fontWeight: '700', color: '#4b2e1f' },
    songMeta: { fontSize: 12, color: '#a18d7c', marginTop: 2 },
});
