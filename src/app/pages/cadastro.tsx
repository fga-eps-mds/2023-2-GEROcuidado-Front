import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UploadImage from "../../components/UploadImage";
import { CustomButton } from "../../components/CustomButton";
import UserService from "../services/user.service";

export default function Cadastro() {
  const userService = new UserService();
  const [foto, setFoto] = useState<string | null | undefined>("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmaEmail, setConfirmaEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [escondeSenha, setEscondeSenha] = useState(true);
  const [escondeConfirmaSenha, setEscondeConfirmaSenha] = useState(true);

  const cadastrar = async () => {
    // TODO realizar validações dos inputs

    const body = { nome, email, senha, foto }

    try {
      const response = await userService.postUser(body);
      // Setar o usuario em alguma storage da aplicação
      // Navegar para a tela de login
      // chamar serviço de notificação com sucesso
      console.log('SUCCESS: ', response.message);
      console.log('DATA: ', response.data);
    } catch (err) {
      // chamar serviço de notificação com erro
      console.log('ERROR: ', err)
    }
  }

  return (
    <View>
      <Link href="/" asChild>
        <TouchableOpacity >
          <Icon name="chevron-left" size={42} />
        </TouchableOpacity>
      </Link>

      <ScrollView>

        <UploadImage setFoto={setFoto} />

        <View style={styles.field}>
          <Icon style={styles.iconInput} name="account-outline" size={20} />
          <TextInput
            onChangeText={setNome}
            value={nome}
            placeholder="Nome completo"
            style={styles.textInput}
          />
        </View>

        <View style={styles.field}>
          <Icon style={styles.iconInput} name="email-outline" size={20} />
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            style={styles.textInput}
          />
        </View>

        <View style={styles.field}>
          <Icon style={styles.iconInput} name="email-outline" size={20} />
          <TextInput
            onChangeText={setConfirmaEmail}
            value={confirmaEmail}
            placeholder="Confirme seu Email"
            style={styles.textInput}
          />
        </View>

        <View style={styles.field}>
          <Icon style={styles.iconInput} name="lock-outline" size={20} />
          <TextInput
            onChangeText={setSenha}
            value={senha}
            placeholder="Senha"
            secureTextEntry={escondeSenha}
            style={styles.passwordInput}
          />

          <Icon onPress={() => setEscondeSenha(!escondeSenha)} style={styles.passwordIcon} name={escondeSenha ? "eye-outline" : "eye-off-outline"} size={20} />
        </View>

        <View style={styles.field}>
          <Icon style={styles.iconInput} name="lock-outline" size={20} />
          <TextInput
            onChangeText={setConfirmaSenha}
            value={confirmaSenha}
            placeholder="Confirme sua senha"
            secureTextEntry={escondeConfirmaSenha}
            style={styles.passwordInput}
          />
          <Icon onPress={() => setEscondeConfirmaSenha(!escondeConfirmaSenha)} style={styles.passwordIcon} name={escondeConfirmaSenha ? "eye-outline" : "eye-off-outline"} size={20} />
        </View>

        <View style={styles.linkButton}>
          <CustomButton title="Cadastrar" callbackFn={cadastrar} />
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#AFB1B6",
    paddingBottom: 5,
    width: 320,
    height: 30,
    alignSelf: "center",
    marginBottom: 20,
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
    marginTop: 90,
    marginBottom: 60,
    alignItems: "center",
  },
});
