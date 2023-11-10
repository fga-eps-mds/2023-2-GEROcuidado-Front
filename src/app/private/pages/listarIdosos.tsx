import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";

export default function ListarIdosos() {
  const dadosMock = [
    {
      nome: "Maria Dalva",
    },
    {
      nome: "Sergio Gustamante",
    },
    {
      nome: "Thiago Talvaneo",
    },
    {
      nome: "Seu Silvio",
    },
  ];

  return (
    <View>
      <View style={styles.header}>
        <BackButton route="/private/tabs/perfil" color="#000" />
      </View>
      <View>
        <FlatList
          //style={}
          numColumns={2}
          data={dadosMock}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.cadastroContainer}>
        <AntDesign name="pluscircleo" size={54} />
        <Text style={styles.cadastroText}>Cadastrar {"\n"} um idoso</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  cadastroContainer: {
    alignItems: "center",
    marginTop: 520, // TODO - Corrigir estilo
  },
  cadastroText: {
    marginTop: 8,
  },
});
