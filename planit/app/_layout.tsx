import { Stack } from "expo-router";
import '../styles/global.css'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="loginGoogle" options={{ headerShown: false }} />
    </Stack>
  );
}
