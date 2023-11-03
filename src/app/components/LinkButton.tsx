import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { router } from "expo-router";

interface Props {
  title: string;
  href: string;
  backgroundColor?: string;
}

export default function LinkButton({ title, href, backgroundColor }: Props) {
  const background = backgroundColor ?? "#2CCDB5";

  const handleNavigate = () => router.push(href);

  return (
    <Pressable
      testID="link-button"
      style={styles(background).button}
      onPress={handleNavigate}
    >
      <Text style={styles(background).buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = (backgroundColor: string) =>
  StyleSheet.create({
    buttonText: {
      fontSize: 18,
      color: "white",
      fontWeight: "700",
    },
    button: {
      width: "100%",
      marginBottom: 25,
      maxWidth: 350,
      paddingVertical: 16,
      paddingHorizontal: 26,
      backgroundColor,
      alignItems: "center",
      borderRadius: 20,
    },
  });
