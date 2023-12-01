import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import { View, StyleSheet, Pressable, Text} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function editarMetrica() {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  useEffect(() => handleUser(), []);

  const editarMetricacriada = () => {
    // Adicione a lógica para editar uma nova métrica
  };

  return !user?.id ? <NaoAutenticado /> : (
    <View>
    <View>
    <View style={styles.header}>

    </View>

      <Pressable style={styles.botaoEditarMetricas} onPress={editarMetricacriada}>
        <Icon name="plus" color={"white"} size={20} />
        <Text style={styles.textoBotaoEditarMetricas}>Editar 'nome da Métrica'</Text>
      </Pressable>
    </View>
    </View>

);
}


const styles = StyleSheet.create({
header: {
  backgroundColor: "#2CCDB5",
  width: "100%",
  padding: 10,
  height: 100,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
},

botaoEditarMetricas: {
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

textoBotaoEditarMetricas: {
  color: "white",
  fontWeight: "600",
  fontSize: 14,
  marginLeft: 5,
},

});