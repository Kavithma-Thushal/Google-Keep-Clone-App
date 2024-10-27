import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const register = async () => {
        setIsRegistering(true);

        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUserId = credentials.user.uid;

            const user = {
                firebaseUserId,
                email,
                password
            };

            await axios.post(`http://192.168.50.208:8080/api/v1/user/register`, user, {
                headers: { "Content-Type": "application/json" },
            });

            Alert.alert("Registration Success", "User has been registered!");
            router.push("login");
        } catch (error) {
            Alert.alert("Registration Failed", error.message);
        } finally {
            setIsRegistering(false);
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

                <TouchableOpacity style={styles.button} onPress={register} disabled={isRegistering}>
                    {isRegistering ? (
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loggingText}> Registering...</Text>
                        </View>
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
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
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loggingText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 5,
    },
    link: {
        marginTop: 15,
        color: "#1a73e8",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500",
    },
});