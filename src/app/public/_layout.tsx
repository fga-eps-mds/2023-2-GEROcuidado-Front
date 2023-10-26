import React from "react";
import Toast from "react-native-toast-message";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function PagesLayout() {
  return (
    <>
      <View style={{ zIndex: 9999 }}>
        <Toast />
      </View>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
