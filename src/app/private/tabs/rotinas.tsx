import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import EmConstrucao from "../../components/EmConstrucao";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Agenda, AgendaSchedule, AgendaEntry } from "react-native-calendars";

interface State {
  items?: AgendaSchedule;
}
interface Item {
  name: string;
  height: number;
  day: string;
}

export default function Rotinas({ items }: AgendaSchedule) {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [selected, setSelected] = useState("");

  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
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

  const novaRotina = () => {
    //router.push("private/pages/cadastrarRotina");
  };

  useEffect(() => handleUser(), []);

  // return !user?.id ? <NaoAutenticado /> : <EmConstrucao />;
  return (
    <View>
      {user?.id && (
        <View>
          <View style={styles.header}>
            {getFoto(user?.foto)}
            <Text style={[styles.nomeIdoso, styles.negrito]}>{user?.nome}</Text>
          </View>
          {/* <Pressable style={styles.botaoCriarRotina} onPress={novaRotina}>
            <Icon name="plus" color={"white"} size={20}></Icon>
            <Text style={styles.textoBotaoCriarRotina}>Nova Rotina</Text>
          </Pressable> */}

          <Agenda
            items={{
              "2023-11-20": [
                { name: "item 1", height: 90, day: "77" },
                { name: "item 2", height: 0, day: "21" },
              ],
            }}
            renderEmptyDate={() => (
              <View>
                <Text>No items for this date</Text>
              </View>
            )}
            // renderItem={() => <Text>{item.name}</Text>}
            // help me with renderItem
            renderItem={(item: Item) => {
              return (
                <View>
                  <Text>
                    {item.name},{item.height}, {item.day}
                  </Text>
                </View>
              );
            }}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "range",
              },
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2CCDB5",
    width: "100%",
    height: 85,
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },

  nomeIdoso: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 7,
    maxWidth: "75%",
  },
  negrito: {
    fontWeight: "bold",
  },

  fotoPerfil: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 100,
  },
  semFoto: { position: "relative", backgroundColor: "#EFEFF0" },
  semFotoIcon: {
    position: "absolute",
    right: "32%",
    bottom: "32%",
    opacity: 0.4,
    margin: "auto",
    alignSelf: "center",
    zIndex: 1,
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
});
