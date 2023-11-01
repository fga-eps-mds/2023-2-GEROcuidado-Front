import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import Publicacao from "../../components/Publicacao";
import { getAllPublicacao } from "../../services/forum.service";
import Toast from "react-native-toast-message";
import { IPublicacao } from "../../interfaces/forum.interface";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";

export default function Forum() {
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  const novaPublicacao = () => {
    router.push("private/pages/criaPublicacao");
  };

  const getIdUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setIdUsuario(usuario?.id);
    });
  };

  const getPublicacoes = () => {
    getAllPublicacao()
      .then((response) => {
        setPublicacoes(response.data as IPublicacao[]);
      })
      .catch((err) => {
        const error = err as { message: string };
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: error.message,
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => getPublicacoes(), []);
  useEffect(() => getIdUsuario());    

  const handleEndReached = () => {
    //TODO implementar a função para atualizar as pages
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.cabecalho}>
        <Text style={styles.textoPublicacoes}>Publicações</Text>
        <View style={styles.barraDePesquisa}>
          <Icon style={styles.iconePesquisar} name="magnify" size={25}></Icon>
          <TextInput
            style={styles.inputBarraDePesquisa}
            placeholder="Pesquise uma publicação"
          />
        </View>
      </View>
      {idUsuario && (
        <Pressable style={styles.botaoCriarPublicacao} onPress={novaPublicacao}>
          <Icon name="plus" color={"white"} size={20}></Icon>
          <Text style={styles.textoBotaoPesquisar}>Nova publicação</Text>
        </Pressable>
      )}

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2CCDB5" />
        </View>
      ) : (
        <FlatList
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5} 
          removeClippedSubviews ={true} 
          data={publicacoes}
          renderItem={({ item }) => <Publicacao cropped={true} item={item} />}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
  titulo: {
    flexDirection: "row",
    alignItems: "center",
  },
  barraDePesquisa: {
    flexDirection: "row",
    alignItems: "center",
    color: "#ADADAD",
    backgroundColor: "white",
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  inputBarraDePesquisa: {
    flex: 1,
  },
  iconePesquisar: {
    color: "#ADADAD",
    marginRight: 5,
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
    margin: "auto",
    marginVertical: 10,
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
