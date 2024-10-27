import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CreateNoteScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerButton}>
                        <MaterialIcons name="notification-add" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <MaterialIcons name="archive" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <MaterialIcons name="file-download" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Note Content */}
            <View style={styles.noteContent}>
                <TextInput
                    style={styles.titleInput}
                    placeholder="Title"
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.noteInput}
                    placeholder="Note"
                    placeholderTextColor="#999"
                    multiline
                />
            </View>

            {/* Bottom Toolbar */}
            <View style={styles.bottomToolbar}>
                <TouchableOpacity style={styles.toolbarButton}>
                    <MaterialIcons name="add-box" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolbarButton}>
                    <MaterialIcons name="palette" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolbarButton}>
                    <MaterialIcons name="text-fields" size={24} color="#666" />
                </TouchableOpacity>
                <Text style={styles.editedText}>Edited just now</Text>
                <TouchableOpacity style={styles.moreButton}>
                    <MaterialIcons name="more-vert" size={24} color="#666" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButton: {
        marginLeft: 24,
    },
    noteContent: {
        flex: 1,
        padding: 16,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 16,
        color: '#000',
    },
    noteInput: {
        fontSize: 16,
        color: '#000',
        textAlignVertical: 'top',
    },
    bottomToolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    toolbarButton: {
        marginRight: 24,
    },
    editedText: {
        flex: 1,
        color: '#666',
        fontSize: 14,
    },
    moreButton: {
        marginLeft: 8,
    },
});