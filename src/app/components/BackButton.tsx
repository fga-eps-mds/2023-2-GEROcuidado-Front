import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";

interface Props {
  color?: string;
  canGoBack?: boolean;
  route?: string;
}

export default function BackButton({
  color = "#fff",
  canGoBack = true,
  route,
}: Readonly<Props>) {
  const goBack = () => {
    if (route) {
      router.push(route);
      return;
    }

    canGoBack && router.canGoBack() ? router.back() : false;
  };

  return (
    <Pressable
      onPress={goBack}
      style={styles.backButton}
      testID="back-button-pressable"
    >
      <Icon
        name="chevron-left"
        color={color}
        size={40}
        testID="back-button-icon"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    justifyContent: "flex-start",
    marginRight: 10,
  },
});
