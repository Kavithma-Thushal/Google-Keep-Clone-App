import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Welcome to Google Keep</Text>
            <Text style={styles.subtitle}>Your notes, organized and accessible</Text>

            <View style={styles.noteCard}>
                <Text style={styles.noteTitle}>Note 1</Text>
                <Text style={styles.noteContent}>
                    This is a sample note. You can add your notes, tasks, and reminders here.
                </Text>
            </View>

            <View style={styles.noteCard}>
                <Text style={styles.noteTitle}>Note 2</Text>
                <Text style={styles.noteContent}>
                    This is a sample note. You can add your notes, tasks, and reminders here.
                </Text>
            </View>

            <View style={styles.noteCard}>
                <Text style={styles.noteTitle}>Note 3</Text>
                <Text style={styles.noteContent}>
                    This is a sample note. You can add your notes, tasks, and reminders here.
                </Text>
            </View>

            <View style={styles.noteCard}>
                <Text style={styles.noteTitle}>Note 4</Text>
                <Text style={styles.noteContent}>
                    This is a sample note. You can add your notes, tasks, and reminders here.
                </Text>
            </View>

            <View style={styles.noteCard}>
                <Text style={styles.noteTitle}>Note 5</Text>
                <Text style={styles.noteContent}>
                    This is a sample note. You can add your notes, tasks, and reminders here.
                </Text>
            </View>

            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add Note</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
        fontStyle: "italic",
    },
    noteCard: {
        width: "90%",
        backgroundColor: "#FFF8E1",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    noteContent: {
        fontSize: 14,
        color: "#555",
    },
    addButton: {
        backgroundColor: "#fbbc04",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
        width: "90%",
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});