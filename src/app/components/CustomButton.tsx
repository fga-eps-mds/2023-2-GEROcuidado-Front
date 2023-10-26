import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  title: string;
  callbackFn: () => unknown;
  backgroundColor?: string;
}

export default function CustomButton({
  title,
  callbackFn,
  backgroundColor,
}: Readonly<Props>) {
  const background = backgroundColor ?? "#2CCDB5";

  return (
    <Pressable style={styles(background).button} onPress={() => callbackFn()}>
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
      width: "80%",
      maxWidth: 350,
      paddingVertical: 16,
      paddingHorizontal: 26,
      backgroundColor,
      alignItems: "center",
      borderRadius: 20,
    },
  });
