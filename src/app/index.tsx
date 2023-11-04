import { Image, StyleSheet, Text, View } from "react-native";

import LinkButton from "./components/LinkButton";
import React from "react";

export default function Home() {
  return (
    <View style={styles.center}>
      <Image source={require("../../assets/logo.png")} />
      <Text style={styles.titulo}> Seja um GEROcuidador! </Text>
      <LinkButton title="Acessar Fórum" href="/private/tabs/forum" />
      <LinkButton title="Login" href="/public/login" />
      <LinkButton
        title="Cadastre-se"
        backgroundColor="#B47B9D"
        href="/public/cadastro"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 37,
    fontWeight: "700",
    textAlign: "center",
    margin: 20,
    marginBottom: 70,
  },
});
