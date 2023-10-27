import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native";
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

  const salvar = async () => {
    if (Object.keys(erros).length > 0) {
      setShowErrors(true);
      return;
    }

    const body = { nome, foto };
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await updateUser(user.id, body, token as string);

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
    }
  };

  const apagarConta = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
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
      <BackButton route="/private/tabs/perfil" />

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
        <CustomButton title="Salvar" callbackFn={salvar} />
      </View>

      <Pressable onPress={confirmation}>
        <Text style={styles.apagar}>Apagar Conta</Text>
      </Pressable>

      <ModalConfirmation
        visible={modalVisible}
        callbackFn={apagarConta}
        closeModal={closeModal}
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
  voltar: {
    marginTop: 5,
  },
  formControl: {
    flexDirection: "column",
    width: 320,
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: 10,
  },
  button: {
    width: "80%",
    maxWidth: 350,
    paddingVertical: 16,
    paddingHorizontal: 26,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#2CCDB5",
    textAlign: "center",
  },
  field: {
    flexDirection: "row",
    width: 320,
    borderBottomWidth: 1,
    borderBottomColor: "#AFB1B6",
    paddingBottom: 5,
    height: 30,
    alignSelf: "center",
    marginBottom: 5,
  },
  iconInput: {
    width: "10%",
  },
  passwordInput: {
    paddingLeft: 10,
    color: "#05375a",
    width: "80%",
    fontSize: 17,
  },
  passwordIcon: {
    width: "10%",
  },
  textInput: {
    width: "90%",
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 17,
  },
  arrow: {
    alignSelf: "flex-start",
  },
  linkButton: {
    marginTop: 60,
    marginBottom: 60,
    alignItems: "center",
  },
});
