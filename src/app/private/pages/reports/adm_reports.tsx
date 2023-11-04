import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import BarraPesquisa from "../../../components/BarraPesquisa";
import BackButton from "../../../components/BackButton";
import { IOrder, IPublicacao } from "../../../interfaces/forum.interface";
import Publicacao from "../../../components/Publicacao";
import { getAllPublicacaoReportadas } from "../../../services/forum.service";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../../interfaces/user.interface";

// CRIANDO OBJETOS DE COMENTÁRIOS
export default function HomeScreen() {
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(true);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [loadingCarregarMais, setLoadingCarregarMais] = useState(true);
  const [offset, setOffset] = useState(0);
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

  const getPublicacoes = (reset = false) => {
    setLoadingCarregarMais(true);
    setLoading(reset);

    getAllPublicacaoReportadas(offset, { titulo }, order)
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.cabecalho}>
        <View style={styles.header}>
          <BackButton route="private/tabs/forum" />
          <Text style={styles.textoPublicacoes}>Publicações Reportadas</Text>
        </View>
        <BarraPesquisa callbackFn={handlePesquisar} />
      </View>
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
  cabecalho: {
    backgroundColor: "#2CCDB5",
    padding: 10,
  },
  iconeVoltar: {
    color: "white",
    alignSelf: "flex-start",
  },
  titulo: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoTitulo: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    padding: 20,
  },
  barraDePesquisa: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputBarraDePesquisa: {
    flex: 1,
    height: 40,
    borderColor: "white",
    textAlign: "center",
    color: "#ADADAD",
    backgroundColor: "white",
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 14,
  },
  iconePesquisar: {
    position: "absolute",
    right: 15,
    color: "#ADADAD",
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
    fontSize: 16,
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
    padding: 5,
    borderRadius: 14,
  },
  publicacao: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  iconReports: {
    paddingLeft: 15,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  botaoCarregarMaisText: {
    color: "#2CCDB5",
    fontWeight: "600",
    fontSize: 14,
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
});
