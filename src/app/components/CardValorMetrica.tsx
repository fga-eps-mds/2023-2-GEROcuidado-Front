
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import { getImageUri, noImage } from "../shared/helpers/image.helper";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EMetricas, IMetrica, IValorMetrica, IValorMetricaCategoria } from "../interfaces/metricas.interface";

interface IProps {
    item: IValorMetricaCategoria;
}

export default function CardValorMetrica({ item }: IProps) {

    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
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
        if(item.categoria == EMetricas.ALTURA){
            return "cm"
        }
        if(item.categoria == EMetricas.HORAS_DORMIDAS){
            return "h"
        }
        if(item.categoria == EMetricas.IMC){
            return "kg/m²"
        }
    }
    const separaDataHora = () => {
        const value = item.dataHora as string;
        const valueFinal = value.split("T");
        const separaData = valueFinal[0].split("-");
        setData(`${separaData[2]}/${separaData[1]}/${separaData[0]}`);
        const separaHora = valueFinal[1].split(":");
        setHora(`${separaHora[0]}:${separaHora[1]}`);
    };

    
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
            return <View><Text style={{fontSize:40}}>O<Text style={{fontSize:15}}>2</Text></Text></View>
        }
        if(item.categoria == EMetricas.TEMPERATURA){
            return <FontAwesome name="thermometer" color={"#FFAC7D"} size={25}/>
        }
        if(item.categoria == EMetricas.ALTURA){
            return <Icon name="human-male-height-variant" color={"#3F3F3F"} size={25}/>
        }
        if(item.categoria == EMetricas.HORAS_DORMIDAS){
            return <FontAwesome name="bed" color={"#3F3F3F"} size={25}/>
        }
        if(item.categoria == EMetricas.IMC){
            return <View><Text style={{fontSize:25}}>IMC</Text></View>
        }
        
    }

    useEffect(() => separaDataHora(), []);
    
    return (
      <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.card, { borderColor: '#ddd', backgroundColor: '#fff' }]}>
                <View style={ item.categoria == EMetricas.SATURACAO_OXIGENIO ? styles.oxygenIcon : styles.othersIcons}>
                    {icone()}
                    <Text style={[styles.title, { color: titleColor }]}>{item.valor}</Text>
                    <Text style={[styles.units, { color: textColor }]}>{unidade()}</Text>
                </View>
                <View style = {styles.dataHora}>
                    <Text style={[styles.time, { color: textColor }]}>{data}</Text>
                    <Text style={[styles.time, { color: textColor }]}>{hora}</Text>

                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
        width: '90%', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 3, 
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    title: {
        fontSize: 25,
        marginLeft:8
    },
    number: {
        fontWeight: 'bold',
        fontSize: 24, 
    },
    units: {

        marginTop:5,
        marginLeft:3,
        fontSize: 18, 
    },
    time: {
        color: '#888',
        fontSize: 12,
        marginTop: 8,
    },
    othersIcons: {
        flexDirection: "row",
    },
    oxygenIcon: {
        flexDirection: "row",
        alignItems: "center"
    },
    dataHora:{
        flexDirection:"column",
        justifyContent:"flex-end",
    }

});