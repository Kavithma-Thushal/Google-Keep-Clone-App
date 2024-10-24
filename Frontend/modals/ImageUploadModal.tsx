import React, {useState} from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    Modal,
    TouchableWithoutFeedback,
    Alert,
    ActivityIndicator,
} from "react-native";
import {storage} from "../FirebaseConfig";
import {ref, uploadBytes} from "firebase/storage";

type Props = {
    visible: boolean;
    onClose: () => void;
    image: string | null;
};

const ImageUploadModal: React.FC<Props> = ({visible, onClose, image}) => {
    const [isUploading, setUploading] = useState(false);

    const uploadImageToFirebase = async () => {
        if (!image) {
            Alert.alert("No Image", "Please select an image first");
            return;
        }

        setUploading(true);

        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const storageRef = ref(storage, `images/${new Date().toISOString()}`);
            await uploadBytes(storageRef, blob);

            Alert.alert("Success", "Image uploaded successfully!");
        } catch (error) {
            Alert.alert("Error", "Failed to upload image.");
        } finally {
            setUploading(false);
            onClose();
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
                    <TouchableWithoutFeedback onPress={() => {
                    }}>
                        <View style={styles.modalViewNoBorder}>
                            {image && <Image source={{uri: image}} style={styles.selectedImageLarge}/>}
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={uploadImageToFirebase}
                                disabled={isUploading}>
                                {isUploading ? (
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator size="small" color="#333"/>
                                        <Text style={styles.uploadingText}> Uploading...</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.uploadButtonText}>Upload</Text>
                                )}
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
    },
    modalViewNoBorder: {
        width: 350,
        padding: 20,
        alignItems: "center",
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
        shadowOffset: {width: 0, height: 4},
        elevation: 3,
        width: "50%",
    },
    uploadButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    uploadingText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});

export default ImageUploadModal;