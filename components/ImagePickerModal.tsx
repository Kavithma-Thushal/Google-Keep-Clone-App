import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type Props = {
    visible: boolean;
    onClose: () => void;
    onImageSelected: (image: string) => void;
};

const ImagePickerModal: React.FC<Props> = ({ visible, onClose, onImageSelected }) => {
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
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
            onImageSelected(result.assets[0].uri);
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
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
    );
};

const styles = StyleSheet.create({
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
});

export default ImagePickerModal;