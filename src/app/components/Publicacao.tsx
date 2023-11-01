import React, { useState } from "react";
import { FlatList, View, Image, Text, StyleSheet, Pressable } from "react-native";
import { IPublicacao } from "../interfaces/forum.interface";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link, router } from "expo-router";

interface IProps {
    item: IPublicacao,
}

export default function Publicacao({ item }: Readonly<IProps>) {
    const [posts, setPosts] = useState();


    const navigate = () => {
        router.push({ pathname: "/private/pages/verificarPostagem", params: item});
      };

    const hasFoto = (foto: string | null | undefined) => {
        if (!foto) return false;

        const raw = foto.split("data:image/png;base64,")[1];
        return raw.length > 0;
    };

    const getFoto = (foto: string | null | undefined) => {
        if (hasFoto(foto)) {
            return (
                <Image source={{ uri: foto as string }} style={styles.fotoPerfil} />
            );
        }

        return (
            <View style={[styles.semFoto, styles.fotoPerfil]}>
                <Icon style={styles.semFotoIcon} name="image-outline" size={15} />
            </View>
        );
    };


    return (
        <Pressable style={styles.postContainer}>
            <Link href="/private/pages/verificarPostagem">
                <View >
                    <View style={styles.postHeader}>
                        {getFoto(item.usuario.foto)}
                        <View style={styles.userInfo}>
                            <Text style={styles.title}>{item.titulo}</Text>
                            <Text style={styles.username}>{item.usuario.nome}</Text>
                            <Text style={styles.date}>{item.dataHora.toString()}</Text>
                        </View>
                    </View>
                    <Text style={styles.postContent}>{item.descricao}</Text>
                </View>
            </Link>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        margin: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: "white",
        shadowColor: "#333",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    userInfo: {
        marginLeft: 10,
    },
    title: {
        fontSize: 20,
    },
    date: {
        fontSize: 12,
    },
    postContent: {
        fontSize: 15,
        maxHeight: 100,
        padding: 6,
        textAlign: "justify",
        marginLeft: 10,
        width: "100%",
    },
    fotoPerfil: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 100,
    },
    semFoto: { position: "relative", backgroundColor: "#EFEFF0" },
    semFotoIcon: {
        position: "absolute",
        right: "38%",
        bottom: "38%",
        opacity: 0.4,
        margin: "auto",
        alignSelf: "center",
        zIndex: 1,
    },
    username: {
        color: '#000000',
        opacity: 0.5
    }
});