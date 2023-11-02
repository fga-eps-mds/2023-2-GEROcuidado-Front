import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { IUser } from "../../interfaces/user.interface";
import Hide from "../../components/Hide";

export default function Registros() {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  const getIdUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setIdUsuario(usuario?.id);
    });
  };

  useEffect(() => getIdUsuario());
// 
  return (
    <View>
      {!idUsuario ? (
        <Hide></Hide>
      ) : (
        <Text>Registros Works!</Text>
      )}
      {/* <Text>Registros Works!</Text> */}
    </View>
  );
}
