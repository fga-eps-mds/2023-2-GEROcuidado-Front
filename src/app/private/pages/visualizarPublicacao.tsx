import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IPublicacao } from "../../interfaces/forum.interface";
import Publicacao from "../../components/Publicacao";
import { IUser } from "../../interfaces/user.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VisualizarPublicacao() {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

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

  const getIdUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setIdUsuario(usuario?.id);
    });
  };

  const navigate = () => {
    const params = { ...item, ...item.usuario };

    router.push({
      pathname: "/private/pages/editarPublicacao",
      params: params,
    });
  };

  useEffect(() => getIdUsuario());

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

      <View style={styles.publicacao}>
        <Publicacao item={publicacao as unknown as IPublicacao} />
      </View>
      <View style={styles.botoes}>
        {idUsuario && publicacao.idUsuario == idUsuario && (
          <Pressable onPress={navigate}>
            <View style={styles.editar}>
              <Text style={styles.textoEditar}>Editar</Text>
              <Icon name="pencil" size={20} color={"white"} />
            </View>
          </Pressable>
        )}
        {<View style={styles.botaoResponder}>
          <Text style={styles.textoEditar}>Responder</Text>
        </View>}
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
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editar: {
    backgroundColor: "#2CCDB5",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginLeft: 15,
    marginTop: 5,
    borderRadius: 12,
    width: "auto",
    justifyContent: "space-between",
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  textoEditar: {
    color: "white",
    fontSize: 18,
    margin: 5,
  },
  botaoResponder: {
    backgroundColor: "#B4026D",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 5,
    borderRadius: 12,
    width: "auto",
    right: 0,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  resposta: {
    fontWeight: "bold",
    color: "black",
    fontSize: 24,
    padding: 20,
  },
  publicacao: {
    height: "auto",
  },
  /* postContainer: {
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  }, */
  /* postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  }, */
 /*  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  }, */
  /* userInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
  },
  date: {
    fontSize: 12,
  }, */
 /*  postContent: {
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
  }, */
});
