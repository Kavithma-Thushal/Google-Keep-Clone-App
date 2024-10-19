import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function Dashboard() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
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

            {/* Image Modal */}
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
                                <TouchableOpacity style={styles.modalButton}>
                                    <MaterialIcons name="photo" size={24} color="black" />
                                    <Text style={styles.modalButtonText}>Choose Image</Text>
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
        marginTop: 25
    },
    modalView: {
        width: 350,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "flex-start",
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