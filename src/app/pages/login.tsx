import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, TextInput } from "react-native";
import { Link } from 'expo-router';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinkButton } from "../../components/LinkButton";
//import UserService from "../services/user.service";


export default function Login(){
    
    //const userService = new UserService();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [escondeSenha, setEscondeSenha] = useState(true);

    /*const logar = async () => {
        // TODO realizar validações dos inputs
    
        const body = {email, senha}
    
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
    }*/

    return (
        <View>

            <Link href="/" asChild>
                <TouchableOpacity >
                    <Icon name="chevron-left" size={42} />
                </TouchableOpacity>
            </Link>
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
      fontWeight: "300",
      textAlign: "center",
      margin: 20,
      marginBottom: 70,
      marginTop: 50,
    },
    imagem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 170,

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