
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { EMetricas, IMetrica, IValorMetricaCategoria } from "../interfaces/metricas.interface";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { deleteMetricaValue } from "../services/metricaValue.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

interface IProps {
    item: IValorMetricaCategoria;
    metrica: IMetrica;
}

export default function CardValorMetrica({ item, metrica }: IProps) {

    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [token, setToken] = useState<string>("");

    const titleColor = '#000'
    const textColor = '#888' 

    const getToken = () => {
        AsyncStorage.getItem("token").then((response) => {
        setToken(response as string);
        });
  };

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
        const dataHoraNum = new Date(item.dataHora).getTime();
        const fuso = new Date(item.dataHora).getTimezoneOffset()*60000;
        const value = new Date(dataHoraNum - fuso).toISOString();
        const valueFinal = value.split("T");
        const separaData = valueFinal[0].split("-");
        setData(`${separaData[2]}/${separaData[1]}/${separaData[0]}`);
        const separaHora = valueFinal[1].split(":");
        setHora(`${separaHora[0]}:${separaHora[1]}`);
    };

    
    const icone = () => {
        if (item.categoria == EMetricas.FREQ_CARDIACA) {
            return <FontAwesome name="heartbeat" color={"#FF7D7D"} size={25} />
        }
        if (item.categoria == EMetricas.GLICEMIA) {
            return <FontAwesome name="cubes" color={"#3F3F3F"} size={25} />
        }
        if (item.categoria == EMetricas.PESO) {
            return <Icon name="scale-bathroom" color={"#B4026D"} size={25} />
        }
        if (item.categoria == EMetricas.PRESSAO_SANGUINEA) {
            return <FontAwesome name="tint" color={"#FF7D7D"} size={25} />
        }
        if (item.categoria == EMetricas.SATURACAO_OXIGENIO) {
            return <View><Text>O<Text style={{ fontSize: 10 }}>2</Text></Text></View>
        }
        if (item.categoria == EMetricas.TEMPERATURA) {
            return <FontAwesome name="thermometer" color={"#FFAC7D"} size={25} />
        }
        if (item.categoria == EMetricas.HORAS_DORMIDAS) {
            return <FontAwesome name="bed" color={"#4B0082"} size={25} />
        }
        if (item.categoria == EMetricas.ALTURA) {
            return <Entypo name="ruler" color={"#000"} size={25} style={{ opacity: 0.8 }} />
        }
        if (item.categoria == EMetricas.IMC) {
            return <Entypo name="calculator" color={"#000"} size={25} />
        }
        
    }

    const apagarValor = async () => {
    try {
      await deleteMetricaValue(item.id, token);
      router.replace({
        pathname:"/private/pages/visualizarMetrica",
        params:metrica
    });
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
    //   setShowLoadingApagar(false);
    }

    }

    useEffect(() => separaDataHora(), []);
    useEffect(() => getToken(), []);
    
    return (
      <View style={styles.container}>
            <View style={[styles.card, { borderColor: '#ddd', backgroundColor: '#fff' }]}>
                <View style={ item.categoria == EMetricas.SATURACAO_OXIGENIO ? styles.oxygenIcon : styles.othersIcons}>
                    {icone()}
                    <Text style={[styles.title, { color: titleColor }]}>{item.valor}</Text>
                    <Text style={[styles.units, { color: textColor }]}>{unidade()}</Text>
                </View>
                <Octicons name="x-circle-fill" style={styles.apagar} size={22} color={"#FF7F7F"} onPress={apagarValor}/>
                <View style = {styles.dataHora}>
                    <Text style={[styles.time, { color: textColor }]}>{data}</Text>
                    <Text style={[styles.time, { color: textColor }]}>{hora}</Text>

                </View>
            </View>
        </View>
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
        alignItems:"flex-end"
    },
    apagar:{
        position:"absolute",
        right:0,
        top:0,
        padding:0,
    }

});