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
import ErrorMessage from "../../components/ErrorMessage";
import { ErrorWithStack } from "@testing-library/react-native/build/helpers/errors";

interface IErrors {
  titulo?: string;
  data?: string;
  hora?: string;
  categoria?: string;
  // diasRepeticao?: string;
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

  const handleErrors = () => {
    const erros: IErrors = {};

    if (!titulo) {
      erros.titulo = "Campo obrigatório";
    }
    // } else if (titulo.length < 5) {
    //   erros.titulo = "O nome completo deve ter pelo menos 5 caractéres.";
    // } else if (titulo.length > 60) {
    //   erros.titulo = "O nome completo deve ter no máximo 60 caractéres.";
    // }

    if (!data) {
      erros.data = "Campo obrigatório";
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      erros.data = "Data deve ser no formato dd/mm/yyyy!";
    }

    if (!hora) {
      erros.hora = "Campo obrigatório";
    } else if (!/^\d{2}:\d{2}$/.test(hora)) {
      erros.hora = "Hora deve ser no formato hh:mm!";
    }

    if (!categoria) {
      erros.categoria = "Campo obrigatório";
    }

    setErros(erros);
  };

  const categorias = [
    { key: ECategoriaRotina.GERAL, value: ECategoriaRotina.GERAL },
    { key: ECategoriaRotina.MEDICAMENTO, value: ECategoriaRotina.MEDICAMENTO },
    { key: ECategoriaRotina.ALIMENTACAO, value: ECategoriaRotina.ALIMENTACAO },
    { key: ECategoriaRotina.EXERCICIOS, value: ECategoriaRotina.EXERCICIOS },
  ];

  const getDateIsoString = (data: string, hora: string) => {
    const dateArray = data.split("/");

    // console.log(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${hora}:00.000Z`);

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
      dataHora: getDateIsoString(data, hora),
      categoria: categoria as ECategoriaRotina,
      // diasRepeticao: [1, 2, 3, 4, 5, 6, 7],
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
      router.replace({
        pathname: "private/tabs/rotinas",
        params: params,
      });
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
  useEffect(() => handleErrors(), [titulo, data, hora, categoria]);

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
        <View style={styles.erroTitulo} testID="error-titulo1">
          <ErrorMessage show={showErrors} text={erros.titulo} />
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
        <View style={styles.erro} testID="error-titulo2">
          <ErrorMessage show={showErrors} text={erros.data} />
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
        <View style={styles.erro} testID="error-titulo3">
          <ErrorMessage show={showErrors} text={erros.hora} />
        </View>

        <View>
          <View style={styles.categoria}>
            {!categoria ||
              (categoria === ECategoriaRotina.GERAL && (
                <Icon style={styles.iconCategoria} name="view-grid-outline" />
              ))}
            {categoria === ECategoriaRotina.ALIMENTACAO && (
              <Icon style={styles.iconCategoria} name="food-apple-outline" />
            )}
            {categoria === ECategoriaRotina.MEDICAMENTO && (
              <Icon style={styles.iconCategoria} name="medical-bag" />
            )}
            {categoria === ECategoriaRotina.EXERCICIOS && (
              <Icon style={styles.iconCategoria} name="dumbbell" />
            )}
            {/* <Icon style={styles.iconCategoria} name="view-grid-outline" /> */}
            <SelectList
              boxStyles={styles.dropdown}
              inputStyles={styles.categoriaSelecionada}
              data={categorias}
              setSelected={setCategoria}
              placeholder="Categoria"
              search={false}
            />
          </View>
          <View testID="error-titulo4">
          <ErrorMessage show={showErrors} text={erros.categoria} />
          </View>
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
    marginBottom: 1,
  },
  inputTitulo: {
    color: "#05375a",
    fontSize: 17,
    textAlign: "center",
  },
  dataHora: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    width: 300,
    marginBottom: 1,
  },
  iconDataHora: {
    fontSize: 25,
  },
  textInput: {
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 17,
    width: 280,
  },
  categoria: {
    flexDirection: "row",
    borderBottomWidth: 1,
    width: 300,
    alignItems: "baseline",
    paddingBottom: 5,
  },
  iconCategoria: {
    fontSize: 25,
  },
  dropdown: {
    borderWidth: 0,
    paddingLeft: 10,
    width: 280,
    fontSize: 17,
  },
  categoriaSelecionada: {
    fontSize: 17,
  },
  repete: {
    alignSelf: "flex-start",
    marginTop: 30,
    fontSize: 17,
    color: "#616161",
  },
  weekDays: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 30,
  },
  iconDesciption: {
    width: "10%",
    fontSize: 18,
  },
  descricao: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    width: 300,
  },
  linkButton: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: "center",
  },
  erroTitulo: {
    marginBottom: 35,
  },
  erro: {
    marginBottom: 15,
    alignSelf: "flex-start",
  },
});
