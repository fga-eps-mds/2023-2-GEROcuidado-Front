import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Touchable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { ECategoriaRotina, IRotina } from "../interfaces/rotina.interface";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps {
  item: IRotina;
}

export default function CardRotina({ item }: IProps) {
  const [nameIcon, setnameIcon] = useState("view-grid-outline");
  const [backgroundColor, setBackgroundColor] = useState("#FFC6C6");
  const [check, setCheck] = useState(false);

  const handleIcon = () => {
    if (item.categoria == ECategoriaRotina.ALIMENTACAO)
      setnameIcon("food-apple-outline");
    else if (item.categoria == ECategoriaRotina.EXERCICIOS)
      setnameIcon("dumbbell");
    else if (item.categoria == ECategoriaRotina.MEDICAMENTO)
      setnameIcon("medical-bag");
  };

  const handleCheck = () => {
    setCheck(!check);
  };

  const handleBackgroundColor = () => {
    if (
      item.categoria == ECategoriaRotina.EXERCICIOS ||
      item.categoria == ECategoriaRotina.GERAL
    )
      setBackgroundColor("#B4FFE8");
  };

  const getTitulo = (nome: string): string => {
    return nome.length < 15 ? nome : nome.slice(0, 15) + "...";
  };

  const getDescricao = (descricao?: string): string | undefined => {
    if(descricao)
      return descricao.length < 80 ? descricao : descricao.slice(0, 80) + "...";
  }

  const selectIdoso = () => {
    const params = { ...item, id: item.id };
    router.push({
      pathname: "/private/tabs/rotinas",
      params: params,
    });
  };

  const navigate = () => {
    const params = { ...item, id: item.id };

    router.push({
      pathname: "/private/pages/editarIdoso",
      params: params,
    });
  };

  useEffect(() => handleIcon());
  useEffect(() => handleBackgroundColor());
  //useEffect(() => handleCheck());

  return (
    <View style={styles.card}>
     {/*  <Text>{item.dataHora as string}</Text> */}
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <View style={styles.icon}>
          <Icon size={35} name={nameIcon}></Icon>
        </View>
        <View style={styles.texts}>
          <Text style={styles.title}>{getTitulo(item.titulo)}</Text>
          <Text style={styles.description}>{getDescricao(item.descricao)}</Text>
        </View>
        <TouchableOpacity onPress={handleCheck} style={styles.checkBox}>
          {check && <Icon name="check" size={30}></Icon>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    marginTop: 30,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    width: 298,
    height: 90,
    borderRadius: 8,
    padding: 10,
    borderBottomWidth: 4,
    borderBottomColor: "#d3d3d3",
    borderRightWidth: 3,
    borderRightColor: "#d3d3d3",
  },
  texts: {
    flexDirection: "column",
    marginLeft: 10,
    marginBottom: 8,
    marginTop: 5,
    marginRight: 8,
    flex: 1,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
    paddingTop: 10,
  },
  description: {
    color: "#767676",
    marginTop: 10,
  },
  icon: {
    alignContent: "center",
    padding: 0,
  },
  checkBox: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: "white",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
  },
});
