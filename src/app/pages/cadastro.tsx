import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  Button,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UploadImage from "../../components/UploadImage";
import { LinkButton } from "../../components/LinkButton";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmaEmail, setConfirmaEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [escondeSenha, setEscondeSenha] = useState(true);
  const [escondeConfirmaSenha, setEscondeConfirmaSenha] = useState(true);

  return (
    <View>
      <Link href="/" asChild>
        <TouchableOpacity >
          <Icon name="chevron-left" size={42} />
        </TouchableOpacity>
      </Link>

      <ScrollView>

        <UploadImage />

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
          <LinkButton title="Cadastrar" href="/pages/cadastro" />
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
