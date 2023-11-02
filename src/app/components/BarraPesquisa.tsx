import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { getAllPublicacaoFilter } from "../services/forum.service";
import {
  ECategoriaPublicacao,
  IPublicacaoFilter,
} from "../interfaces/forum.interface";
import Toast from "react-native-toast-message";

export default function BarraPesquisa() {
  const [titulo, setTitulo] = useState("");

  const pesquisar = async () => {
    const body: Partial<IPublicacaoFilter> = {
      titulo,
      // descricao,
      // categoria: categoria as ECategoriaPublicacao,
    };
    try {
      const response = await getAllPublicacaoFilter(body);
      console.log(response.data);
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
    }
  };

  return (
    <View style={styles.barraDePesquisa}>
      <Pressable onPress={pesquisar}>
        <Icon style={styles.iconePesquisar} name="magnify" size={25}></Icon>
      </Pressable>
      <TextInput
        style={styles.inputBarraDePesquisa}
        placeholder="Pesquise uma publicação"
        onChangeText={setTitulo}
        value={titulo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
