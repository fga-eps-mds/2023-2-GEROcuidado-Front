import React from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
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
