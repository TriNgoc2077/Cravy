import { router } from "expo-router";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getAccountAPI } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootPage = () => {
  const { setAppState } = useCurrentApp();
  const [error, setError] = useState<any>();
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const res = await getAccountAPI();
        if (res.data) {
          setAppState({
            user: res.data.user,
            access_token: await AsyncStorage.getItem("access_token"),
          });
          router.replace("/(tabs)");
        } else {
          //error
          router.replace("/(auth)/welcome");
        }
      } catch (e) {
        setError(() => {
          throw new Error("Cannot connect to server !");
        });
        // console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);
  // if (true) {
  //   return <Redirect href={"/(tabs)"}></Redirect>;
  // }
  return <></>;
};

export default RootPage;
