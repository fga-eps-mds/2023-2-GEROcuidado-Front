import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import EmConstrucao from "../../components/EmConstrucao";
import { View, Text, StyleSheet } from "react-native";
import { IIdoso } from "../../interfaces/idoso.interface";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IdosoNaoSelecionado from "../../components/IdosoNaoSelecionado";
import CardMetrica from "../../components/CardMetrica";
import { FlatList } from "react-native-gesture-handler";
import { EMetricas, IMetrica } from "../../interfaces/metricas.interface";


export default function Registros() {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [idoso, setIdoso] = useState<IIdoso>()
  const [metricas, setMetricas] = useState<IMetrica[]>([{ categoria: EMetricas.FREQ_CARDIACA, id: 1, idIdoso: 1, dataHora: "", valor: 70, idUsuario: 1 }])

  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  const getIdoso = () => {
    AsyncStorage.getItem("idoso").then((idosoString) => {
      if (idosoString) {
        const idosoPayload = JSON.parse(idosoString) as IIdoso;
        setIdoso(idosoPayload);
      }
    });
  };

  const hasFoto = (foto: string | null | undefined) => {
    if (!foto) return false;

    const raw = foto.split("data:image/png;base64,")[1];
    return raw.length > 0;
  };

  const getFoto = (foto: string | null | undefined) => {
    if (hasFoto(foto)) {
      return (
        <Image source={{ uri: foto as string }} style={styles.fotoPerfil} />
      );
    }

    return (
      <View style={[styles.semFoto, styles.fotoPerfil]}>
        <Icon style={styles.semFotoIcon} name="image-outline" size={15} />
      </View>
    );
  };



  useEffect(() => handleUser(), []);
  useEffect(() => getIdoso(), []);

  return (
    <>
      {!user?.id && <NaoAutenticado />}
      {user?.id && !idoso?.id && <IdosoNaoSelecionado />}

      {user?.id && idoso?.id && (
        <View style={styles.header}>
          {getFoto(idoso?.foto)}
          <Text style={styles.nomeUsuario}>
            <Text style={styles.negrito}>{idoso?.nome}</Text>
          </Text>
        </View>
      )}

      <View style={styles.cardMetrica}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={metricas}
          renderItem={({ item }) => <CardMetrica item={item} />}
        />
      </View>

      
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2CCDB5",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  fotoPerfil: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 100,
  },
  semFoto: { position: "relative", backgroundColor: "#EFEFF0" },
  semFotoIcon: {
    position: "absolute",
    right: "38%",
    bottom: "38%",
    opacity: 0.4,
    margin: "auto",
    alignSelf: "center",
    zIndex: 1,
  },
  nomeUsuario: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 20,
    maxWidth: "75%",
  },
  negrito: {
    fontWeight: "bold",
  },
  cardMetrica: {
    width: "40%",
    margin: 10,
  },
  list:{
    width: "100%",
  }
})
