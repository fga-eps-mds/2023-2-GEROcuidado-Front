import {
  FlatList,
  Image,
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

// CRIANDO OBJETOS DE COMENTÁRIOS
export default function HomeScreen() {
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>([]);

  const novaPublicacao = () => {
    router.push("private/pages/criaPublicacao");
  };

  const getPublicacoes = () => {
    getAllPublicacao().then((response) => {
      setPublicacoes(response.data as IPublicacao[]);
    }).catch((err) => {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    });
  };

  useEffect(() => getPublicacoes(), []);

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          {/* BARRA DE PESQUISA */}
          <View style={styles.cabecalho}>
            <View style={styles.barraDePesquisa}>
              <TextInput
                style={styles.inputBarraDePesquisa}
                placeholder="Pesquise uma notícia"
              // onChangeText={(text) => setSearchText(text)}
              />
              <Pressable style={styles.botaoPesquisar} onPress={() => { }}>
                <Icon
                  style={styles.iconePesquisar}
                  name="magnify"
                  size={30}
                ></Icon>
              </Pressable>
            </View>
          </View>
          <View style={styles.publicacao}>
            <Text style={styles.textoPublicacoes}>Publicações</Text>
            <Pressable
              style={styles.botaoCriarPublicacao}
              onPress={novaPublicacao}
            >
              <Text style={styles.textoBotaoPesquisar}>Nova publicação</Text>
              <Icon name="pencil" color={"white"} size={25}></Icon>
            </Pressable>
          </View>
          <FlatList
            data={publicacoes}
            renderItem={({ item }) => (
              <Publicacao item={item} />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

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
    fontSize: 24,
    fontWeight: "600",
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
