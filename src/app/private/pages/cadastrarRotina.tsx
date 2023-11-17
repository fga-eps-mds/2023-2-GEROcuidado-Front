import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    View,
    TextInput,
} from "react-native";
  import React, { useEffect, useState} from "react";
  import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link, router } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { ECategoriaRotina } from "../../interfaces/rotina.interface";

export default function Rotina() {

    const[titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState<ECategoriaRotina | null>(null);

    const data = [
        { key: ECategoriaRotina.GERAL, value: ECategoriaRotina.GERAL },
        { key: ECategoriaRotina.MEDICAMENTO, value: ECategoriaRotina.MEDICAMENTO },
        {
          key: ECategoriaRotina.ALIMENTACAO,
          value: ECategoriaRotina.ALIMENTACAO,
        },
        {
          key: ECategoriaRotina.EXERCICIOS,
          value: ECategoriaRotina.EXERCICIOS,
        },
    ];

    return(
        <ScrollView>
        <View style={styles.header}>
          <Link href="private/tabs/rotinas">
            <Icon name="chevron-left" size={40} color="#fff" />
          </Link>
          <Text style={styles.tituloheader}>Nova rotina</Text>
        </View>
        <View style = {styles.rotina}>
            <View style={styles.field}>
                <TextInput
                onChangeText={setTitulo}
                value={titulo}
                placeholder="Adicionar título"
                style={styles.textInput}
                />
            </View>

            <View style={styles.data}>
                <Icon style={styles.iconInput} name="email-outline" size={20} />
                <TextInput
                //onChangeText={setEmail}
                //value={email}
                placeholder="Data da rotina"
                style={styles.textInput}
                />
            </View>

            <View style={styles.data}>
                <Icon style={styles.iconInput} name="email-outline" size={20} />
                <TextInput
                //onChangeText={setEmail}
                //value={email}
                placeholder="Horário de início"
                style={styles.textInput}
                />
            </View>

            <View style={styles.formControl2}>
                <View style={styles.selectInput}>
                    <SelectList
                    boxStyles={styles.dropdown}
                    inputStyles={styles.categoria}
                    data={data}
                    setSelected={setCategoria}
                    placeholder="Categoria"
                    search={false}
                    />
                </View>
                {/* <ErrorMessage show={showErrors} text={erros.categoria} /> */}
            </View>
        </View>
        </ScrollView>

    );
};


const styles = StyleSheet.create({
    header: {
    backgroundColor: "#2CCDB5",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    },

    tituloheader: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    },
    categoria: {
        width: "90%",
        paddingLeft: 10,
        color: "#05375a",
        fontSize: 17,
    },

    iconInput: {
        width: "10%",
    },
    formControl: {
        marginBottom: 15,
    },
    selectInput: {
        marginBottom: 5,
    },
    dropdown: {
        width: 300,
        borderWidth: 0,
        paddingLeft: 10,
        color: "#05375A",
        fontSize: 17,
    },
    
    rotina: {
        borderRadius: 15,
        backgroundColor: "white",
        margin: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },

    formControl2: {
        flexDirection: "row",
        width: 320,
        alignItems: "flex-start",
        alignSelf: "center",
        marginTop: 10,
    },

    field: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        paddingBottom: 5,
        width: 320,
        height: 30,
        alignSelf: "center",
        marginBottom: 40,
    },
    data: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        paddingBottom: 5,
        width: 320,
        height: 30,
        marginBottom: 25,
        
    },
    textInput: {
        width: "90%",
        paddingLeft: 10,
        color: "#05375a",
        fontSize: 17,
        textAlign: "center",
        
    },
});