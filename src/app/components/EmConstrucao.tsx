import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EmConstrucao() {
  return (
    <View style={styles.container} testID="em-construcao-container">
      <Icon name="progress-wrench" color="#2CCDB5" size={60} />
      <Text style={styles.text}>Página em construção!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    marginTop: "75%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
