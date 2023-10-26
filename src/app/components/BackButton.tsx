import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

interface Props {
  canGoBack?: boolean;
}

export default function BackButton({ canGoBack = true }: Readonly<Props>) {
  const goBack = () => {
    canGoBack && router.canGoBack() ? router.back() : false;
  };

  return (
    <Pressable onPress={goBack}>
      <Icon name="chevron-left" size={40} />
    </Pressable>
  );
}
