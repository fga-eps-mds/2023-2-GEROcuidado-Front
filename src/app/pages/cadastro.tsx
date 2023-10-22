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
    <View >

      <Link href="/" asChild>
        <TouchableOpacity >
          <Icon name="chevron-left" size={42} />
        </TouchableOpacity>
      </Link>

      <View style={styles.foto}>
        <UploadImage />
      </View>

      <View style={styles.field}>
        <Icon name="account-outline" size={20} />
        <TextInput
          onChangeText={setNome}
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

        <TouchableOpacity  onPress={() => setEscondeSenha(!escondeSenha)}>
          {escondeSenha ? (
            <Icon style={styles.eye} name="eye-outline" size={20} />
          ) : (
            <Icon style={styles.eye} name="eye-off-outline" size={20} />
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
          <TouchableOpacity onPress={() => setEscondeConfirmaSenha(!escondeConfirmaSenha)}
          >
            {escondeConfirmaSenha ? (
              <Icon  name="eye-outline" size={20} />
              ) : (
                <Icon  name="eye-off-outline" size={20} />
                )}
          </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.button}>
        <Text>Cadastrar</Text>
      </TouchableOpacity> */}
      <View style={styles.linkButton}>
        <LinkButton title="Cadastrar" href="/pages/cadastro" />
      </View>

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
  },
  textInput: {
    //marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  arrow: {
    alignSelf: "flex-start",
  },
  linkButton:{
    marginTop: 123,
    width: "80%", 
    margin: "auto",
    alignItems: "center",
  },
  foto:{
    backgroundColor: "#EFEFF0",
    borderRadius: 25,
    alignItems: "center",
    display: "flex",
    width: 167,
    height: 174,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#AFB1B6",
    marginBottom: 38,
  },
  eye:{
    
  }
});
