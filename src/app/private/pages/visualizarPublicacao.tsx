import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IPublicacao } from "../../interfaces/forum.interface";
import { IUser } from "../../interfaces/user.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PublicacaoVisualizar from "../../components/PublicacaoVisualizar";
import BackButton from "../../components/BackButton";
import ModalConfirmation from "../../components/ModalConfirmation";
import { deletePublicacaoById } from "../../services/forum.service";
import Toast from "react-native-toast-message";

export default function VisualizarPublicacao() {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [adminUsuario, setAdminUsuario] = useState<boolean>();
  const [modalVisibleApagar, setModalVisibleApagar] = useState(false);
  const [token, setToken] = useState<string>("");
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

  useEffect(() => getIdUsuario());
  useEffect(() => getToken());
  useEffect(() => getAdminUsuario(), []);

  const apagarPublicacao = async () => {
    try {
      //setShowLoadingApagar(true);
      const response = await deletePublicacaoById(item.id, token);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      router.replace("/private/tabs/forum");
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
      //setShowLoadingApagar(false);
    }
  };

  const confirmationApagar = () => {
    setModalVisibleApagar(!modalVisibleApagar);
  };

  const closeModal = () => {
    setModalVisibleApagar(false);
  };

  return (
    <View>
      <View style={styles.header}>
        <BackButton route="private/tabs/forum" />

        <Text style={styles.tituloheader}>Visualizar Publicação</Text>
      </View>

      <PublicacaoVisualizar item={publicacao as unknown as IPublicacao} />

      {idUsuario && publicacao.idUsuario == idUsuario && (
        <Pressable onPress={navigate} style={styles.editar}>
          <Text style={styles.textoEditar}>Editar</Text>
          <Icon name="pencil" size={20} color={"white"} />
        </Pressable>
      )}

      {adminUsuario && (
        <Pressable onPress={confirmationApagar}>
          <Text style={styles.apagar}>Apagar publicação</Text>
        </Pressable>
      )}

      <ModalConfirmation
        visible={modalVisibleApagar}
        callbackFn={apagarPublicacao}
        closeModal={closeModal}
        message="Apagar publicação?"
        messageButton="Apagar"
      />

      {/* <View style={styles.botoes}> */}
      {/* Parte relacionado ao incremento */}
      {/* {idUsuario && publicacao.idUsuario == idUsuario && (
          <View style={styles.botaoResponder}>
            <Text style={styles.textoEditar}>Responder</Text>
          </View>
        )} */}
      {/* </View> */}
      {/* Parte relacionado ao incremento */}
      {/* <View>
        <Text style={styles.resposta}>Respostas</Text>
      </View> */}
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
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editar: {
    backgroundColor: "#2CCDB5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
    width: 200,
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
  apagar: {
    color: "#FF7F7F",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "600",
    margin: 20,
  },
});
