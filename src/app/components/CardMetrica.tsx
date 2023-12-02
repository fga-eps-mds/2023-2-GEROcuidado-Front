
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { getImageUri, noImage } from "../shared/helpers/image.helper";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IRotina } from "../interfaces/rotina.interface";
import { IMetrica } from "../interfaces/metricas.interface";

interface IProps {
    item: IMetrica;
}

export default function CardIdoso({ item }: IProps) {

    const titleColor = '#000'
    const textColor = '#888' 

    return (
        <View style={styles.container}>
            <View style={[styles.card, { borderColor: '#ddd', backgroundColor: '#fff' }]}>
                <Text style={[styles.title, { color: titleColor }]}>{item.categoria}</Text>
                <Text style={styles.content}>
                    <Text style={[styles.number]}>{item.valor}</Text>
                    <Text style={[styles.units, { color: textColor }]}>{"bpm"}</Text>
                </Text>
                <Text style={[styles.time, { color: textColor }]}>{"16:00"}</Text>
                <Icon name="chevron-right" size={16} color={textColor} style={styles.chevron} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
    },
    texto: {
        alignSelf: "center",
        marginTop: 10,
    },
    card: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        margin: 8,
        width: '100%', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, 
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 8,
    },
    content: {
        fontSize: 14,
        marginTop: 8,
    },
    number: {
        fontWeight: 'bold',
        fontSize: 24, 
    },
    units: {
        fontSize: 18, 
    },
    time: {
        color: '#888',
        fontSize: 12,
        marginTop: 8,
    },
    chevron: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
});
