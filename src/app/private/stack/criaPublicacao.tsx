import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Image, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView } from "react-native-gesture-handler";
import { ECategoriaPublicacao } from "../../interfaces/forum.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import { postPublicacao } from "../../services/forum.service";
import Toast from "react-native-toast-message";

interface IErrors {
    titulo?: string;
    descricao?: string;
    categoria?: string;
  }

export default function CriaPublicacao() {
    const [selected, setSelected] = useState("");
    const [idUsuario, setIdUsuario] = useState<number>(-1);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataHora, setDataHora] = useState(new Date());
    const [categoria, setCategoria] = useState<ECategoriaPublicacao>(ECategoriaPublicacao.GERAL);
    const [contagemReportes, setContagemReportes] = useState(0);
    const [erros, setErros] = useState<IErrors>({});
    const [showErrors, setShowErrors] = useState(false);


    const getIdUsuario = () => {
        AsyncStorage.getItem('usuario').then((response) => {
            const usuario = JSON.parse(response as string) as IUser;
            setIdUsuario(usuario.id);
        })
    }

    getIdUsuario();
    
    const data = [
        { key: 'GERAL', value: ECategoriaPublicacao.GERAL },
        { key: 'SAUDE', value: ECategoriaPublicacao.SAUDE },
        { key: 'ALIMENTACAO', value: ECategoriaPublicacao.ALIMENTACAO },
        { key: 'EXERCICIOS', value: ECategoriaPublicacao.EXERCICIOS },
    ]

    const publicar = async () => {
        if(Object.keys(erros).length > 0){
            setShowErrors(true);
            return;
        }
        
        const body = {idUsuario, titulo, descricao, dataHora, categoria, contagemReportes};

        try{
            const response = await postPublicacao(body);
            Toast.show({
                type: "success",
                text1: "Sucesso!",
                text2: response.message as string,
              });
              router.push("/public/forum");
        }
        catch(err){
            const error = err as {message : string};
            Toast.show({
                type: "error",
                text1: "Erro!",
                text2: error.message,
              });
        }
    }

    useEffect(
        () => handleErrors(),
        [titulo, descricao, categoria],
      );
    
      const handleErrors = () => {
        const erros: IErrors = {};
    
        if (!titulo) {
          erros.titulo = "Campo obrigatório!";
        } 
    
        if (!descricao) {
          erros.descricao = "Campo Obrigatório!";
        } 
    
        if (!categoria) {
          erros.categoria = "Campo Obrigatório!";
        } 
        
        setErros(erros);
      };

    return (
        <ScrollView>
            <View>
                <View style={styles.pagina}>
                    <View>
                        <Link href="private/tabs/forum">
                            <Icon name="chevron-left" size={60} style={styles.botaoVoltar} />
                        </Link>
                    </View>
                    <View>
                        <Text style={styles.tituloPagina}>Nova publicação</Text>
                    </View>
                </View>
            </View>
            <View style={styles.publicacao}>
                <View style={styles.postHeader}>
                    <Image
                        style={styles.avatar}
                        source={require('../../../../assets/amelia.png')}
                    />
                    <View>
                        <Text style={styles.username}>Amélia</Text>
                    </View>
                </View>
                <View style={styles.tituloPublicacao}>
                    <Text style={styles.textoTituloEDescricao} >Título</Text>
                    <TextInput style={styles.inputTitulo} />
                </View>
                <View style={styles.descricao}>
                    <Text style={styles.textoTituloEDescricao} >Descrição</Text>
                    <TextInput style={styles.inputDescricao} multiline={true} numberOfLines={12} />
                </View>
                <SelectList
                    data={data}
                    setSelected={setSelected}
                    placeholder="Categoria"
                    search={false}
                />
                <Pressable style={styles.publicar} >
                    <Text style={styles.textoBotaoPublicar}>Publicar</Text>
                    <Icon name="pencil-outline" color={"white"} size={18} />
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pagina: {
        backgroundColor: "#2CCDB5",
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    tituloPagina: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 24,
        padding: 20,
    },
    botaoVoltar: {
        color: "white",
        alignSelf: "flex-start"
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    username: {
        marginLeft: 10,
        color: "#B4026D",
        fontSize: 20,
        fontWeight: "bold"
    },
    publicacao: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 24,
        backgroundColor: "white",
        margin: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    textoTituloEDescricao: {
        fontWeight: "500",
        marginBottom: 10,
    },
    tituloPublicacao: {
        marginBottom: 10
    },
    inputTitulo: {
        borderWidth: 0,
        padding: 5,
        backgroundColor: "#F1F1F1"
    },
    descricao: {
        marginBottom: 10
    },
    inputDescricao: {
        borderWidth: 0,
        padding: 5,
        backgroundColor: "#F1F1F1"
    },
    botoesPublicacao: {
        flexDirection: "column",
        justifyContent: "space-between",
        margin: 10,
    },
    publicar: {
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#B4026D',
        padding: 5,
        borderRadius: 14,
        width: 100,
        marginVertical: 20
    },
    categoria: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B4026D',
        padding: 1,
        borderRadius: 14,
    },
    textoBotaoPublicar: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold"
    },
});
