import { Stack } from "expo-router";
import '../global.css'
import { AuthProvider } from "@/src/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack initialRouteName="(app)/index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="(app)/index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
    
  )
}
