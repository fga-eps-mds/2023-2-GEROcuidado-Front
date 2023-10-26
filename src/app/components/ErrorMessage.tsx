import React from "react";
import { View } from "react-native";
import { StyleSheet, Text } from "react-native";

interface Props {
  text: string | undefined;
  show: boolean;
}

export default function ErrorMessage({ text, show }: Readonly<Props>) {
  return (
    <View>
      <Text style={styles.error}>{show ? text : "   "}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    height: 15,
    color: "#FF7F7F",
    fontSize: 12,
  },
});
