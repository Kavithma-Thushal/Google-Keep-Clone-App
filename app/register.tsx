import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                Alert.alert("Registration Success", "Account has been created!");
                router.push("login");
            }
        } catch (error) {
            Alert.alert("Registration Failed", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <Text style={styles.title}>Create a New Account</Text>
                <Text style={styles.subtitle}>Sign up to start using Google Keep</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("login")}>
                    <Text style={styles.link}>Already have an account? Login</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#faf8ff",
        paddingHorizontal: 20,
    },
    innerContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        height: 50,
        backgroundColor: "#f5f5f5",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#fbbc04",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    link: {
        marginTop: 15,
        color: "#1a73e8",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500",
    },
});