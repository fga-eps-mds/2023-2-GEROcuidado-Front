import { Platform, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const iconComponent = (focused: boolean, size: number, iconName: string) => (
    <Icon
      name={focused ? iconName : `${iconName}-outline`}
      style={styles.itemIcon}
      size={size}
    />
  );

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "lightgrey",
          tabBarStyle: {
            backgroundColor: "#2CCDB5",
            height: 65,
          },
          tabBarLabelStyle: {
            marginBottom: Platform.OS === "ios" ? -15 : 10,
            fontWeight: "600",
            color: "#fff",
            fontSize: 14,
          },
        }}
      >
        <Tabs.Screen
          name="rotinas"
          options={{
            title: "Rotinas",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => {
              return iconComponent(focused, size, "calendar");
            },
          }}
        />

        <Tabs.Screen
          name="registros"
          options={{
            title: "Registros",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => {
              return iconComponent(focused, size, "heart");
            },
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            title: "Forum",
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({ size, focused }) => {
              return iconComponent(focused, size, "message");
            },
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => {
              return iconComponent(focused, size, "account");
            },
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  itemIcon: {
    color: "#fff",
    marginTop: Platform.OS === "ios" ? 10 : 0,
    marginBottom: Platform.OS === "ios" ? 0 : -10,
  },
});
