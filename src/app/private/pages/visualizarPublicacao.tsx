import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IPublicacao } from "../../interfaces/forum.interface";
import Publicacao from "../../components/Publicacao";
import { IUser } from "../../interfaces/user.interface";

export default function VisualizarPublicacao() {
  const item = useLocalSearchParams() as unknown as IPublicacao & IUser;
  const publicacao = {
    ...item,
    usuario: {
      id: item.idUsuario,
      foto: item.foto,
      admin: item.admin,
      nome: item.nome,
      email: item.email,
    },
  };

  return (
    <View>
      <View style={styles.header}>
        <Link href="private/tabs/forum">
          <Icon name="chevron-left" size={40} color="#fff" />
        </Link>

        <View>
          <Text style={styles.tituloheader}>Visualizar Publicação</Text>
        </View>
      </View>

      <Publicacao item={publicacao as unknown as IPublicacao} />

      <View style={styles.editar}>
        <Pressable style={styles.editar}>
          <Text style={styles.textoEditar}>Editar</Text>
          <Icon name="pencil" size={20} color={"white"} />
        </Pressable>
      </View>

      <View>
        <Text style={styles.resposta}>Respostas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2CCDB5",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  tituloheader: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    padding: 20,
  },
  pagina: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    padding: 20,
  },
  botaoVoltar: {
    color: "white",
    alignSelf: "flex-start",
  },
  botaoShare: {
    color: "white",
    alignSelf: "flex-start",
  },
  editar: {
    backgroundColor: "#2CCDB5",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 15,
    borderRadius: 14,
  },
  textoEditar: {
    color: "white",
    fontSize: 18,
    margin: 5,
  },
  resposta: {
    fontWeight: "bold",
    color: "black",
    fontSize: 24,
    padding: 20,
  },
  postContainer: {
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  userInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
  },
  date: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 15,
    maxHeight: 100,
    padding: 6,
    textAlign: "justify",
    marginLeft: 10,
    width: "100%",
  },
  fotoPerfil: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 100,
  },
  semFoto: { position: "relative", backgroundColor: "#EFEFF0" },
  semFotoIcon: {
    position: "absolute",
    right: "38%",
    bottom: "38%",
    opacity: 0.4,
    margin: "auto",
    alignSelf: "center",
    zIndex: 1,
  },
  username: {
    color: "#000000",
    opacity: 0.5,
  },
});
