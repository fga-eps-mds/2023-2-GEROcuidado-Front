import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import BackButton from "../components/BackButton";
import CustomButton from "../components/CustomButton";
import ErrorMessage from "../components/ErrorMessage";
import UploadImage from "../components/UploadImage";
import { postUser } from "../services/user.service";

interface IErrors {
  nome?: string;
  email?: string;
  confirmaEmail?: string;
  senha?: string;
  confirmaSenha?: string;
}

export default function Cadastro() {
  const [foto, setFoto] = useState<string | null | undefined>("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmaEmail, setConfirmaEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [escondeSenha, setEscondeSenha] = useState(true);
  const [escondeConfirmaSenha, setEscondeConfirmaSenha] = useState(true);
  const [erros, setErros] = useState<IErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const cadastrar = async () => {
    if (Object.keys(erros).length > 0) {
      setShowErrors(true);
      return;
    }

    const body = { nome, email: email.toLowerCase().trim(), senha, foto };

    try {
      setShowLoading(true);
      const response = await postUser(body);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      router.push("/public/login");
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

  useEffect(
    () => handleErrors(),
    [nome, email, confirmaEmail, senha, confirmaSenha],
  );

  const handleErrors = () => {
    const erros: IErrors = {};

    if (!nome) {
      erros.nome = "Campo obrigatório!";
    } else if (nome.length < 5) {
      erros.nome = "O nome completo deve ter pelo menos 5 caracteres!";
    } else if (nome.length > 60) {
      erros.nome = "O nome completo deve ter no máximo 60 caracteres!";
    }

    if (!email) {
      erros.email = "Campo Obrigatório!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      erros.email = "Email inválido!";
    }

    if (!confirmaEmail) {
      erros.confirmaEmail = "Campo Obrigatório!";
    } else if (confirmaEmail !== email) {
      erros.confirmaEmail = "Os emails precisam ser iguais!";
    }

    if (!senha) {
      erros.senha = "Campo Obrigatório!";
    } else if (senha.length < 6) {
      erros.senha = "Senha deve ter no mínimo 6 caracteres!";
    }

    if (!confirmaSenha) {
      erros.confirmaSenha = "Campo Obrigatório!";
    } else if (confirmaSenha !== senha) {
      erros.confirmaSenha = "As senhas precisam ser iguais!";
    }

    setErros(erros);
  };

  return (
    <View>
      <BackButton color="#000" route="/" />

      <ScrollView>
        <UploadImage setFoto={setFoto} />

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

        <View style={styles.formControl}>
          <View style={styles.field}>
            <Icon style={styles.iconInput} name="email-outline" size={20} />
            <TextInput
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              style={styles.textInput}
            />
          </View>
          <ErrorMessage show={showErrors} text={erros.email} />
        </View>

        <View style={styles.formControl}>
          <View style={styles.field}>
            <Icon style={styles.iconInput} name="email-outline" size={20} />
            <TextInput
              onChangeText={setConfirmaEmail}
              value={confirmaEmail}
              placeholder="Confirme seu Email"
              style={styles.textInput}
            />
          </View>
          <ErrorMessage show={showErrors} text={erros.confirmaEmail} />
        </View>

        <View style={styles.formControl}>
          <View style={styles.field}>
            <Icon style={styles.iconInput} name="lock-outline" size={20} />
            <TextInput
              onChangeText={setSenha}
              value={senha}
              placeholder="Senha"
              secureTextEntry={escondeSenha}
              style={styles.passwordInput}
            />

            <Icon
              onPress={() => setEscondeSenha(!escondeSenha)}
              style={styles.passwordIcon}
              name={escondeSenha ? "eye-outline" : "eye-off-outline"}
              size={20}
            />
          </View>
          <ErrorMessage show={showErrors} text={erros.senha} />
        </View>

        <View style={styles.formControl}>
          <View style={styles.field}>
            <Icon style={styles.iconInput} name="lock-outline" size={20} />
            <TextInput
              onChangeText={setConfirmaSenha}
              value={confirmaSenha}
              placeholder="Confirme sua senha"
              secureTextEntry={escondeConfirmaSenha}
              style={styles.passwordInput}
            />
            <Icon
              onPress={() => setEscondeConfirmaSenha(!escondeConfirmaSenha)}
              style={styles.passwordIcon}
              name={escondeConfirmaSenha ? "eye-outline" : "eye-off-outline"}
              size={20}
            />
          </View>
          <ErrorMessage show={showErrors} text={erros.confirmaSenha} />
        </View>

        <View style={styles.linkButton}>
          <CustomButton
            title="Cadastrar"
            callbackFn={cadastrar}
            showLoading={showLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 40,
    alignItems: "center",
  },
});
