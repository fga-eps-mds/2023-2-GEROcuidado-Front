import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AntDesing from "react-native-vector-icons/AntDesign";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IPublicacao } from "../../interfaces/forum.interface";
import { IUser } from "../../interfaces/user.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PublicacaoVisualizar from "../../components/PublicacaoVisualizar";
import BackButton from "../../components/BackButton";
import ModalConfirmation from "../../components/ModalConfirmation";
import {
  deletePublicacaoById,
  updatePublicacao,
} from "../../services/forum.service";
import Toast from "react-native-toast-message";

export default function VisualizarPublicacao() {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [modalVisibleApagar, setModalVisibleApagar] = useState(false);
  const [modalVisibleReportar, setModalVisibleReportar] = useState(false);
  const [showLoadingApagar, setShowLoadingApagar] = useState(false);
  const [showLoadingReportar, setShowLoadingReportar] = useState(false);
  const [token, setToken] = useState<string>("");
  const item = useLocalSearchParams() as unknown as IPublicacao & IUser;

  const getUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setIdUsuario(usuario?.id);
      setIsAdmin(usuario?.admin);
    });
  };

  const getToken = () => {
    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  useEffect(() => getUsuario());
  useEffect(() => getToken());

  const editarPublicacao = () => {
    router.push({
      pathname: "/private/pages/editarPublicacao",
      params: item,
    });
  };

  const apagarPublicacao = async () => {
    setModalVisibleApagar(false);
    setShowLoadingApagar(true);

    try {
      await deletePublicacaoById(item.id, token);
      router.replace("/private/tabs/forum");
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
      setShowLoadingApagar(false);
    }
  };

  const reportarPublicacao = async () => {
    setShowLoadingReportar(true);
    setModalVisibleReportar(false);

    try {
      const body = { contagemReportes: +item.contagemReportes + 1 };
      const response = await updatePublicacao(item.id, body, token);
      item.contagemReportes = Number(response.data?.contagemReportes);
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
      setShowLoadingReportar(false);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <BackButton route="private/tabs/forum" />

        <Text style={styles.tituloheader}>Visualizar Publicação</Text>
      </View>

      <ScrollView>
        <View style={styles.actions}>
          {(isAdmin || item.idUsuario == idUsuario) && (
            <Pressable
              onPress={() => setModalVisibleApagar(true)}
              style={[styles.actionButton, styles.deleteButton]}
            >
              {showLoadingApagar && (
                <ActivityIndicator size="small" color="#FFF" />
              )}

              {!showLoadingApagar && (
                <>
                  <Text style={styles.actionButtonText}>Apagar</Text>
                  <Icon name="delete" size={18} color={"white"} />
                </>
              )}
            </Pressable>
          )}

          <Pressable
            onPress={() => setModalVisibleReportar(true)}
            style={[styles.actionButton, styles.reportButton]}
          >
            {showLoadingReportar && (
              <ActivityIndicator size="small" color="#FFF" />
            )}

            {!showLoadingReportar && (
              <>
                <Text style={styles.actionButtonText}>Reportar</Text>
                <AntDesing name="warning" size={18} color="white" />
              </>
            )}
          </Pressable>

          {idUsuario && item.idUsuario == idUsuario && (
            <Pressable
              onPress={editarPublicacao}
              style={[styles.actionButton, styles.editButton]}
            >
              <Text style={styles.actionButtonText}>Editar</Text>
              <Icon name="pencil" size={18} color={"white"} />
            </Pressable>
          )}
        </View>

        <PublicacaoVisualizar item={item} />
      </ScrollView>

      <ModalConfirmation
        visible={modalVisibleApagar}
        callbackFn={apagarPublicacao}
        closeModal={() => setModalVisibleApagar(false)}
        message="Apagar publicação?"
        messageButton="Apagar"
      />

      <ModalConfirmation
        visible={modalVisibleReportar}
        callbackFn={reportarPublicacao}
        closeModal={() => setModalVisibleReportar(false)}
        message="Reportar publicação?"
        messageButton="Reportar"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    paddingBottom: 5,
  },
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
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
    width: 110,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  editButton: {
    backgroundColor: "#2CCDB5",
  },
  deleteButton: {
    backgroundColor: "#FF7F7F",
  },
  reportButton: {
    backgroundColor: "#FFCC00",
  },
  actionButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
    marginRight: 5,
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
