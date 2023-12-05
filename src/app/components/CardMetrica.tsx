
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import { getImageUri, noImage } from "../shared/helpers/image.helper";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IRotina } from "../interfaces/rotina.interface";
import { EMetricas, IMetrica } from "../interfaces/metricas.interface";

interface IProps {
    item: IMetrica;
}

export default function CardIdoso({ item }: IProps) {

    const titleColor = '#000'
    const textColor = '#888' 

    const unidade = () => {
        if(item.categoria == EMetricas.FREQ_CARDIACA){
            return "bpm"
        }
        if(item.categoria == EMetricas.GLICEMIA){
            return "mg/dL"
        }
        if(item.categoria == EMetricas.PESO){
            return "kg"
        }
        if(item.categoria == EMetricas.PRESSAO_SANGUINEA){
            return "mmHg"
        }
        if(item.categoria == EMetricas.SATURACAO_OXIGENIO){
            return "%"
        }
        if(item.categoria == EMetricas.TEMPERATURA){
            return "°C"
        }
    }

    const icone = () => {
        if(item.categoria == EMetricas.FREQ_CARDIACA){
            return <FontAwesome name="heartbeat" color={"#FF7D7D"} size={25}/>
        }
        if(item.categoria == EMetricas.GLICEMIA){
            return <FontAwesome name="cubes" color={"#3F3F3F"} size={25}/>
        }
        if(item.categoria == EMetricas.PESO){
            return <Icon name="scale-bathroom" color={"#B4026D"} size={25}/>
        }
        if(item.categoria == EMetricas.PRESSAO_SANGUINEA){
            return <FontAwesome name="tint" color={"#FF7D7D"} size={25}/>
        }
        if(item.categoria == EMetricas.SATURACAO_OXIGENIO){
            return <View><Text>O<Text style={{fontSize:10}}>2</Text></Text></View>
        }
        if(item.categoria == EMetricas.TEMPERATURA){
            return <FontAwesome name="thermometer" color={"#FFAC7D"} size={25}/>
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.card, { borderColor: '#ddd', backgroundColor: '#fff' }]}>
                <View style={ item.categoria == EMetricas.SATURACAO_OXIGENIO ? styles.oxygenIcon : styles.othersIcons}>
                    {icone()}
                    <Text style={[styles.title, { color: titleColor }]}>{item.categoria}</Text>
                </View>
                <Text style={styles.content}>
                    {/* <Text style={[styles.number]}>{item.valor}</Text> */}
                    <Text style={[styles.units, { color: textColor }]}>{unidade()}</Text>
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
        height:150,
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
        marginLeft:8
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
        top: 12,
        left: 100,
    },
    othersIcons: {
        flexDirection:"row", 
        alignItems:"center"
    },
    oxygenIcon: {
        flexDirection:"row", 
        alignItems:"baseline"
    },

});
