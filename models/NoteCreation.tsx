import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ImagePicker from "../models/ImagePicker2";
import ImageUpload from "../models/ImageUpload2";
import ColorPalette from "./ColorPalette";

export default function CreateNoteScreen({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isPaletteVisible, setPaletteVisible] = useState(false);
    const [isImagePreviewVisible, setImagePreviewVisible] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const togglePalette = () => {
        setPaletteVisible(!isPaletteVisible);
    };

    const toggleImagePreview = () => {
        setImagePreviewVisible(!isImagePreviewVisible);
    };

    const handleImageSelected = (selectedImage: string) => {
        setImage(selectedImage);
        toggleImagePreview();
        toggleModal();
    };

    const handleColorSelected = (color: string) => {
        console.log("Selected color or background:", color);
        togglePalette();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#666" />
                </TouchableOpacity>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerButton}>
                        <MaterialIcons name="push-pin" size={24} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <MaterialIcons name="notification-add" size={24} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <MaterialIcons name="archive" size={24} color="#666" />
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
                <TouchableOpacity style={styles.toolbarButton} onPress={toggleModal}>
                    <MaterialIcons name="add-box" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolbarButton} onPress={togglePalette}>
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

            {/* Image Picker Modal */}
            <ImagePicker
                visible={isModalVisible}
                onClose={toggleModal}
                onImageSelected={handleImageSelected}
            />

            {/* Image Upload Modal */}
            <ImageUpload
                visible={isImagePreviewVisible}
                onClose={toggleImagePreview}
                image={image}
            />

            {/* Color Palette Modal */}
            <ColorPalette
                visible={isPaletteVisible}
                onClose={togglePalette}
                onColorSelected={handleColorSelected}
            />
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
        marginBottom: 8,
        color: '#666',
    },
    noteInput: {
        fontSize: 16,
        color: '#666',
        textAlignVertical: 'top',
    },
    bottomToolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    toolbarButton: {
        marginRight: 24,
    },
    editedText: {
        flex: 1,
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
    },
    moreButton: {
        marginLeft: 8,
    },
});