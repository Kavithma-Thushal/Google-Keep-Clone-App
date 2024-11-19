import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Search = ({ search, setSearch }) => {
    return (
        <View style={styles.searchBar}>
            <MaterialCommunityIcons
                name="magnify"
                size={26}
                color="black"
                onPress={() => setSearch("")}
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Search your notes"
                placeholderTextColor="#666"
                value={search}
                onChangeText={(term) => setSearch(term)}
            />
            <Image style={styles.profileIcon} source={require("../assets/images/profile.png")} />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ebebf5",
        padding: 10,
        marginTop: 20,
        borderRadius: 38,
        marginHorizontal: 10,
        height: 50,
        justifyContent: 'space-between',
    },
    profileIcon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'black',
    },
});

export default Search;