import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinkButton } from "../../components/LinkButton";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Login(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [escondeSenha, setEscondeSenha] = useState(true);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Botão de voltar no canto superior esquerdo */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 20, // Ajuste a posição superior conforme necessário
            left: 10, // Ajuste a posição à esquerda conforme necessário
          }}
        >
          <Icon name="chevron-left" size={42} />
        </TouchableOpacity>
        
        {/* Título da tela */}
        <View style={{ padding: 10, backgroundColor: 'lightgray' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Fórum</Text>
        </View>
            <View style = {styles.imagem}>   
                <Image 
                    source={require('../../../assets/logo2.png')} 
                    style={{ width: 350, height: 90}}
                />
            </View>
            <Text style={styles.titulo}>
                Bem Vindo de volta!
            </Text>

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
                <Icon name="lock-outline" size={20} />
                <TextInput
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Senha"
                    secureTextEntry={escondeSenha}
                     style={styles.textInput}
                />
  
                <TouchableOpacity style={styles.eye} onPress={() => setEscondeSenha(!escondeSenha)}>
                    {escondeSenha ? (
                        <Icon name="eye-outline" size={20} />
                    ) : (
                        <Icon name="eye-off-outline" size={20} />
                    )}
                 </TouchableOpacity>
            </View>
            <View style={styles.linkButton}>
                <LinkButton title="Entrar" href="/pages/cadastro" />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    titulo: {
      fontSize: 28,
      fontWeight: "400",
      textAlign: "center",
      margin: 20,
      marginBottom: 70
    },
    imagem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,

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
        marginLeft: 100,
    }
})