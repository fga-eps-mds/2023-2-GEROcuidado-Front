import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container} testID="loading-container">
      <ActivityIndicator size="large" color="#fff" testID="loading-indicator" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000098",
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 99999,
  },
});
