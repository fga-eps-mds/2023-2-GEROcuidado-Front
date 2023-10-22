import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Cadastro() {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmaEmail, setConfirmaEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setName}
        value={nome}
        placeholder="Nome completo"
      />
      <TextInput onChangeText={setEmail} value={email} placeholder="Email" />
      <TextInput
        onChangeText={setConfirmaEmail}
        value={confirmaEmail}
        placeholder="Confirme seu Email"
      />
      <TextInput onChangeText={setSenha} value={senha} placeholder="Senha" />
      <TextInput
        onChangeText={setConfirmaSenha}
        value={confirmaSenha}
        placeholder="Confirme sua senha"
      />
      <TouchableOpacity style={styles.button}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  field: {},
  button: {
    width: "80%",
    maxWidth: 350,
    paddingVertical: 16,
    paddingHorizontal: 26,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#2CCDB5",
  },
});
