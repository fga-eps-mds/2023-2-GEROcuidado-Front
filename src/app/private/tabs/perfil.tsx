import React from "react";
import { Text, View, StyleSheet, Image, Button, Pressable } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

interface Props {
  nome: string;
}

export default function Perfil({ nome }: Props) {
  return (
    <View>
      <View style={styles.nameBar}>
        <Image
          source={require("../../../../assets/Idoso.png")}
          style={styles.imagem}
          resizeMode="contain"
        />
        <Text style={styles.name}>Maria Betânia</Text>
      </View>
      <Pressable
        style={[
          styles.button,
          Platform.OS === "ios" ? styles.buttonIOS : styles.button,
        ]}
      >
        <Link href="/private/pages/editarPerfil" asChild>
          <Pressable>
            <View style={styles.buttonContainer}>
              <Image
                source={require("../../../../assets/idoso_botao.png")}
                style={styles.imagemidosobotao}
                resizeMode="contain"
              />
              <View style={styles.textContainer}>
                <Text style={styles.buttonTextEdit}>Perfil</Text>
                <Text style={styles.buttonSubText}>Edite seu perfil</Text>
              </View>
            </View>
          </Pressable>
        </Link>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          Platform.OS === "ios" ? styles.buttonIOS : styles.button,
        ]}
      >
        <Link href="/" asChild>
          <Pressable>
              <MaterialIcons name="logout" size={40} style={styles.icon} />
              <Text style={styles.buttonTextLogout}>Sair</Text>
          </Pressable>
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  nameBar: {
    backgroundColor: "#2CCDB5",
    width: "100%",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  imagem: {
    height: 80,
    width: 80,
    borderRadius: 50,
    zIndex: 1,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -40 }, { translateY: -40 }],
  },
  imagemidosobotao: {
    position: "absolute",
    width: 40,
    height: 40,
    top: 20,
    marginLeft: 20, // Adicione margem à direita para separar a imagem do texto
  },
  name: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 108,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center", // Centralizar verticalmente
    marginLeft: 70,
    top: 12,
  },
  buttonContainer: {
    height: 70,
    flexDirection: "row",
  },

  button: {
    width: "80%",
    alignSelf: "center",
    marginTop: 34,
    height: 80,
    text: "#000",
    backgroundColor: "#FFF",
    borderRadius: 16,
    elevation: 3,
  },
  buttonIOS: {
    width: "80%",
    alignSelf: "center",
    marginTop: 34,
    height: 74,
    text: "#000",
    backgroundColor: "#FFF",
    borderRadius: 12,
  },
  icon: {
    color: "#A5A5A5",
    opacity: 0.8,
    marginLeft: 15,
    marginTop: 18,
    marginBottom: 17,
    width: "15%",
  },
  iconChevron: {
    marginVertical: 15,
    marginLeft: 280,
  },
  buttonTextLogout: {
    fontWeight: "bold",
    fontSize: 18,
    position: "absolute",
    alignItems: "center",
    left: 65,
    marginVertical: 25,
  },
  buttonTextEdit: {
    fontWeight: "bold",
    bottom: 10,
    fontSize: 18,
    marginBottom: 5, // Adicione margem inferior
  },
  buttonSubText: {
    fontSize: 14,
    bottom: 12,
    color: "#808080",
  },
});
