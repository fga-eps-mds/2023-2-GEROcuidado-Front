import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, TextInput } from "react-native";
import { Link } from 'expo-router';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomButton } from "../../components/CustomButton";
import Toast from 'react-native-toast-message';
import UserService from "../services/user.service";
import { ErrorMessage } from "../../components/ErrorMessage";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IErrors {
    email?: string,
    senha?: string,
}

export default function Login() {

    const userService = new UserService()
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [escondeSenha, setEscondeSenha] = useState(true);
    const [erros, setErros] = useState<IErrors>({});
    const [showErrors, setShowErrors] = useState(false);

    const login = async () => {
        if (Object.keys(erros).length > 0) {
            setShowErrors(true);
            return
        }

        const body = { email, senha };

        try {
            const response = await userService.loginUser(body);
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: response.message as string,
            });
            await AsyncStorage.setItem('token', response.data);
            // Navegar pras tabs
        } catch (err) {
            const error = err as { message: string }
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: error.message,
            });
        }


    };

    useEffect(() => handleErrors(), [email, senha]);

    const handleErrors = () => {
        let erros: IErrors = {};

        if (!email) {
            erros.email = 'Campo Obrigatório!';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            erros.email = 'Email inválido!';
        }

        if (!senha) {
            erros.senha = 'Campo Obrigatório!';
        }

        setErros(erros);
    };

    return (
        <View>
            <Link href="/" asChild style={styles.voltar}>
                <TouchableOpacity >
                    <Icon name="chevron-left" size={42} />
                </TouchableOpacity>
            </Link>

            <View style={styles.imagem}>
                <Image
                    source={require('../../../assets/logo2.png')}
                    style={{ width: 280, height: 90 }}
                />
            </View>

            <Text style={styles.titulo}>
                Bem Vindo de volta!
            </Text>

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

            <View style={styles.linkButton}>
                <CustomButton title="Entrar" callbackFn={login} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    voltar: {
        marginTop: 5
    },
    formControl: {
        flexDirection: "column",
        width: 320,
        alignItems: "flex-start",
        alignSelf: "center",
        marginTop: 10,
    },
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
        marginTop: 25,
    },
    imagem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,

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
    linkButton: {
        marginTop: 90,
        alignItems: "center",
    },
    foto: {
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
    eye: {
        marginLeft: 100,
    }
})