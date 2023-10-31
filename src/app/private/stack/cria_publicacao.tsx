import { Link } from "expo-router";
import React from "react";
import { Pressable, Image, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView } from "react-native-gesture-handler";
import { ECategoriaPublicacao } from "../../interfaces/forum.interface";

export default function CriaPublicacao() {
    const [selected, setSelected] = React.useState("");

    
    const data = [
        { key: 'GERAL', value: ECategoriaPublicacao.GERAL },
        { key: 'SAUDE', value: ECategoriaPublicacao.SAUDE },
        { key: 'ALIMENTACAO', value: ECategoriaPublicacao.ALIMENTACAO },
        { key: 'EXERCICIOS', value: ECategoriaPublicacao.EXERCICIOS },
    ]
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
                <Pressable style={styles.publicar}>
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
