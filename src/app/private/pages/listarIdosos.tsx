import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import CardIdoso from "../../components/CardIdoso";
import CustomButton from "../../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
    {
      nome: "Pedro",
    },
    {
      nome: "Guilherme",
    },
    {
      nome: "Eren"
    }
  ];

  return (
    <View style={styles.screen}>

      <View style={styles.backButton}>
        <BackButton route="/private/tabs/perfil" color="#000" />
      </View>

      <View>
        <Text style={styles.header}>De quem está cuidando agora?</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
              style={[styles.actionButton, styles.editButton]}
            >
              <Text style={styles.actionButtonText}>Filtro</Text>
            </Pressable>
      </View>

      <View style={styles.cardIdoso}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={dadosMock}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.idoso}>
              <CardIdoso nome ={item.nome}/>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.cadastroContainer}>
        <AntDesign name="pluscircleo" size={54} />
        <Text style={styles.cadastroText}>Cadastrar um idoso</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  backButton: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  header:{
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#3d3d3d",
    marginBottom: 15,
    textAlign: "center",
  },
  cadastroContainer: {
    alignItems: "center",
    maxWidth: "auto",
  },
  cadastroText: {
    marginTop: 8,
    fontWeight: "500",
  },
  cardIdoso: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "65%",
  },
  idoso: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 32,
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
  actionButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
    marginRight: 5,
  },
    actions: {
      alignItems: "center",
      width: "100%",
      padding: 10,
      paddingBottom: 15,
    },
});
