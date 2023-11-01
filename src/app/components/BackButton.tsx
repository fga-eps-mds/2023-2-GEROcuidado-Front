import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";

interface Props {
  canGoBack?: boolean;
  route?: string;
}

export default function BackButton({
  canGoBack = true,
  route,
}: Readonly<Props>) {
  const goBack = () => {
    if (route) {
      router.push(route);
    }

    canGoBack && router.canGoBack() ? router.back() : false;
  };

  return (
    <Pressable style={styles.backButton} onPress={goBack}>
      <Icon
        name="chevron-left"
        size={60}
        style={{ color: "white", alignSelf: "flex-start" }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton :{
    width: "10%",
    justifyContent: "flex-start",
  }
})

