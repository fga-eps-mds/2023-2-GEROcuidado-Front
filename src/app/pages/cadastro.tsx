import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  Button,
} from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

export default function Cadastro() {
  const [temPermissaoGaleria, setTemPermissaoGaleria] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmaEmail, setConfirmaEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [escondeSenha, setEscondeSenha] = useState(true);
  const [escondeConfirmaSenha, setEscondeConfirmaSenha] = useState(true);

  useEffect(() => {
    (async () => {
      const statusGaleria =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setTemPermissaoGaleria(statusGaleria.status === "granted");
    })();
  }, []);

  const escolherImagem = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(resultado);

    if (!resultado.canceled) {
    }
  };

  if (temPermissaoGaleria === false) {
    return <Text>Sem acesso ao armazenamento interno</Text>;
  }

  return (
    <View style={styles.container}>
      <Button title="Escolher foto" onPress={() => escolherImagem()} />
      <View style={styles.field}>
        <Icon name="account-outline" size={20} />
        <TextInput
          onChangeText={setName}
          value={nome}
          placeholder="Nome completo"
          style={styles.textInput}
        />
      </View>
      <View style={styles.field}>
        <Icon name="email-outline" size={20} />
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          style={styles.textInput}
        />
      </View>
      <View style={styles.field}>
        <Icon name="email-outline" size={20} />
        <TextInput
          onChangeText={setConfirmaEmail}
          value={confirmaEmail}
          placeholder="Confirme seu Email"
          style={styles.textInput}
        />
      </View>
      <View style={styles.field}>
        <Icon name="lock-outline" size={20} />
        <TextInput
          onChangeText={setSenha}
          value={senha}
          placeholder="Senha"
          secureTextEntry={escondeSenha}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={() => setEscondeSenha(!escondeSenha)}>
          {escondeSenha ? (
            <Icon name="eye-outline" size={20} />
          ) : (
            <Icon name="eye-off-outline" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.field}>
        <Icon name="lock-outline" size={20} />
        <TextInput
          onChangeText={setConfirmaSenha}
          value={confirmaSenha}
          placeholder="Confirme sua senha"
          secureTextEntry={escondeConfirmaSenha}
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={() => setEscondeConfirmaSenha(!escondeConfirmaSenha)}
        >
          {escondeConfirmaSenha ? (
            <Icon name="eye-outline" size={20} />
          ) : (
            <Icon name="eye-off-outline" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: "80%",
    maxWidth: 350,
    paddingVertical: 16,
    paddingHorizontal: 26,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#2CCDB5",
  },
  field: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
