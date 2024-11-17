import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NoteCreation from "../../models/NoteCreation";
import getAll from "../../utils/getAll";

export default function Dashboard() {
    const [isCreateNoteModalVisible, setCreateNoteModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getAllNotes();
    });

    const getAllNotes = async () => {
        try {
            const notesData = await getAll();
            if (notesData && Array.isArray(notesData)) {
                setNotes(notesData);
            } else {
                setNotes([]);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNotes([]);
        }
    };

    const toggleCreateNoteModal = () => {
        setCreateNoteModalVisible(!isCreateNoteModalVisible);
    };

    const renderNote = ({ item }) => {
        return (
            <View style={[styles.noteItem, { backgroundColor: item.color || "#fff" }]}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.noteContent, styles.imageFallback]}>{item.content}</Text>
                    {item.imageUrl && (
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.noteImage}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBar}>
                <MaterialIcons name="menu" size={26} color="black" />
                <Text style={styles.searchText}>Search your notes</Text>
                <MaterialIcons name="view-module" size={26} color="black" />
                <Image style={styles.profileIcon} source={require("../../assets/images/profile.png")} />
            </View>

            {/* Note List */}
            {notes.length === 0 ? (
                <View style={styles.emptyState}>
                    <MaterialIcons name="lightbulb-outline" size={100} color="#fbbc04" />
                    <Text style={styles.emptyText}>Notes you add appear here</Text>
                </View>
            ) : (
                <FlatList
                    data={notes}
                    renderItem={renderNote}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.notesList}
                />
            )}

            {/* Create Note Modal */}
            <Modal visible={isCreateNoteModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <NoteCreation navigation={{ goBack: toggleCreateNoteModal }} />
                </View>
            </Modal>

            {/* Bottom Toolbar */}
            <View style={styles.bottomToolbar}>
                <TouchableOpacity style={styles.toolbarButton}>
                    <MaterialIcons name="check-box" size={25} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolbarButton}>
                    <MaterialIcons name="brush" size={25} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolbarButton}>
                    <MaterialIcons name="mic" size={25} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolbarButton}>
                    <MaterialIcons name="image" size={25} color="gray" />
                </TouchableOpacity>
            </View>

            {/* Floating Button */}
            <TouchableOpacity style={styles.floatingButton} onPress={toggleCreateNoteModal}>
                <Image style={styles.fabIcon} source={require("../../assets/images/plus_button.png")} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#faf8ff",
        justifyContent: "center",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ebebf5",
        padding: 10,
        marginTop: 20,
        borderRadius: 38,
        marginHorizontal: 10,
        height: 50,
        justifyContent: 'space-between',
    },
    searchText: {
        color: "#888",
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
    profileIcon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        color: "black",
        fontSize: 15,
        marginTop: 10,
    },
    notesList: {
        marginTop: 20,
    },
    noteItem: {
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    noteContent: {
        marginTop: 5,
        color: "#555",
        fontSize: 14,
    },
    bottomToolbar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#eeedf4",
        paddingVertical: 10,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
        paddingLeft: 35
    },
    toolbarButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 30,
    },
    floatingButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "#f5f5f5",
        borderRadius: 15,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    fabIcon: {
        width: 40,
        height: 40,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    noteImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginTop:-22
    },
    imageFallback: {
        flex: 1,
    },
});