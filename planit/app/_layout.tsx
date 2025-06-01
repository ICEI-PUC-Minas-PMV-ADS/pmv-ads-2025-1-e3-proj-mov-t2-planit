import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { MenuProvider } from "react-native-popup-menu";

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="loginGoogle" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </MenuProvider>
  );
}
