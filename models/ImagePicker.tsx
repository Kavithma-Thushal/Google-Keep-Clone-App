import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type Props = {
    visible: boolean;
    onClose: () => void;
    onImageSelected: (image: string) => void;
};

const CustomImagePicker: React.FC<Props> = ({ visible, onClose, onImageSelected }) => {

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
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.modalButton}>
                                <MaterialIcons name="camera-alt" size={24} color="black" />
                                <Text style={styles.modalButtonText}>Take photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                                <MaterialIcons name="photo" size={24} color="black" />
                                <Text style={styles.modalButtonText}>Add image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton}>
                                <MaterialIcons name="brush" size={24} color="black" />
                                <Text style={styles.modalButtonText}>Drawing</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton}>
                                <MaterialIcons name="mic" size={24} color="black" />
                                <Text style={styles.modalButtonText}>Recording</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton}>
                                <MaterialIcons name="check-box" size={24} color="black" />
                                <Text style={styles.modalButtonText}>Checkboxes</Text>
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        padding: 16,
        elevation: 5,
    },
    modalButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    modalButtonText: {
        marginLeft: 16,
        fontSize: 16,
        color: "black",
    },
});

export default CustomImagePicker;