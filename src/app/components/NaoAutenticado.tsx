import React from "react";
import { Text, View, StyleSheet } from "react-native";
import LinkButton from "./LinkButton";

export default function NaoAutenticado() {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        Você precisar efetuar login para acessar essa página!
      </Text>
      <LinkButton title="Efetuar Login" href="/public/login" />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    marginTop: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
