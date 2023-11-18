import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link, router } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { ECategoriaRotina } from "../../interfaces/rotina.interface";
import WeekDays from "../../components/weekDay";
import Calendar from "react-native-vector-icons/Feather";
import { Fontisto } from "@expo/vector-icons";

export default function Rotina() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState<ECategoriaRotina | null>(null);

  const data = [
    { key: ECategoriaRotina.GERAL, value: ECategoriaRotina.GERAL },
    { key: ECategoriaRotina.MEDICAMENTO, value: ECategoriaRotina.MEDICAMENTO },
    {
      key: ECategoriaRotina.ALIMENTACAO,
      value: ECategoriaRotina.ALIMENTACAO,
    },
    {
      key: ECategoriaRotina.EXERCICIOS,
      value: ECategoriaRotina.EXERCICIOS,
    },
  ];

  return (
    <ScrollView>
      <View style={styles.header}>
        <Link href="private/tabs/rotinas">
          <Icon name="chevron-left" size={40} color="#fff" />
        </Link>
        <Text style={styles.tituloheader}>Nova rotina</Text>
      </View>
      <View style={styles.rotina}>
        <View style={styles.field}>
          <TextInput
            onChangeText={setTitulo}
            value={titulo}
            placeholder="Adicionar título"
            style={styles.textInputTitulo}
          />
        </View>

        <View style={styles.data}>
          <Calendar style={styles.iconInput} name="calendar" size={20} />
          <TextInput
            //onChangeText={setEmail}
            //value={email}
            placeholder="Data da rotina"
            style={styles.textInput}
          />
        </View>

        <View style={styles.data}>
          <Icon
            style={styles.iconInput}
            name="clock-time-four-outline"
            size={20}
          />
          <TextInput
            //onChangeText={setEmail}
            //value={email}
            placeholder="Horário de início"
            style={styles.textInput}
          />
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
            }}
          >
            <Icon style={styles.iconInput3} name="view-grid-outline" />
            <SelectList
              boxStyles={styles.dropdown}
              inputStyles={styles.categoria}
              data={data}
              setSelected={setCategoria}
              placeholder="Categoria"
              search={false}
            />
          </View>
          {/* <ErrorMessage show={showErrors} text={erros.categoria} /> */}
        </View>

        <View style={styles.text1}>
          <Text style={styles.text2}>Se repete às:</Text>
        </View>

        <View style={styles.weekDays}>
          <WeekDays day={"D"} />
          <WeekDays day={"S"} />
          <WeekDays day={"T"} />
          <WeekDays day={"Q"} />
          <WeekDays day={"Q"} />
          <WeekDays day={"S"} />
          <WeekDays day={"S"} />
        </View>

        <View style={styles.descricao}>
          <Fontisto style={styles.iconInput2} name="left-align" size={15} />
          <TextInput
            //onChangeText={setEmail}
            //value={email}
            placeholder="Descrição"
            style={styles.textInput}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2CCDB5",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },

  tituloheader: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  categoria: {
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 17,
    width: 230,
  },

  iconInput: {
    fontSize: 25,
  },
  iconInput2: {
    width: "10%",
    fontSize: 18,
  },
  iconInput3: {
    width: "15%",
    fontSize: 25,
    marginTop: 9,
  },
  formControl: {
    marginBottom: 15,
  },
  // selectInput: {
  //   marginBottom: 5,
  // },
  dropdown: {
    borderWidth: 0,
    paddingLeft: 0,
    color: "#05375A",
    fontSize: 17,
  },

  rotina: {
    borderRadius: 15,
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignItems: "center",
  },

  formControl2: {
    flexDirection: "row",
    width: 320,
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: 10,
  },

  field: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    width: 220,
    alignSelf: "center",
    marginBottom: 40,
  },
  field2: {
    flexDirection: "row",
    width: 320,
    borderBottomWidth: 1,
    borderBottomColor: "#AFB1B6",
    paddingBottom: 5,
    alignSelf: "center",
    marginBottom: 5,
  },
  data: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    width: 300,
    height: 30,
    marginBottom: 25,
  },
  textInput: {
    width: "90%",
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 17,
    // textAlign: "center",
  },
  textInputTitulo: {
    width: "100%",
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 17,
    textAlign: "center",
  },
  text1: {
    alignSelf: "flex-start",
  },
  text2: {
    marginTop: 30,
    marginLeft: 10,
    fontSize: 17,
    color: "#616161",
  },
  weekDays: {
    flexDirection: "row",
    marginTop: 15,
  },

  descricao: {
    flexDirection: "row",
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    width: 300,
    height: 30,
    marginBottom: 25,
  },
});
