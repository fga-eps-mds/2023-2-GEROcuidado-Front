import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import EmConstrucao from "../../components/EmConstrucao";

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

export default function Rotinas() {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const novaRotina = () => {
    router.push("private/pages/cadastrarRotina");
  };

  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };
  useEffect(() => handleUser(), []);

  return !user?.id ? <NaoAutenticado /> : 
  <View> 
    <Pressable
      style={styles.botaoCriarRotina}
      onPress={novaRotina}
    >
      <Icon name="plus" color={"white"} size={20}></Icon>
      <Text style={styles.textoBotaoCriarRotina}>Nova Rotina</Text>
    </Pressable>
  </View>;
  ;
}

const styles = StyleSheet.create({
  botaoCriarRotina: {
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
  textoBotaoCriarRotina: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 5,
  },
});
