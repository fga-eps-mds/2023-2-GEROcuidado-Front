import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, ScrollView, Pressable, ActivityIndicator, Text } from "react-native";
import Toast from "react-native-toast-message";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { postUser } from "../../services/user.service";
import BackButton from "../../components/BackButton";
import UploadImage from "../../components/UploadImage";
import ErrorMessage from "../../components/ErrorMessage";
import CustomButton from "../../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalConfirmation from "../../components/ModalConfirmation";


export default function CadastrarIdoso() {
    const [foto, setFoto] = useState<string | null | undefined>("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [confirmaEmail, setConfirmaEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [escondeSenha, setEscondeSenha] = useState(true);
    const [escondeConfirmaSenha, setEscondeConfirmaSenha] = useState(true);
    //const [erros, setErros] = useState<IErrors>({});
    //const [showErrors, setShowErrors] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showLoadingApagar, setShowLoadingApagar] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const salvar = () => {
        //TODO função de salvar idoso
    }

    const apagarIdoso = async () => {
        //TODO função de apagar idoso
      };

    const confirmation = () => {
        setModalVisible(!modalVisible);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleErrors = () =>{
        //TODO verificação de erros
    }

    //TODO mensagens de erros   

    return (
        <View>
            <BackButton />

            <ScrollView>
                <UploadImage setFoto={setFoto} />

                <View style={styles.formControl}>
                    <View style={styles.field}>
                        <Icon style={styles.iconInput} name="account-outline" size={20} />
                        <TextInput
                            onChangeText={setNome}
                            value={nome}
                            placeholder="Nome"
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <View style={styles.formControl}>
                    <View style={styles.field}>
                        <Icon style={styles.iconInput} name="cake-variant-outline" size={20} />
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Data de Nascimento"
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <View style={styles.formControl}>
                    <View style={styles.field}>
                        <Fontisto style={styles.iconInput } name="blood-drop" size={20} />
                        <TextInput
                            onChangeText={setConfirmaEmail}
                            value={confirmaEmail}
                            placeholder="Tipo Sanguíneo"
                            style={styles.bloodInput}
                        />
                        <AntDesign style={styles.bloodIcon} name="down" size={20}/>
                        {/* //TODO dropdown dos tipos sanguineos */}
                    </View>
                </View>

                <View style={styles.formControl}>
                    <View style={styles.field}>
                        <AntDesign style={styles.iconInput} name="phone" size={20} />
                        <TextInput
                            onChangeText={setSenha}
                            value={senha}
                            placeholder="Telefone de Contato"
                            secureTextEntry={escondeSenha}
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <View style={styles.formControl}>
                    <View style={styles.field}>
                        <Fontisto style={styles.iconInput} name="left-align" size={15} />
                        <TextInput
                            onChangeText={setConfirmaSenha}
                            value={confirmaSenha}
                            placeholder="Descrição"
                            secureTextEntry={escondeConfirmaSenha}
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <View style={styles.linkButton}>
                    <CustomButton
                        title="Salvar"
                        callbackFn={salvar}
                        showLoading={showLoading}
                    />
                </View>

                <Pressable onPress={confirmation}>
                    {showLoadingApagar ? (
                        <ActivityIndicator size="small" color="#FF7F7F" />
                    ) : (
                        <Text style={styles.apagar}>Apagar Idoso</Text>
                    )}
                </Pressable>
                
                <ModalConfirmation
                    visible={modalVisible}
                    callbackFn={apagarIdoso}
                    closeModal={closeModal}
                    message="Apagar publicação?"
                />

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
        alignSelf: "center",
        marginLeft:10,
    },
    bloodInput: {
        paddingLeft: 10,
        color: "#05375a",
        width: "80%",
        fontSize: 17,
    },
    bloodIcon: {
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
    apagar: {
        color: "#FF7F7F",
        alignSelf: "center",
        fontSize: 18,
        fontWeight: "600",
    },
});
