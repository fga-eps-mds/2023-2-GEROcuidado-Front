import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';

export default function VisualizarValoresMedidos() {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [selectedMetric, setSelectedMetric] = useState<string | undefined>(undefined);
  const navigation = useNavigation();

  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  useEffect(() => {
    handleUser();

    AsyncStorage.getItem('selectedMetric').then((metric) => {
      setSelectedMetric(metric || "");
    });
  }, []);

  const novoValor = () => {

  };

  const apagarMetrica = () => {
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconContainer}>
          <Icon name="chevron-left" size={20} color="white" />
        </Pressable>
        <Text style={styles.headerText}>{selectedMetric}</Text>
      </View>


      <Pressable style={styles.botaoNovoValor} onPress={novoValor}>
        <Icon name="plus" color={"white"} size={20} />
        <Text style={styles.textoBotaoNovoValor}>Novo Valor</Text>
      </Pressable>


      <Pressable style={styles.apagarMetrica} onPress={apagarMetrica}>
        <Text style={styles.textoApagarMetrica}>Apagar métrica</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#2CCDB5",
    width: "100%",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
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

  apagarMetrica: {
    position: 'absolute', 
    bottom: 60, 
    width: '100%', 
    alignItems: 'center', 
  },
  textoApagarMetrica: {
    color: '#FF7D7D',
    fontSize: 16, 
    fontWeight: '400', 
  },
});
