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
import {
  IPublicacao,
  IPublicacaoParams,
  IPublicacaoUsuario,
} from "../../interfaces/forum.interface";
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
  const params = useLocalSearchParams() as unknown as IPublicacaoParams;
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [modalVisibleApagar, setModalVisibleApagar] = useState(false);
  const [modalVisibleReportar, setModalVisibleReportar] = useState(false);
  const [showLoadingApagar, setShowLoadingApagar] = useState(false);
  const [showLoadingReportar, setShowLoadingReportar] = useState(false);
  const [token, setToken] = useState<string>("");
  const [publicacao, setPublicacao] = useState<IPublicacaoUsuario | null>(null);

  const mapIdUsuarioReporte = (payload: string) => {
    if (!payload) return [];

    return payload.split(",").map((item) => Number(item));
  };

  const getPublicacaoFromParams = () => {
    const payload: IPublicacaoUsuario = {
      ...params,
      idUsuarioReporte: mapIdUsuarioReporte(params.idUsuarioReporte),
    };
    setPublicacao(payload);
  };

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

  const editarPublicacao = () => {
    router.push({
      pathname: "/private/pages/editarPublicacao",
      params: publicacao as IPublicacaoUsuario,
    });
  };

  const apagarPublicacao = async () => {
    setModalVisibleApagar(false);
    setShowLoadingApagar(true);

    const id = (publicacao as IPublicacaoUsuario).id;

    try {
      await deletePublicacaoById(id, token);
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

    const publicacaoLoaded = publicacao as IPublicacaoUsuario;

    const body = {
      idUsuarioReporte: [
        ...publicacaoLoaded.idUsuarioReporte,
        Number(idUsuario),
      ],
    };

    updateReporte(publicacaoLoaded, body);
  };

  const cancelarReporte = async () => {
    setShowLoadingReportar(true);
    setModalVisibleReportar(false);

    const publicacaoLoaded = publicacao as IPublicacaoUsuario;

    const idRemovido = publicacaoLoaded.idUsuarioReporte.filter(id => id !== Number(idUsuario));

    const body = {
      idUsuarioReporte: idRemovido,
    };

    updateReporte(publicacaoLoaded, body);
  };

  const updateReporte =async (publicacaoLoaded: IPublicacaoUsuario, body: Partial<IPublicacao>) => {
    try {
      const response = await updatePublicacao(publicacaoLoaded.id, body, token);
      setPublicacao({
        ...publicacao,
        ...(response.data as IPublicacaoUsuario),
      });
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

  useEffect(() => getPublicacaoFromParams(), []);
  useEffect(() => getUsuario(), []);
  useEffect(() => getToken(), []);

  return (
    <View>
      <View style={styles.header}>
        <BackButton route="private/tabs/forum" />

        <Text style={styles.tituloheader}>Visualizar Publicação</Text>
      </View>

      <ScrollView>
        <View style={styles.actions}>
          {(isAdmin || publicacao?.idUsuario == idUsuario) && (
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

            {idUsuario &&
            publicacao?.idUsuario != idUsuario && (
              <Pressable
                onPress={() => setModalVisibleReportar(true)}
                style={[styles.actionButton, styles.reportButton]}
              >
                {showLoadingReportar && (
                  <ActivityIndicator size="small" color="#FFF" />
                )}

                {!showLoadingReportar && publicacao?.idUsuarioReporte.includes(idUsuario) && (
                  <>
                    <Text style={styles.actionButtonText}>Desfazer</Text>
                    <Icon name="undo" size={18} color="white" />
                  </>
                )}
                {!showLoadingReportar && !publicacao?.idUsuarioReporte.includes(idUsuario) && (
                  <>
                    <Text style={styles.actionButtonText}>Reportar</Text>
                    <AntDesing name="warning" size={18} color="white" />
                  </>
                )}
              </Pressable>
            )}

          {idUsuario && publicacao?.idUsuario == idUsuario && (
            <Pressable
              onPress={editarPublicacao}
              style={[styles.actionButton, styles.editButton]}
            >
              <Text style={styles.actionButtonText}>Editar</Text>
              <Icon name="pencil" size={18} color={"white"} />
            </Pressable>
          )}
        </View>

        {publicacao && <PublicacaoVisualizar item={publicacao} />}
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
        callbackFn={publicacao?.idUsuarioReporte.includes(Number(idUsuario))? cancelarReporte : reportarPublicacao}
        closeModal={() => setModalVisibleReportar(false)}
        message= {publicacao?.idUsuarioReporte.includes(Number(idUsuario))? "Desfazer reporte?" : "Reportar publicação?"}
        messageButton={publicacao?.idUsuarioReporte.includes(Number(idUsuario))? "Desfazer" : "Reportar"}
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
