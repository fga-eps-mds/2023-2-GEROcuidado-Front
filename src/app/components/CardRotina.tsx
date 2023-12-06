import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { ECategoriaRotina, IRotina } from "../interfaces/rotina.interface";
import { updateRotina } from "../services/rotina.service";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
  item: IRotina;
  index: number;
  date: Date;
}

export default function CardRotina({ item, index, date }: IProps) {
  const dateString = date.toLocaleString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [nameIcon, setnameIcon] = useState("view-grid-outline");
  const [check, setCheck] = useState(false);
  const [time, setTime] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const getToken = () => {
    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  const handleIcon = () => {
    if (item.categoria == ECategoriaRotina.ALIMENTACAO) {
      setnameIcon("food-apple-outline");
    } else if (item.categoria == ECategoriaRotina.EXERCICIOS) {
      setnameIcon("dumbbell");
    } else if (item.categoria == ECategoriaRotina.MEDICAMENTO) {
      setnameIcon("medical-bag");
    }
  };

  const debounceConcluido = (concluido: boolean) => {
    setCheck(concluido);
    if (timer) clearTimeout(timer);
    const temp = setTimeout(() => updateRotinaConcluido(concluido), 1000);
    setTimer(temp);
  };

  const updateRotinaConcluido = async (concluido: boolean) => {
    let dataHoraConcluidos = [];

    if (concluido) {
      dataHoraConcluidos = [...item.dataHoraConcluidos, dateString];
    } else {
      dataHoraConcluidos = item.dataHoraConcluidos.filter((item) => {
        return item !== dateString;
      });
    }

    try {
      await updateRotina(item.id, { dataHoraConcluidos }, token);
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    }
  };

  const editar = () => {
    const params = { ...item, id: item.id };

    router.push({
      pathname: "/private/pages/editarRotina",
      params: params,
    });
  };

  const handleDataHora = () => {
    const dateString = new Date(item.dataHora).toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const [data, hora] = dateString.split(" ");
    setCheck(item.dataHoraConcluidos.includes(data));
    setTime(hora);
  };

  useEffect(() => handleIcon(), []);
  useEffect(() => getToken(), []);
  useEffect(() => handleDataHora(), []);

  return (
    <>
      <Text style={styles.hora}>{time}</Text>
      <Pressable
        onPress={editar}
        style={[
          styles.container,
          { backgroundColor: index % 2 == 0 ? "#B4FFE8" : "#FFC6C6" },
        ]}
      >
        <View style={styles.icon}>
          <Icon size={30} name={nameIcon}></Icon>
        </View>
        <View style={styles.texts}>
          <Text style={styles.title}>{item.titulo}</Text>
          <Text style={styles.description}>{item.descricao}</Text>
        </View>
        <Pressable
          onPress={() => debounceConcluido(!check)}
          style={styles.checkBox}
          testID="checkbox"
        >
          {check && <Icon name="check" size={30}></Icon>}
        </Pressable>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  hora: {
    fontSize: 18,
    fontWeight: "300",
    marginLeft: 20,
    marginTop: 10,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width - 40,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 4,
    padding: 10,
    paddingVertical: 5,
  },
  texts: {
    flexDirection: "column",
    marginLeft: 10,
    marginBottom: 8,
    marginTop: 8,
    marginRight: 8,
    flex: 1,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
  },
  description: {
    color: "#767676",
    marginTop: 10,
  },
  icon: {},
  checkBox: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: "white",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
