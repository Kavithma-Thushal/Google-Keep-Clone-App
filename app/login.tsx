import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const login = async () => {
        setIsLoggingIn(true); // Disable button when login starts

        try {
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            if (credentials) {
                Alert.alert("Success", "Login Successfully!");
                router.push("dashboard");
            }
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        } finally {
            setIsLoggingIn(false); // Enable button after login process completes
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <Text style={styles.title}>Welcome Back to Keep!</Text>
                <Text style={styles.subtitle}>Login to access your notes</Text>

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
                    placeholder="Enter your password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />

                {/* Disable the button during login by adding `disabled={isLoggingIn}` and applying a dimmed style */}
                <TouchableOpacity
                    style={[styles.button, isLoggingIn && styles.buttonDisabled]} // Apply buttonDisabled style when logging in
                    onPress={login}
                    disabled={isLoggingIn} // Disable button when logging in
                >
                    {isLoggingIn ? (
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loggingText}> Logging...</Text>
                        </View>
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("register")}>
                    <Text style={styles.link}>Didn't have an account? Create</Text>
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
    buttonDisabled: {
        backgroundColor: "#f3b82a", // Dimmed color for disabled button
        opacity: 0.7, // Slight transparency to show it's disabled
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