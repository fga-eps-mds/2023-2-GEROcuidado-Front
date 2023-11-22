import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Touchable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IIdoso } from "../interfaces/idoso.interface";
import { router } from "expo-router";
import { getImageUri, noImage } from "../shared/helpers/image.helper";
import { Image } from "expo-image";
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
      pathname: "/private/pages/editarRotina",
      params: params,
    });
  };

  useEffect(() => handleIcon());
  useEffect(() => handleBackgroundColor());
  //useEffect(() => handleCheck());

  return (
    <View style={styles.shadow}>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <View style={styles.icon}>
          <Icon size={40} name={nameIcon}></Icon>
        </View>
        <View style={styles.texts}>
          <Text style={styles.title}>{item.titulo}</Text>
          <Text style={styles.description}>{item.descricao}</Text>
        </View>
        <TouchableOpacity onPress={handleCheck} style={styles.checkBox}>
          {check && <Icon name="check" size={30}></Icon>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    width: 310,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#FFC6C6",
    marginTop: 30,
    width: 298,
    height: 90,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderRadius: 8,
    padding: 5,
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
