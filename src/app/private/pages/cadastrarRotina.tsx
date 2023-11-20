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
import { Link, router, useLocalSearchParams } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { ECategoriaRotina } from "../../interfaces/rotina.interface";
import WeekDays from "../../components/weekDay";
import Calendar from "react-native-vector-icons/Feather";
import { Fontisto } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import MaskInput, { Masks } from "react-native-mask-input";
import MaskHour from "../../components/MaskHour";
import { postRotina } from "../../services/rotina.service";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import { IIdoso, IIdosoParams } from "../../interfaces/idoso.interface";

interface IErrors {
  nome?: string;
  dataNascimento?: string;
  tipoSanguineo?: string;
  telefoneResponsavel?: string;
  descricao?: string;
}

export default function Rotina() {
  const params = useLocalSearchParams() as unknown as IIdosoParams;
  const [idPaciente, setIdPaciente] = useState<number | null>(null);
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<ECategoriaRotina | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [erros, setErros] = useState<IErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [token, setToken] = useState<string>("");
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  
const getIdUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setIdUsuario(usuario.id);
    });
    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  const getIdosoFromParams = () => {
    const payload: IIdoso = {
      ...params,
      id: params.id,
    };
    setIdPaciente(Number(payload.id));

  };

  const categorias = [
    { key: ECategoriaRotina.GERAL, value: ECategoriaRotina.GERAL },
    { key: ECategoriaRotina.MEDICAMENTO, value: ECategoriaRotina.MEDICAMENTO },
    { key: ECategoriaRotina.ALIMENTACAO, value: ECategoriaRotina.ALIMENTACAO },
    { key: ECategoriaRotina.EXERCICIOS, value: ECategoriaRotina.EXERCICIOS },
  ];

  const getDateIsoString = (data: string, hora:string) => {
    const dateArray = data.split("/");

    console.log(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${hora}:00.000Z`);

    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${hora}:00.000Z`;
  };

  const salvar = async () => {
    if (Object.keys(erros).length > 0) {
      setShowErrors(true);
      return;
    }

    const body = {
      idPaciente: idPaciente as number,
      titulo,
      // dataNascimento: getDateIsoString(dataNascimento),
      dataHora:  getDateIsoString(data, hora),
      categoria,
      descricao,
    };

    try {
      setShowLoading(true);
      const response = await postRotina(body, token);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      router.replace("private/tabs/rotinas");
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
      setShowLoading(false);
    }
  };

  useEffect(() => getIdUsuario(), []);
  useEffect(() => getIdosoFromParams(), []);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Link href="private/tabs/rotinas">
          <Icon name="chevron-left" size={40} color="#fff" />
        </Link>
        <Text style={styles.tituloheader}>Nova rotina</Text>
      </View>

      <View style={styles.rotina}>

        <View style={styles.titulo}>
          <TextInput
            value={titulo}
            onChangeText={(titulo) => setTitulo(titulo)}
            placeholder="Adicionar título"
            style={styles.inputTitulo}
          />
        </View>
        <View style={styles.dataHora}>
          <Calendar style={styles.iconDataHora} name="calendar" size={20} />
          <MaskInput
              style={styles.textInput}
              value={data}
              onChangeText={setData}
              mask={Masks.DATE_DDMMYYYY}
              placeholder="Data da rotina"
            />
        </View>

        <View style={styles.dataHora}>
          <Icon
            style={styles.iconDataHora}
            name="clock-time-four-outline"
            size={20}
          />
          <MaskHour
            style={styles.textInput}
            placeholder="Horário de início"
            value={hora}
            maxLength={5}
            inputMaskChange={(hora) => setHora(hora)}
          />
        </View>

        <View>
          <View style={styles.categoria}>
            <Icon style={styles.iconCategoria} name="view-grid-outline" />
            <SelectList
              boxStyles={styles.dropdown}
              inputStyles={styles.categoriaSelecionada}
              data={categorias}
              setSelected={setCategoria}
              placeholder="Categoria"
              search={false}
            />
          </View>
          {/* <ErrorMessage show={showErrors} text={erros.categoria} /> */}
        </View>

        <View style={styles.repete}>
          <Text style={styles.repete}>Se repete às:</Text>
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
          <Fontisto style={styles.iconDesciption} name="left-align" size={15} />
          <TextInput
            onChangeText={setDescricao}
            value={descricao}
            placeholder="Descrição"
            style={styles.textInput}
          />
        </View>

        <View style={styles.linkButton}>
          <CustomButton
            title="Salvar"
            callbackFn={salvar}
            showLoading={showLoading}
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
  titulo: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    paddingBottom: 5,
    // width: 220,
    // alignSelf: "center",
    marginBottom: 40,
  },
  inputTitulo: {
    // width: "100%",
    // paddingLeft: 10,
    color: "#05375a",
    fontSize: 17,
    textAlign: "center",
  },
  dataHora: {
    flexDirection: "row",
    // marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    width: 300,
    // height: 30,
    marginBottom: 25,
  },
  iconDataHora: {
    fontSize: 25,
  },
  textInput: {
    // width: "90%",
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 17,
    width:280,
    // textAlign: "center",
  },
  categoria:{
    flexDirection: "row",
    borderBottomWidth: 1,
    width:300,
    alignItems:"baseline",
    paddingBottom:5,
  },
  iconCategoria: {
    // width: "15%",
    fontSize: 25,
    // marginTop: 9,
  },
  dropdown: {
    borderWidth: 0,
    paddingLeft: 10,
    // color: "#05375A",
    width:280,
    fontSize: 17,
  },
  categoriaSelecionada: {
    // paddingLeft: 10,
    // color: "#05375a",
    fontSize: 17,
    // width: 230,
  },
  repete: {
    alignSelf: "flex-start",
    marginTop: 30,
    // marginLeft: 10,
    fontSize: 17,
    color: "#616161",
  },
  weekDays: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom:30
  },
  iconDesciption: {
    width: "10%",
    fontSize: 18,
  },
  descricao: {
    flexDirection: "row",
    // marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    width: 300,
    // height: 30,
    // marginBottom: 25,
  },
  linkButton: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: "center",
  },
});
