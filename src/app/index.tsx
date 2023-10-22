import { Image, StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";
import { LinkButton } from "../components/LinkButton";

export default function Home() {
  return (
    <View style={styles.center}>
      <Image source={require('../../assets/logo.png')} />
      <Text style={styles.titulo}>
        Seja um GEROcuidador!
      </Text>
      <LinkButton title="Acessar Fórum" href="pages/Forum" />
      <LinkButton title="Login" href="/pages/login" />
      <LinkButton title="Cadastre-se" backgroundColor="#B47B9D" href="/pages/cadastro" />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titulo: {
    fontSize: 37,
    fontWeight: "700",
    textAlign: "center",
    margin: 20,
    marginBottom: 70
  }
})