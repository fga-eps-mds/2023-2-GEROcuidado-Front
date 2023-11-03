import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, TextInput, View } from "react-native";

interface IProps {
  callbackFn: (titulo: string) => unknown;
}

export default function BarraPesquisa({ callbackFn }: IProps) {
  const [titulo, setTitulo] = useState("");

  return (
    <View style={styles.barraDePesquisa}>
      <Icon style={styles.iconePesquisar} name="magnify" size={25}></Icon>
      <TextInput
        style={styles.inputBarraDePesquisa}
        placeholder="Pesquise uma publicação"
        onChangeText={(newValue) => {
          setTitulo(newValue);
          callbackFn(newValue);
        }}
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
