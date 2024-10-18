import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function Home() {
    return (
        <View style={styles.container}>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <MaterialIcons name="menu" size={28} color="black" />
                <Text style={styles.searchText}>Search your notes</Text>
                <Image
                    style={styles.profileIcon}
                    source={{
                        uri: 'https://randomuser.me/api/portraits/men/9.jpg',
                    }}
                />
            </View>

            {/* Empty State */}
            <View style={styles.emptyState}>
                <MaterialIcons name="lightbulb-outline" size={100} color="#fbbc04" />
                <Text style={styles.emptyText}>Notes you add appear here</Text>
            </View>

            {/* Bottom Toolbar */}
            <View style={styles.bottomToolbar}>
                <TouchableOpacity>
                    <MaterialIcons name="check-box" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="brush" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="mic" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="image" size={28} color="black" />
                </TouchableOpacity>
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.floatingButton}>
                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/992/992651.png',
                    }}
                    style={styles.fabIcon}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
        marginHorizontal: 10,
        height: 50,
        justifyContent: 'space-between',
    },
    searchText: {
        color: "#888",
        fontSize: 18,
        marginLeft: 10,
        flex: 1,
    },
    profileIcon: {
        width: 40,
        height: 40,
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
        fontSize: 18,
        marginTop: 10,
    },
    bottomToolbar: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#f5f5f5",
        paddingVertical: 10,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
    },
    floatingButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "#f5f5f5",
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    fabIcon: {
        width: 28,
        height: 28,
    },
});