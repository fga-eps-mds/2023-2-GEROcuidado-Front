import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import Publicacao from "../../components/Publicacao";
import { getAllPublicacao } from "../../services/forum.service";
import Toast from "react-native-toast-message";
import { IOrder, IPublicacao } from "../../interfaces/forum.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import BarraPesquisa from "../../components/BarraPesquisa";
import { ScrollView } from "react-native-gesture-handler";

export default function Forum() {
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCarregarMais, setLoadingCarregarMais] = useState(true);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [adminUsuario, setAdminUsuario] = useState<boolean>();
  const [offset, setOffset] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const order: IOrder = {
    column: "dataHora",
    dir: "DESC",
  };

  const novaPublicacao = () => {
    router.push("private/pages/criaPublicacao");
  };
  const reports = () => {
    router.push("private/pages/reports/adm_reports");
  };

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

  const getPublicacoes = (reset = false) => {
    setLoadingCarregarMais(true);
    setLoading(reset);

    getAllPublicacao(offset, { titulo }, order)
      .then((response) => {
        const newPublicacoes = response.data as IPublicacao[];

        reset
          ? setPublicacoes(newPublicacoes)
          : setPublicacoes([...publicacoes, ...newPublicacoes]);
      })
      .catch((err) => {
        const error = err as { message: string };
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
        setLoadingCarregarMais(false);
      });
  };

  const handlePesquisar = (newTitulo: string) => {
    if (timer) clearTimeout(timer);
    const temp = setTimeout(() => setTitulo(newTitulo), 500);
    setTimer(temp);
  };

  useEffect(() => getPublicacoes(), [offset]);
  useEffect(() => getPublicacoes(true), [titulo]);
  useEffect(() => getIdUsuario(), []);
  useEffect(() => getAdminUsuario(), []);

  return (
    <View style={styles.scrollView}>
      <View style={styles.cabecalho}>
        <Text style={styles.textoPublicacoes}>Publicações</Text>
        <BarraPesquisa callbackFn={handlePesquisar} />
      </View>

      <View style={styles.botoes}>
        {idUsuario && adminUsuario && (
          <View style={styles.reportada}>
            <Pressable
              style={styles.botaoPublicacaoReportada}
              onPress={reports}
            >
              <Text style={styles.textoBotaoPesquisar}>Reportes </Text>
            </Pressable>
          </View>
        )}
        {idUsuario && (
          <Pressable
            style={styles.botaoCriarPublicacao}
            onPress={novaPublicacao}
          >
            <Icon name="plus" color={"white"} size={20}></Icon>
            <Text style={styles.textoBotaoPesquisar}>Nova publicação</Text>
          </Pressable>
        )}
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2CCDB5" />
        </View>
      )}

      {!loading && (
        <ScrollView>
          {publicacoes.map((publicacao) => (
            <View key={publicacao.id}>
              <Publicacao crop={true} item={publicacao} />
            </View>
          ))}

          {publicacoes.length > 0 && publicacoes.length % 10 === 0 && (
            <Pressable
              style={styles.botaoCarregarMais}
              onPress={() => setOffset(offset + 1)}
            >
              {loadingCarregarMais && (
                <ActivityIndicator size="small" color="#2CCDB5" />
              )}

              {!loadingCarregarMais && (
                <Text style={styles.botaoCarregarMaisText}>Carregar mais</Text>
              )}
            </Pressable>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 50,
  },
  scrollView: {
    backgroundColor: "#fff",
    height: "100%",
  },
  cabecalho: {
    flexDirection: "column",
    backgroundColor: "#2CCDB5",
    padding: 10,
  },
  iconeVoltar: {
    color: "white",
    alignSelf: "flex-start",
  },
  botaoPesquisar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    borderRadius: 14,
  },
  textoBotaoPesquisar: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 5,
  },
  textoPublicacoes: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  botaoCriarPublicacao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B4026D",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: 10,
    marginVertical: 10,
  },
  botaoCarregarMais: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginHorizontal: "auto",
    marginVertical: 25,
    height: 40,
  },
  botaoPublicacaoReportada: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2CCDB5",
    padding: 5,
    borderRadius: 14,
  },
  reportada: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
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
  },
  botaoCarregarMaisText: {
    color: "#2CCDB5",
    fontWeight: "600",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  botoes: {
    flexDirection: "row",
  },
});
