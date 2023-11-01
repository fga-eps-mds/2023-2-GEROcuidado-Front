import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { IUser } from "../../interfaces/user.interface";
import Hide from "../../components/Hide";

export default function Rotinas() {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
   
  const getIdUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setIdUsuario(usuario?.id);
    });
  };

  return (
    <View>
      {/* {!idUsuario ?
       <Hide/> 
       : 
       <Text>Registros Works!</Text>} */}
      <Text>Rotinas Works!</Text>
    </View>
  );
}
