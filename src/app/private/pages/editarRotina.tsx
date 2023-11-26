import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { ECategoriaRotina, IRotina } from "../../interfaces/rotina.interface";
import WeekDays from "../../components/weekDay";
import Calendar from "react-native-vector-icons/Feather";
import CustomButton from "../../components/CustomButton";
import MaskInput, { Masks } from "react-native-mask-input";
import MaskHour from "../../components/MaskHour";
import { deleteRotina, updateRotina } from "../../services/rotina.service";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorMessage from "../../components/ErrorMessage";
import ModalConfirmation from "../../components/ModalConfirmation";
import ToggleButton from "../../components/ToggleButtonNotification";
import { IIdoso } from "../../interfaces/idoso.interface";

interface IErrors {
  titulo?: string;
  data?: string;
  hora?: string;
  categoria?: string;
  descricao?: string;
}

export default function EditarRotina() {
  const [isToggleActive, setIsToggleActive] = useState(false);
  const params = useLocalSearchParams() as unknown as IRotina & {
    dias: string;
  };
  const [idoso, setIdoso] = useState<IIdoso>();
  const [titulo, setTitulo] = useState(params.titulo);
  const [descricao, setDescricao] = useState(params.descricao);
  const [categoria, setCategoria] = useState(params.categoria);
  const [dias, setDias] = useState(
    params.dias.split(",").map((dia) => Number(dia)),
  );
  const [showLoading, setShowLoading] = useState(false);
  const [erros, setErros] = useState<IErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [token, setToken] = useState<string>("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [showLoadingApagar, setShowLoadingApagar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const getIdoso = () => {
    AsyncStorage.getItem("idoso").then((idosoString) => {
      if (idosoString) {
        const idosoPayload = JSON.parse(idosoString) as IIdoso;
        setIdoso(idosoPayload);
      }
    });
  };

  const getToken = () => {
    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  const separaDataHora = () => {
    //const value = params.dataHora as string;
    const value = params.dataHora as string;
    const valueFinal = value.split("T");
    const separaData = valueFinal[0].split("-");
    setData(`${separaData[2]}/${separaData[1]}/${separaData[0]}`);
    const separaHora = valueFinal[1].split(":");
    setHora(`${separaHora[0]}:${separaHora[1]}`);
  };

  const handleErrors = () => {
    const erros: IErrors = {};

    if (!titulo) {
      erros.titulo = "Campo obrigatório!";
    } else if (titulo.length > 100) {
      erros.titulo = "O título deve ter no máximo 100 caractéres.";
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

    if (descricao && descricao?.length > 300) {
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

  const getDateIsoString = (data: string, hora: string) => {
    const dateArray = data.split("/");
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${hora}:00.000Z`;
  };

  const salvar = async () => {
    if (Object.keys(erros).length > 0) {
      setShowErrors(true);
      return;
    }

    const body = {
      idIdoso: Number(idoso?.id),
      titulo,
      dataHora: getDateIsoString(data, hora),
      categoria: categoria as ECategoriaRotina,
      dias,
      descricao,
    };

    try {
      setShowLoading(true);
      const response = await updateRotina(params.id, body, token);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      router.replace({
        pathname: "private/tabs/rotinas",
        params: idoso,
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

  const apagarRotina = async () => {
    setModalVisible(false);
    setShowLoadingApagar(true);

    try {
      await deleteRotina(params.id, token);
      router.replace("private/tabs/rotina");
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
      setShowLoadingApagar(false);
    }
  };

  useEffect(() => getIdoso(), []);
  useEffect(() => getToken(), []);
  useEffect(() => handleErrors(), [titulo, data, hora, categoria, descricao]);
  useEffect(() => separaDataHora(), []);

  const confirmation = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Icon name="chevron-left" size={40} color="#fff" />
        </Pressable>
        <Text style={styles.tituloheader}>Detalhes da rotina</Text>
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
        <View style={styles.erroTitulo}>
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
        <View style={styles.erro}>
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
        <View style={styles.erro}>
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
              defaultOption={{ key: params.categoria, value: params.categoria }}
              search={false}
            />
          </View>
          <ErrorMessage show={showErrors} text={erros.categoria} />
          
          <View style={styles.toggleButtonContainer}>
                <ToggleButton onPress={() => setIsToggleActive(!isToggleActive)} active={isToggleActive} />
          </View>
        </View>

        <View style={styles.repete}>
          <Text style={styles.repete}>Se repete às:</Text>
        </View>

        <View style={styles.weekDays}>
          <WeekDays dias={dias} callbackFn={setDias} />
        </View>

        <View style={styles.descricao}>
          {/* <Fontisto style={styles.iconDesciption} name="left-align" size={15} /> */}
          <TextInput
            onChangeText={setDescricao}
            value={descricao}
            placeholder="Descrição"
            placeholderTextColor={"#3D3D3D"}
            multiline={true}
            numberOfLines={4}
            style={styles.textInputDescription}
          />
        </View>
        <View style={styles.erro}>
          <ErrorMessage show={showErrors} text={erros.descricao} />
        </View>

        <View style={styles.linkButton}>
          <CustomButton
            title="Salvar"
            callbackFn={salvar}
            showLoading={showLoading}
          />
        </View>

        <View>
          <Pressable onPress={confirmation}>
            {showLoadingApagar ? (
              <ActivityIndicator size="small" color="#FF7F7F" />
            ) : (
              <Text style={styles.apagar}>Apagar Rotina</Text>
            )}
          </Pressable>

          <ModalConfirmation
            visible={modalVisible}
            callbackFn={apagarRotina}
            closeModal={closeModal}
            message={`Apagar rotina ?`}
            messageButton="Apagar"
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
    color: "black",
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
    color: "black",
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
    color: "#3D3D3D",
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
    marginBottom: 30,
  },
  iconDesciption: {
    width: "10%",
    fontSize: 18,
  },
  descricao: {
    borderBottomWidth: 0,
    borderBottomColor: "black",
    paddingBottom: 5,
    width: 300,
  },
  textInputDescription: {
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    fontSize: 17,
    width: 300,
    padding: 12,
  },
  linkButton: {
    marginTop: 20,
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
  apagar: {
    color: "#FF7F7F",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 25,
    alignItems: "center",
  },
  toggleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    marginTop: 10,
    marginLeft: 20, 
  },
});
