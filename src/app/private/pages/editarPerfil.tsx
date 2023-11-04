import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteUserById, updateUser } from "../../services/user.service";
import { router, useLocalSearchParams } from "expo-router";
import ErrorMessage from "../../components/ErrorMessage";
import CustomButton from "../../components/CustomButton";
import { IUser } from "../../interfaces/user.interface";
import UploadImage from "../../components/UploadImage";
import ModalConfirmation from "../../components/ModalConfirmation";
import BackButton from "../../components/BackButton";

interface IErrors {
  nome?: string;
}

export default function EditarPerfil() {
  const user = useLocalSearchParams() as unknown as IUser;
  const [foto, setFoto] = useState<string | undefined | null>(user.foto);
  const [nome, setNome] = useState(user.nome);
  const [erros, setErros] = useState<IErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showLoadingApagar, setShowLoadingApagar] = useState(false);

  const salvar = async () => {
    if (Object.keys(erros).length > 0) {
      setShowErrors(true);
      return;
    }

    const body = { nome, foto };
    const token = await AsyncStorage.getItem("token");

    if (body.foto && isBase64Image(body.foto)) {
      delete body.foto;
    }

    try {
      setShowLoading(true);
      const response = await updateUser(user.id, body, token as string);

      AsyncStorage.setItem("usuario", JSON.stringify(response.data)).then();

      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      router.push("/private/tabs/perfil");
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

  const isBase64Image = (str: string): boolean => {
    const expression = `data:image\/([a-zA-Z]*);base64,([^\"]*)`;
    const regex = new RegExp(expression);

    return regex.test(str);
  };

  const apagarConta = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      setShowLoadingApagar(true);
      const response = await deleteUserById(user.id, token as string);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      router.replace("/");
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

  const confirmation = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => handleErrors(), [nome]);

  const handleErrors = () => {
    const erros: IErrors = {};

    if (!nome) {
      erros.nome = "Campo obrigatório!";
    } else if (nome.length < 5) {
      erros.nome = "O nome completo deve ter pelo menos 5 caractéres.";
    } else if (nome.length > 60) {
      erros.nome = "O nome completo deve ter no máximo 60 caractéres.";
    }

    setErros(erros);
  };

  return (
    <View>
      <BackButton route="/private/tabs/perfil" color="#000" />

      {foto && <UploadImage setFoto={setFoto} uri={foto} />}
      {!foto && <UploadImage setFoto={setFoto} />}

      <View style={styles.formControl}>
        <View style={styles.field}>
          <Icon style={styles.iconInput} name="account-outline" size={20} />
          <TextInput
            onChangeText={setNome}
            value={nome}
            placeholder="Nome completo"
            style={styles.textInput}
          />
        </View>
        <ErrorMessage show={showErrors} text={erros.nome} />
      </View>

      <View style={(styles.formControl, styles.disabled)}>
        <View style={styles.field}>
          <Icon style={styles.iconInput} name="email-outline" size={20} />
          <Text style={styles.textInput}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.linkButton}>
        <CustomButton
          title="Salvar"
          callbackFn={salvar}
          showLoading={showLoading}
        />
      </View>

      <Pressable onPress={confirmation}>
        {showLoadingApagar ? (
          <ActivityIndicator size="small" color="#FF7F7F" />
        ) : (
          <Text style={styles.apagar}>Apagar Conta</Text>
        )}
      </Pressable>

      <ModalConfirmation
        visible={modalVisible}
        callbackFn={apagarConta}
        closeModal={closeModal}
        message="Prosseguir com a exclusão da conta?"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  apagar: {
    color: "#FF7F7F",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
  formControl: {
    width: 320,
    flexDirection: "column",
    marginTop: 10,
    alignSelf: "center",
    alignItems: "flex-start",
  },
  field: {
    width: 320,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#AFB1B6",
    flexDirection: "row",
    paddingBottom: 5,
    marginBottom: 5,
    alignSelf: "center",
  },
  iconInput: {
    width: "10%",
  },
  textInput: {
    color: "#05375a",
    width: "90%",
    paddingLeft: 10,
    fontSize: 17,
  },
  linkButton: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 60,
  },
});
