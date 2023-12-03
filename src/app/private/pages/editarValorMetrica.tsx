import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import { View, StyleSheet, Pressable, Text} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IIdoso } from "../../interfaces/idoso.interface";
import { router, useLocalSearchParams } from "expo-router";
import { IMetrica } from "../../interfaces/metricas.interface";

export default function EditarvalorMetrica() {
  const params = useLocalSearchParams() as unknown as IMetrica;
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [idoso, setIdoso] = useState<IIdoso>();
  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  useEffect(() => handleUser(), []);

  const getIdoso = () => {
    AsyncStorage.getItem("idoso").then((idosoString) => {
      if (idosoString) {
        const idosoPayload = JSON.parse(idosoString) as IIdoso;
        setIdoso(idosoPayload);
      }
    });
  };

  useEffect(() => getIdoso(), []);
  useEffect(() => handleUser(), []);

  const editarMetricacriada = () => {
    // Adicione a lógica para editar uma nova métrica
  };

  const back = () => {
    router.push({
      pathname: "private/tabs/registros",
    });
  };

  return !user?.id ? <NaoAutenticado /> : (
    <View>
    <View>
    <View style={styles.header}>
      <Pressable onPress={() => back()}>
          <Icon name="chevron-left" size={40} color="#fff" />
        </Pressable>
      <Text style = {styles.textheader}>{params.categoria}</Text>
    </View>
      <Pressable style={styles.botaoEditarMetricas} onPress={editarMetricacriada}>
        <Icon name="plus" color={"white"} size={20} />
        <Text style={styles.textoBotaoEditarMetricas}>Novo valor</Text>
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
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
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

textheader:{
  color:"white",
  fontSize:20,

}

});