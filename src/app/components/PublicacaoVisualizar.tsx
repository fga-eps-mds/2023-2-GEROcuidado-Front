import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { IPublicacao } from "../interfaces/forum.interface";
import { IPublicacaoUsuario } from "../interfaces/forum.interface";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../interfaces/user.interface";
import AntDesing from "react-native-vector-icons/AntDesign";
import ModalConfirmation from "./ModalConfirmation";
import { updatePublicacao } from "../services/forum.service";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

interface IProps {
  item: IPublicacaoUsuario;
}

export default function PublicacaoVisualizar({ item }: Readonly<IProps>) {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [adminUsuario, setAdminUsuario] = useState<boolean>();
  const [token, setToken] = useState<string>("");
  const [modalVisibleReportar, setModalVisibleReportar] = useState(false);
  const [contagemReportes, setContagemReportes] = useState(
    item.contagemReportes,
  );

  const getIdUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setIdUsuario(usuario?.id);
    });
  };

  const getAdminUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setAdminUsuario(usuario?.admin);
    });
  };

  const getToken = () => {
    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  const reportarPublicacao = async () => {
    const body: Partial<IPublicacao> = {
      contagemReportes,
    };
    try {
      // setShowLoadingReportar(true);
      setContagemReportes(Number(contagemReportes) + 1);
      const response = await updatePublicacao(item.id, body, token);
      console.log(response);
      item.contagemReportes = Number(response.data?.contagemReportes);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });

      const params = { ...item, ...item.usuario, id: item.id };
      router.replace({
        pathname: "/private/pages/visualizarPublicacao",
        params: params,
      });
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
      // setShowLoadingReportar(false);
    }
  };

  useEffect(() => getIdUsuario(), []);
  useEffect(() => getAdminUsuario(), []);
  useEffect(() => getToken());

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
        <Icon style={styles.semFotoIcon} name="image-outline" size={15} />
      </View>
    );
  };

  const getFormattedDate = (payload: Date | string): string => {
    const date = new Date(payload);
    return date.toLocaleDateString("pt-BR");
  };

  const confirmationReportar = () => {
    setModalVisibleReportar(!modalVisibleReportar);
  };

  const closeModal = () => {
    setModalVisibleReportar(false);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.userInfo}>
        {getFoto(item.foto)}
        <Text style={styles.username}>{item.nome}</Text>

        {idUsuario && (
          <Pressable onPress={confirmationReportar}>
            <AntDesing name="warning" size={20} color={"red"} />
          </Pressable>
        )}
        <ModalConfirmation
          visible={modalVisibleReportar}
          callbackFn={reportarPublicacao}
          closeModal={closeModal}
          message="Reportar publicação?"
          messageButton="Reportar"
        />
      </View>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <View style={styles.underInfo}>
        {idUsuario && adminUsuario && (
          <Text>Reportes: {item.contagemReportes}</Text>
        )}
        <Text style={styles.categoria}>{item.categoria}</Text>
        <Text style={styles.date}>{getFormattedDate(item.dataHora)}</Text>
      </View>
    </View>
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
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  fotoPerfil: {
    width: 65,
    aspectRatio: 1,
    borderRadius: 100,
  },
  username: {
    color: "#000000",
    opacity: 0.6,
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "500",
    width: "80%",
  },
  titulo: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "500",
  },
  descricao: {
    fontSize: 14,
    marginTop: 25,
  },
  underInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 30,
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
  categoria: {
    marginRight: 15,
    color: "#137364",
    fontWeight: "500",
  },
  date: {
    color: "#000000",
    fontSize: 14,
  },
});
