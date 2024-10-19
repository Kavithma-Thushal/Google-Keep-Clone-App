import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { storage } from '../FirebaseConfig';
import { ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function Dashboard() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isImagePreviewVisible, setImagePreviewVisible] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleImagePreview = () => {
        setImagePreviewVisible(!isImagePreviewVisible);
    };

    // Choose Image
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            toggleImagePreview();
            toggleModal();
        }
    };

    // Upload Image
    const uploadImageToFirebase = async () => {
        if (!image) {
            Alert.alert("No Image", "Please select an image first.");
            return;
        }

        try {
            const response = await fetch(image);
            const blob = await response.blob();

            const storageRef = ref(storage, `images/${Date.now()}`);
            await uploadBytes(storageRef, blob);
            Alert.alert("Success", "Image uploaded successfully!");
            toggleImagePreview();
        } catch (error) {
            Alert.alert("Upload Error", error.message);
        }
    };

    return (
        <View style={styles.container}>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <MaterialIcons name="menu" size={26} color="black" />
                <Text style={styles.searchText}>Search your notes</Text>
                <MaterialIcons name="view-module" size={26} color="black" style={styles.viewIcon} />
                <Image style={styles.profileIcon} source={require('../assets/images/profile.png')} />
            </View>

            {/* Empty State */}
            <View style={styles.emptyState}>
                <MaterialIcons name="lightbulb-outline" size={100} color="#fbbc04" />
                <Text style={styles.emptyText}>Notes you add appear here</Text>
            </View>

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
                <TouchableOpacity style={styles.toolbarButton} onPress={toggleModal}>
                    <MaterialIcons name="image" size={25} color="gray" />
                </TouchableOpacity>
            </View>

            {/* Image Selection Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Add Image</Text>
                                <TouchableOpacity style={styles.modalButton}>
                                    <MaterialIcons name="camera-alt" size={24} color="black" />
                                    <Text style={styles.modalButtonText}>Take Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                                    <MaterialIcons name="photo" size={24} color="black" />
                                    <Text style={styles.modalButtonText}>Choose Image</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Image Preview Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isImagePreviewVisible}
                onRequestClose={toggleImagePreview}
            >
                <TouchableWithoutFeedback onPress={toggleImagePreview}>
                    <View style={styles.modalContainerNoBorder}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.modalViewNoBorder}>
                                {image && <Image source={{ uri: image }} style={styles.selectedImageLarge} />}
                                <TouchableOpacity style={styles.uploadButton} onPress={uploadImageToFirebase}>
                                    <Text style={styles.uploadButtonText}>Upload</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Floating Plus Button */}
            <TouchableOpacity style={styles.floatingButton}>
                <Image style={styles.fabIcon} source={require('../assets/images/plus_button.png')} />
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
        marginTop: 10,
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
    viewIcon: {
        marginRight: 10,
    },
    profileIcon: {
        width: 35,
        height: 35,
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
        borderRadius: 20,
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },
    modalView: {
        width: 350,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        elevation: 5,
    },
    modalViewNoBorder: {
        width: 350,
        padding: 20,
        alignItems: "center",
    },
    modalContainerNoBorder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "left",
        width: "100%",
    },
    modalButton: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        width: "100%",
    },
    modalButtonText: {
        marginLeft: 10,
        fontSize: 16,
        textAlign: "left",
    },
    selectedImageLarge: {
        width: 385,
        height: 285,
        borderRadius: 10,
        marginTop: 10,
    },
    uploadButton: {
        backgroundColor: "#fbbc04",
        paddingVertical: 12,
        marginTop: 15,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
        width: "50%",
    },
    uploadButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});