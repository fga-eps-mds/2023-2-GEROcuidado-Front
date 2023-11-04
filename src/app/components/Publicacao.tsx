import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { IPublicacao } from "../interfaces/forum.interface";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

interface IProps {
  item: IPublicacao;
  crop?: boolean;
}

export default function Publicacao({ item, crop }: Readonly<IProps>) {
  const hasFoto = (foto: string | null | undefined) => {
    if (!foto) return false;

    const raw = foto.split("data:image/png;base64,")[1];
    return raw.length > 0;
  };

  const getFoto = (foto: string | null | undefined) => {
    if (hasFoto(foto)) {
      return (
        <Image source={{ uri: foto as string }} style={styles.fotoPerfil} />
      );
    }

    return (
      <View style={[styles.semFoto, styles.fotoPerfil]}>
        <Icon
          style={styles.semFotoIcon}
          name="image-outline"
          size={15}
          testID="placeholder-icon"
        />
      </View>
    );
  };

  const getFormattedDate = (payload: Date | string): string => {
    const date = new Date(payload);
    return date.toLocaleDateString("pt-BR");
  };

  const navigate = () => {
    const params = { ...item, ...item.usuario, id: item.id };

    router.push({
      pathname: "/private/pages/visualizarPublicacao",
      params: params,
    });
  };

  const getNome = (nome: string): string => {
    if (!crop) return nome;

    return nome.length < 25 ? nome : nome.slice(0, 25) + "...";
  };

  const getTitulo = (titulo: string): string => {
    if (!crop) return titulo;

    return titulo.length < 30 ? titulo : titulo.slice(0, 30) + "...";
  };

  const getDescricao = (descricao: string): string => {
    if (!crop) return descricao;

    return descricao.length < 150 ? descricao : descricao.slice(0, 150) + "...";
  };

  return (
    <Pressable onPress={navigate} style={styles.postContainer}>
      <View style={styles.postHeader}>
        {getFoto(item.usuario?.foto)}
        <View style={styles.userInfo}>
          <Text style={styles.title}>{getTitulo(item.titulo)}</Text>
          <Text style={styles.categoria}>{item.categoria}</Text>
          <View style={styles.subInfo}>
            <Text style={styles.username}>
              {getNome(item.usuario?.nome as string)}
            </Text>
            <Text style={styles.date}>{getFormattedDate(item.dataHora)}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.postContent}>{getDescricao(item.descricao)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    margin: 10,
    borderRadius: 14,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  userInfo: {
    marginLeft: 10,
    width: "100%",
  },
  subInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  categoria: {
    opacity: 0.5,
    marginTop: 5,
  },
  date: {
    color: "#000000",
    opacity: 0.5,
    fontSize: 10,
    marginLeft: 10,
  },
  postContent: {
    fontSize: 16,
    marginTop: 15,
  },
  fotoPerfil: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 100,
  },
  semFoto: { position: "relative", backgroundColor: "#EFEFF0" },
  semFotoIcon: {
    position: "absolute",
    right: "34%",
    bottom: "34%",
    opacity: 0.4,
    margin: "auto",
    alignSelf: "center",
    zIndex: 1,
  },
  username: {
    color: "#000000",
    opacity: 0.5,
    fontSize: 13,
  },
});
