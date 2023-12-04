import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import EmConstrucao from "../../components/EmConstrucao";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image, 
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Registros() {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  useEffect(() => handleUser(), []);

  const novaMetrica = () => {
    // Adicione a lógica para criar uma nova métrica
  };
  
  return !user?.id ? <NaoAutenticado /> : (
    <View>
    <View style={styles.header}>

          <Image
          source={require("../../../assets/Idoso.png")}
          style={styles.imagem}
          resizeMode="contain"
          />
          <Text style={styles.name}>Nome do idoso</Text>

          {/* <TouchableOpacity
          style={[
          styles.button,
          Platform.OS === "ios" ? styles.buttonIOS : styles.button,
          ]}
      >
          {/* Adicione o conteúdo desejado dentro do TouchableOpacity}
      </TouchableOpacity> */}

    </View>

    <View>
      <Pressable style={styles.botaoCriarMetricas} onPress={novaMetrica}>
        <Icon name="plus" color={"white"} size={20} />
        <Text style={styles.textoBotaoCriarMetricas}>Nova Métrica</Text>
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

botaoCriarMetricas: {
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

textoBotaoCriarMetricas: {
  color: "white",
  fontWeight: "600",
  fontSize: 14,
  marginLeft: 5,
},

nameBar: {

},

imagem: {
  width: 45,
  height: 45,
  borderRadius: 30,
},

name: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
  marginTop: 5,
},

button: {

},

buttonIOS: {

},
});