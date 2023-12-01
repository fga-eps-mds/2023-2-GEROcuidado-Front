import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import { View, StyleSheet } from "react-native";

export default function editarMetrica() {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  useEffect(() => handleUser(), []);

  return !user?.id ? <NaoAutenticado /> : (
    <View style = {styles.header}>

    </View>
  )
  }

  const styles = StyleSheet.create({

  header: {
    backgroundColor: "#2CCDB5",
    width: "100%",
    padding: 57,
    flexDirection: "row",
    alignItems: "center",
  },
  });