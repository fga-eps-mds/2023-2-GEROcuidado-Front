import React from "react"
import { View, Image, Text, StyleSheet, Pressable } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IIdoso } from "../interfaces/idoso.interface";
import { router } from "expo-router";

interface IProps {
    item: IIdoso;
}

export default function CardIdoso({ item }: IProps) {

    const getNome = (nome: string): string => {
        return nome.length < 25 ? nome : nome.slice(0, 25) + "...";
    };

    const hasFoto = (foto: string | null | undefined) => {
        if (!foto) return false;

        const raw = foto.split("data:image/png;base64,")[1];
        return raw.length > 0;
    };

    const getFoto = (foto: string | null | undefined) => {
        if (hasFoto(foto)) {
            return (
                <Image source={{ uri: foto as string }} style={styles.imagem} />
            );
        }
    }

    const navigate = () => {
        const params = { ...item, id: item.id };

        router.push({
            pathname: "/private/pages/editarIdoso",
            params: params,
        });
    };


    return (
        <View>
            <Pressable style={styles.idoso}>
                <View>
                    <Image source={require("../../../assets/Idoso.png")} style={styles.imagem} />
                </View>
                <Text style={styles.texto}>{item.nome}</Text>
                <Pressable style={styles.pencil} onPress={navigate}>
                    <Icon style={styles.pencilIcon} name="pencil-outline" size={20} color={"white"} />
                </Pressable>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    imagem: {
        height: 149,
        width: 132,
        borderRadius: 12,
    },
    texto: {
        alignSelf: "center",
    },
    pencil: {
        position: "absolute",
        right: -5,
        bottom: 12,
        backgroundColor: "#2CCDB5",
        borderRadius: 20,
        width: 28,
        height: 28,
        alignContent: "center",
        alignItems: "center",
    },
    pencilIcon: {
        marginTop: 3,
    },
    idoso: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 32,
    },
})
