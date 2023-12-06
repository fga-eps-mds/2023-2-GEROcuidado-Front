import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { ECategoriaRotina } from "../../interfaces/rotina.interface";
import WeekDays from "../../components/weekDay";
import Calendar from "react-native-vector-icons/Feather";
import CustomButton from "../../components/CustomButton";
import MaskInput, { Masks } from "react-native-mask-input";
import MaskHour from "../../components/MaskHour";
import { postRotina } from "../../services/rotina.service";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IIdoso } from "../../interfaces/idoso.interface";
import ErrorMessage from "../../components/ErrorMessage";
import * as Notifications from "expo-notifications";

interface IErrors {
  titulo?: string;
  data?: string;
  hora?: string;
  categoria?: string;
  descricao?: string;
}

export default function CadastrarRotina() {
  const getInitialDateTime = (isData = true) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDateArray = formattedDate.split(" ");
    return isData ? formattedDateArray[0] : formattedDateArray[1];
  };

  const [idoso, setIdoso] = useState<IIdoso>();
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState(getInitialDateTime());
  const [hora, setHora] = useState(getInitialDateTime(false));
  const [notificacao, setNotificacao] = useState(false);
  const [expoToken, setExpoToken] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<ECategoriaRotina | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [erros, setErros] = useState<IErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [token, setToken] = useState<string>("");
  const [dias, setDias] = useState<number[]>([]);

  const getToken = () => {
    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
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

  const handleErrors = () => {
    const erros: IErrors = {};

    if (!titulo) {
      erros.titulo = "Campo obrigatório!";
    } else if (titulo.length > 100) {
      erros.titulo = "O título deve ter no máximo 100 caracteres.";
    }
    // } else if (titulo.length < 5) {
    //   erros.titulo = "O nome completo deve ter pelo menos 5 caractéres.";

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

    if (descricao?.length > 300) {
      erros.descricao = "A descrição deve ter no máximo 300 caracteres.";
    }

    setErros(erros);
  };

  const categorias = [
    { key: ECategoriaRotina.GERAL, value: ECategoriaRotina.GERAL },
    { key: ECategoriaRotina.MEDICAMENTO, value: ECategoriaRotina.MEDICAMENTO },
    { key: ECategoriaRotina.ALIMENTACAO, value: ECategoriaRotina.ALIMENTACAO },
    { key: ECategoriaRotina.EXERCICIOS, value: ECategoriaRotina.EXERCICIOS },
  ];

  const getDateIsoString = () => {
    const dateArray = data.split("/");

    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${hora}:00.000`;
  };

  const salvar = async () => {
    if (Object.keys(erros).length > 0) {
      setShowErrors(true);
      return;
    }

    const body = {
      idIdoso: Number(idoso?.id),
      titulo,
      dataHora: getDateIsoString(),
      categoria: categoria as ECategoriaRotina,
      dias: dias,
      token: expoToken,
      notificacao,
      descricao,
      dataHoraConcluidos: [],
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

  const goBack = () => {
    router.push({
      pathname: "/private/tabs/rotinas",
    });
  };

  const setSuggestedTitle = () => {
    switch (categoria) {
      case ECategoriaRotina.ALIMENTACAO:
        setTitulo("Se Alimentar");
        break;
      case ECategoriaRotina.MEDICAMENTO:
        setTitulo("Tomar Medicamento");
        break;
      case ECategoriaRotina.EXERCICIOS:
        setTitulo("Fazer Exercício");
        break;
      default:
        break;
    }
  };

  const handleNotificacao = async () => {
    if (!notificacao) return;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("É necessário permitir as notificações!");
      setNotificacao(false);
      return;
    }

    const response = await Notifications.getExpoPushTokenAsync({
      projectId: "7028a81c-adee-41de-91a7-b7e80535a448",
    });

    setExpoToken(response.data);
  };

  useEffect(() => getIdoso(), []);
  useEffect(() => getToken(), []);
  useEffect(() => setSuggestedTitle(), [categoria]);
  useEffect(() => handleErrors(), [titulo, data, hora, categoria, descricao]);
  useEffect(() => {
    handleNotificacao();
  }, [notificacao]);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <Icon name="chevron-left" size={40} color="#fff" />
        </Pressable>
        <Text style={styles.tituloheader}>Nova rotina</Text>
      </View>

      <View style={styles.rotina}>
        <View style={styles.titulo}>
          <TextInput
            value={titulo}
            onChangeText={(titulo) => setTitulo(titulo)}
            placeholder="Adicionar título"
            placeholderTextColor={"#3D3D3D"}
            style={styles.inputTitulo}
          />
        </View>
        <View style={styles.erroTitulo} testID="Erro-titulo">
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
            placeholderTextColor={"#3D3D3D"}
          />
        </View>
        <View style={styles.erro} testID="Erro-data">
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
            placeholderTextColor={"#3D3D3D"}
            value={hora}
            maxLength={5}
            inputMaskChange={(hora) => setHora(hora)}
          />
        </View>
        <View style={styles.erro} testID="Erro-hora">
          <ErrorMessage show={showErrors} text={erros.hora} />
        </View>

        <View>
          <View style={styles.categoria}>
            {(!categoria || categoria == ECategoriaRotina.GERAL) && (
              <Icon style={styles.iconCategoria} name="view-grid-outline" />
            )}
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
          <ErrorMessage show={showErrors} text={erros.categoria} />
        </View>

        <View style={styles.repete}>
          <Text style={styles.repete}>Se repete às:</Text>
        </View>

        <View style={styles.weekDays}>
          <WeekDays callbackFn={setDias} dias={[]} />
        </View>

        <View style={styles.notificacaoContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#2CCDB5" }}
            onValueChange={setNotificacao}
            value={notificacao}
          />
          <Text style={styles.notificacaoText}>Ativar notificação</Text>
        </View>

        <View style={styles.descricao}>
          <TextInput
            onChangeText={setDescricao}
            value={descricao}
            placeholder="Descrição"
            multiline={true}
            numberOfLines={Platform.OS === "ios" ? undefined : 6}
            style={[
              styles.textInputDescription,
              { minHeight: Platform.OS === "ios" && 6 ? 20 * 6 : null },
            ]}
            placeholderTextColor={"#3D3D3D"}
          />
        </View>
        <View style={styles.erro} testID="Erro-descricao">
          <ErrorMessage show={showErrors} text={erros.descricao} />
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
  notificacaoContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    fontWeight: "700",
    marginBottom: 25,
  },
  notificacaoText: {
    fontWeight: "600",
    marginLeft: 7,
    fontSize: 16,
    color: "#616161",
  },
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
    flexDirection: "column",
    borderRadius: 15,
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignItems: "center",
    justifyContent: "center",
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
    opacity: 0.8,
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
    opacity: 0.8,
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
    marginTop: 10,
    fontSize: 17,
    color: "#616161",
  },
  weekDays: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 0,
  },
  descricao: {
    flexDirection: "row",
    paddingBottom: 5,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
  },
  textInputDescription: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    fontSize: 17,
    padding: 12,
    paddingTop: 10,
  },
  linkButton: {
    marginTop: 30,
    marginBottom: 40,
    alignItems: "center",
    width: 250,
  },
  erroTitulo: {
    marginBottom: 35,
  },
  erro: {
    marginBottom: 15,
    alignSelf: "flex-start",
  },
});
