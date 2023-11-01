import React from "react";
import Toast from "react-native-toast-message";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function PrivatePagesLayout() {
  return (
    <>
      <View style={{ zIndex: 9999 }}>
        <Toast data-testid="ToastComponent" />
      </View>
      <Stack data-testid="StackComponent" screenOptions={{ headerShown: false }} />
    </>
  );
}
