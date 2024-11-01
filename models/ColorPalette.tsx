import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    onColorSelected: (color: string) => void;
};

const ColorPalette: React.FC<Props> = ({ visible, onClose, onColorSelected }) => {
    const colors = [
        '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
        '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed', '#f4cccc', '#c9daf8', '#b6d7a8'
    ];

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Color</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollContainer}
                            >
                                {colors.map((color) => (
                                    <TouchableOpacity
                                        key={color}
                                        style={[styles.circle, { backgroundColor: color }]}
                                        onPress={() => onColorSelected(color)}
                                        accessibilityLabel={`Select color ${color}`}
                                    />
                                ))}
                            </ScrollView>
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
        justifyContent: "flex-end",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: "#ffffff",
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    modalText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    scrollContainer: {
        paddingVertical: 8,
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
});

export default ColorPalette;