import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="screens/login" options={{ title: "Login" }} />
            <Stack.Screen name="screens/register" options={{ title: "Register" }} />
            <Stack.Screen name="screens/dashboard" options={{ title: "Dashboard" }} />
        </Stack>
    );
}