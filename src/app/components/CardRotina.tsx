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
  date.setHours(date.getHours() - 3);
  const dateString = date.toISOString().split("T")[0];

  const [nameIcon, setnameIcon] = useState("view-grid-outline");
  const [check, setCheck] = useState(
    item.dataHoraConcluidos.includes(dateString),
  );
  const [token, setToken] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const getToken = () => {
    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  const handleIcon = () => {
    if (item.categoria == ECategoriaRotina.ALIMENTACAO)
      setnameIcon("food-apple-outline");
    else if (item.categoria == ECategoriaRotina.EXERCICIOS)
      setnameIcon("dumbbell");
    else if (item.categoria == ECategoriaRotina.MEDICAMENTO)
      setnameIcon("medical-bag");
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
    const fuso = new Date(item.dataHora).getTimezoneOffset() / 60;

    let dataString = new Date(item.dataHora).toISOString();
    let dataHoraArray = dataString.split("T");
    let horaArray = dataHoraArray[1].split(":");
    let dataArray = dataHoraArray[0].split("-");
    if (horaArray[0] == "00") {
      horaArray[0] = "21";
      if (dataArray[2] == "01") {
        if (dataArray[1] == "01") {
          // caso em que é primeiro de janeiro
          dataArray[0] = (parseInt(dataArray[0], 10) - 1).toString();
          dataArray[1] = "12";
          dataArray[2] = "31";
        } else {
          // verifica se o mês é março
          if (parseInt(dataArray[1], 10) == 3) {
            /// verifica se o ano é bissexto
            if (parseInt(dataArray[0], 10) % 4 == 0) dataArray[2] = "29";
            else dataArray[2] = "28";
          } else {
            // verifica os meses de janeiro a agosto
            if (parseInt(dataArray[1], 10) <= 8) {
              if (parseInt(dataArray[1], 10) % 2 == 0) dataArray[2] = "31";
              else {
                dataArray[2] = "30";
              }
            } else {
              // verifica os meses de setembro a dezembro
              if (parseInt(dataArray[1], 10) % 2 == 0) dataArray[2] = "30";
              else {
                dataArray[2] = "31";
              }
            }
          }
          dataArray[1] = (parseInt(dataArray[1], 10) - 1).toString();
          dataArray[1] = dataArray[1].padStart(2, "0");
        }
      } else {
        dataArray[2] = (parseInt(dataArray[2], 10) - 1).toString();
        dataArray[2] = dataArray[2].padStart(2, "0");
      }
    } else if (horaArray[0] == "01") {
      horaArray[0] = "22";
      if (dataArray[2] == "01") {
        if (dataArray[1] == "01") {
          // caso em que é primeiro de janeiro
          dataArray[0] = (parseInt(dataArray[0], 10) - 1).toString();
          dataArray[1] = "12";
          dataArray[2] = "31";
        } else {
          // verifica se o mês é março
          if (parseInt(dataArray[1], 10) == 3) {
            /// verifica se o ano é bissexto
            if (parseInt(dataArray[0], 10) % 4 == 0) dataArray[2] = "29";
            else dataArray[2] = "28";
          } else {
            // verifica os meses de janeiro a agosto
            if (parseInt(dataArray[1], 10) <= 8) {
              if (parseInt(dataArray[1], 10) % 2 == 0) dataArray[2] = "31";
              else {
                dataArray[2] = "30";
              }
            } else {
              // verifica os meses de setembro a dezembro
              if (parseInt(dataArray[1], 10) % 2 == 0) dataArray[2] = "30";
              else {
                dataArray[2] = "31";
              }
            }
          }
          dataArray[1] = (parseInt(dataArray[1], 10) - 1).toString();
          dataArray[1] = dataArray[1].padStart(2, "0");
        }
      } else {
        dataArray[2] = (parseInt(dataArray[2], 10) - 1).toString();
        dataArray[2] = dataArray[2].padStart(2, "0");
      }
    } else if (horaArray[0] == "02") {
      horaArray[0] = "23";
      if (dataArray[2] == "01") {
        if (dataArray[1] == "01") {
          // caso em que é primeiro de janeiro
          dataArray[0] = (parseInt(dataArray[0], 10) - 1).toString();
          dataArray[1] = "12";
          dataArray[2] = "31";
        } else {
          // verifica se o mês é março
          if (parseInt(dataArray[1], 10) == 3) {
            /// verifica se o ano é bissexto
            if (parseInt(dataArray[0], 10) % 4 == 0) dataArray[2] = "29";
            else dataArray[2] = "28";
          } else {
            // verifica os meses de janeiro a agosto
            if (parseInt(dataArray[1], 10) <= 8) {
              if (parseInt(dataArray[1], 10) % 2 == 0) dataArray[2] = "31";
              else {
                dataArray[2] = "30";
              }
            } else {
              // verifica os meses de setembro a dezembro
              if (parseInt(dataArray[1], 10) % 2 == 0) dataArray[2] = "30";
              else {
                dataArray[2] = "31";
              }
            }
          }
          dataArray[1] = (parseInt(dataArray[1], 10) - 1).toString();
          dataArray[1] = dataArray[1].padStart(2, "0");
        }
      } else {
        dataArray[2] = (parseInt(dataArray[2], 10) - 1).toString();
        dataArray[2] = dataArray[2].padStart(2, "0");
      }
    } else horaArray[0] = (parseInt(horaArray[0], 10) - fuso).toString();
    horaArray[0] = horaArray[0].padStart(2, "0");
    let dataString2 = dataArray.join("-");
    let horaString = horaArray.join(":");
    dataHoraArray[1] = horaString;
    dataHoraArray[0] = dataString2;
    let dataHoraString = dataHoraArray.join("T");
    item.dataHora = dataHoraString;

    const params = { ...item, id: item.id };

    router.push({
      pathname: "/private/pages/editarRotina",
      params: params,
    });
  };

  useEffect(() => handleIcon());
  useEffect(() => getToken());

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 20,
    marginVertical: 10,
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