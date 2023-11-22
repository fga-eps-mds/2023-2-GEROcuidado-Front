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
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { IIdoso, IIdosoParams } from "../../interfaces/idoso.interface";
import { IRotina } from "../../interfaces/rotina.interface";
import CardRotina from "../../components/CardRotina";
import { getAllRotina } from "../../services/rotina.service";
import Toast from "react-native-toast-message";

export default function Rotinas() {
  const params = useLocalSearchParams() as unknown as IIdosoParams;
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [idoso, setIdoso] = useState<IIdoso | undefined>(undefined);
  const [rotinas, setRotinas] = useState<IRotina[]>([]);
  const [loading, setLoading] = useState(true);

  const getIdosoFromParams = () => {
    const payload: IIdoso = {
      ...params,
      id: params.id,
    };
    setIdoso(payload);
  };



  const editarRotina = (item: IRotina) => {
    const rotina = {...item, id: item.id};
  
    router.push({
      pathname: "/private/pages/editarRotina",
      params: rotina,

    });
  };

  // const hasFoto = (foto: string | null | undefined) => {
  //   if (!foto) return false;

  //   const raw = foto.split("data:image/png;base64,")[1];
  //   return raw.length > 0;
  // };

  // const getFoto = (foto: string | null | undefined) => {
  //   if (hasFoto(foto)) {
  //     return (
  //       <Image source={{ uri: foto as string }} style={styles.fotoPerfil} />
  //     );
  //   }

  //   return (
  //     <View style={[styles.semFoto, styles.fotoPerfil]}>
  //       <Icon style={styles.semFotoIcon} name="image-outline" size={15} />
  //     </View>
  //   );
  // };

  const novaRotina = () => {
    const params = { ...idoso, id: idoso?.id };
    router.push({
      pathname: "private/pages/cadastrarRotina",
      params: params,
    });
  };

  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  const getRotinas = () => {
    setLoading(true);

    getAllRotina()
      .then((response) => {
        const newRotinas = response.data as IRotina[];
        setRotinas(newRotinas);
      })
      .catch((err) => {
        const error = err as { message: string };
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => handleUser(), []);
  useEffect(() => getRotinas(), []);
  useEffect(() => getIdosoFromParams(), []);

  return !user?.id ? (
    <NaoAutenticado />
  ) : (
    <View>
      <View style={styles.header}>
        {/* {getFoto(idoso?.foto)} */}
        <Text style={styles.nomeUsuario}>
          <Text style={styles.negrito}>{idoso?.nome}</Text>
        </Text>
      </View>
      <Pressable style={styles.botaoCriarRotina} onPress={novaRotina}>
        <Icon name="plus" color={"white"} size={20}></Icon>
        <Text style={styles.textoBotaoCriarRotina}>Nova Rotina</Text>
      </Pressable>

      <View style={styles.cardIdoso}>
        <FlatList
          // style={{ marginBottom: 150 }}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={rotinas}
          renderItem={({ item }) => (
            <Pressable onPress={() => editarRotina(item)}>
              <CardRotina item={item} />
            </Pressable>
          )}
        />
      </View>
    </View>
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
  cardIdoso: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 250,
  },
});
