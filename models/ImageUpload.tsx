import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ImageUpload = ({ onClose, image }) => {
    return (
        <TouchableWithoutFeedback onPress={() => { onClose(); }}>
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={() => { }}>
                    <View>
                        {image && (<Image source={{ uri: image }} style={styles.selectedImageLarge} />)}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedImageLarge: {
        width: 412,
        height: 300,
    },
});

export default ImageUpload;