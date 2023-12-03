import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function VisualizarValoresMedidos() {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  useEffect(() => handleUser(), []);

  const novoValor = () => {

  };

  return !user?.id ? <NaoAutenticado /> : (
    <View>
    <View>
    <View style={styles.header}>

    </View>

      <Pressable style={styles.botaoNovoValor} onPress={novoValor}>
        <Icon name="plus" color={"white"} size={20} />
        <Text style={styles.textoBotaoNovoValor}>Novo Valor</Text>
      </Pressable>
    </View>
    </View>
  );
  }

  const styles = StyleSheet.create({

  header: {
    backgroundColor: "#2CCDB5",
    width: "100%",
    padding: 57,
    flexDirection: "row",
    alignItems: "center",
  },

  botaoNovoValor: {
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
  
  textoBotaoNovoValor: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 5,
  },
  });