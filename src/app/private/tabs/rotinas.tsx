import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import EmConstrucao from "../../components/EmConstrucao";

export default function Rotinas() {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  const getIdUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setIdUsuario(usuario?.id);
    });
  };

  useEffect(() => getIdUsuario());

  return !idUsuario ? <NaoAutenticado></NaoAutenticado> : <EmConstrucao />;
}
