import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { ErrorBoundaryProps, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";
import AppProvider from "@/context/app.context";
import { Button, Text, View } from "react-native";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 10, gap: 15 }}>
        <View
          style={{
            backgroundColor: "#333",
            padding: 10,

            borderRadius: 3,
            gap: 10,
          }}>
          <Text style={{ color: "red", fontSize: 20 }}>
            Something went wrong
          </Text>

          <Text style={{ color: "#fff" }}>{error.message}</Text>
        </View>

        <Button title="Try Again?" onPress={retry} />
      </View>
    </SafeAreaView>
  );
}
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };
  return (
    <ThemeProvider value={navTheme}>
      <RootSiblingParent>
        <AppProvider>
          {/* <SafeAreaView style={{ flex: 1 }}> */}
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(auth)/signup"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/verify"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/login"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/welcome"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/product/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          {/* </SafeAreaView> */}
        </AppProvider>
      </RootSiblingParent>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
