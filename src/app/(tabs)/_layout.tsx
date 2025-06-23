import { Tabs } from "expo-router";
import React from "react";
import { APP_COLOR } from "@/utils/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const getIcons = (routeName: string, focused: boolean, size: number) => {
    if (routeName === "index") {
      return (
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={size}
          color={focused ? APP_COLOR.ORANGE : APP_COLOR.GREY}
        />
      );
    }
    if (routeName === "order") {
      return (
        <MaterialCommunityIcons
          name="list-status"
          size={size}
          color={focused ? APP_COLOR.ORANGE : APP_COLOR.GREY}
        />
      );
    }
    if (routeName === "notification") {
      return (
        <MaterialCommunityIcons
          name="bell"
          size={size}
          color={focused ? APP_COLOR.ORANGE : APP_COLOR.GREY}
        />
      );
    }
    if (routeName === "account") {
      return (
        <MaterialCommunityIcons
          name="account"
          size={size}
          color={focused ? APP_COLOR.ORANGE : APP_COLOR.GREY}
        />
      );
    }
    return <></>;
  };
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return getIcons(route.name, focused, size);
        },
        headerShown: false,
        tabBarLabelStyle: { paddingBottom: 3 },
        tabBarActiveTintColor: APP_COLOR.ORANGE,
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Me",
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
        }}
      />
    </Tabs>
  );
}
