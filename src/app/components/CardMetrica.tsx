import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  EMetricas,
  IMetrica,
  IMetricaFilter,
  IMetricaValueFilter,
  IOrder,
  IValorMetrica,
} from "../interfaces/metricas.interface";
import { getAllMetricaValues } from "../services/metricaValue.service";
import Toast from "react-native-toast-message";
import { Entypo } from "@expo/vector-icons";
import { getAllMetrica } from "../services/metrica.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IIdoso } from "../interfaces/idoso.interface";

interface IProps {
  item: IMetrica;
}

export default function CardMetrica({ item }: IProps) {
  const [valorMetrica, setValorMetrica] = useState<IValorMetrica>();
  const [dataHora, setDataHora] = useState<string>();
  const [hora, setHora] = useState("");
  const [data, setData] = useState("");

  const order: IOrder = {
    column: "dataHora",
    dir: "DESC",
  };

  const titleColor = "#000";
  const textColor = "#888";

  const unidade = () => {
    if (item.categoria == EMetricas.FREQ_CARDIACA) {
      return "bpm";
    }
    if (item.categoria == EMetricas.GLICEMIA) {
      return "mg/dL";
    }
    if (item.categoria == EMetricas.PESO) {
      return "kg";
    }
    if (item.categoria == EMetricas.PRESSAO_SANGUINEA) {
      return "mmHg";
    }
    if (item.categoria == EMetricas.SATURACAO_OXIGENIO) {
      return "%";
    }
    if (item.categoria == EMetricas.TEMPERATURA) {
      return "°C";
    }
    if (item.categoria == EMetricas.HORAS_DORMIDAS) {
      return "h";
    }
    if (item.categoria == EMetricas.ALTURA) {
      return "cm";
    }
    if (item.categoria == EMetricas.IMC) {
      return "kg/m²";
    }
  };

  const icone = () => {
    if (item.categoria == EMetricas.FREQ_CARDIACA) {
      return <FontAwesome name="heartbeat" color={"#FF7D7D"} size={25} />;
    }
    if (item.categoria == EMetricas.GLICEMIA) {
      return <FontAwesome name="cubes" color={"#3F3F3F"} size={25} />;
    }
    if (item.categoria == EMetricas.PESO) {
      return <Icon name="scale-bathroom" color={"#B4026D"} size={25} />;
    }
    if (item.categoria == EMetricas.PRESSAO_SANGUINEA) {
      return <FontAwesome name="tint" color={"#FF7D7D"} size={25} />;
    }
    if (item.categoria == EMetricas.SATURACAO_OXIGENIO) {
      return (
        <View>
          <Text>
            O<Text style={{ fontSize: 10 }}>2</Text>
          </Text>
        </View>
      );
    }
    if (item.categoria == EMetricas.TEMPERATURA) {
      return <FontAwesome name="thermometer" color={"#FFAC7D"} size={25} />;
    }
    if (item.categoria == EMetricas.HORAS_DORMIDAS) {
      return <FontAwesome name="bed" color={"#4B0082"} size={25} />;
    }
    if (item.categoria == EMetricas.ALTURA) {
      return (
        <Entypo
          name="ruler"
          color={"#000"}
          size={25}
          style={{ opacity: 0.8 }}
        />
      );
    }
    if (item.categoria == EMetricas.IMC) {
      return <Entypo name="calculator" color={"#000"} size={25} />;
    }
  };

  const getMetricas = () => {
    const filter: IMetricaValueFilter = { idMetrica: item.id };
    getAllMetricaValues(filter, order)
      .then((response) => {
        const newMetricasVAlues = response.data as IValorMetrica[];
        setValorMetrica(newMetricasVAlues[0]);
      })
      .catch((err) => {
        const error = err as { message: string };
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: error.message,
        });
      });
  };

  const separaDataHora = () => {
    setDataHora(valorMetrica?.dataHora as string);

    if (!dataHora) return;

    const dataHoraNum = new Date(dataHora).getTime();
    const fuso = new Date(dataHora).getTimezoneOffset() * 60000;
    const value = new Date(dataHoraNum - fuso).toISOString();
    const valueFinal = value.split("T");
    const separaHora = valueFinal[1].split(":");
    setHora(`${separaHora[0]}:${separaHora[1]}`);
    const separaData = valueFinal[0].split("-");
    setData(`${separaData[2]}/${separaData[1]}/${separaData[0]}`);
  };

  useEffect(getMetricas, []);
  useEffect(() => separaDataHora(), [dataHora, valorMetrica]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={[styles.card, { borderColor: "#ddd", backgroundColor: "#fff" }]}
      >
        <View
          style={
            item.categoria == EMetricas.SATURACAO_OXIGENIO
              ? styles.oxygenIcon
              : styles.othersIcons
          }
        >
          {icone()}
          <Text style={[styles.title, { color: titleColor }]}>
            {item.categoria}
          </Text>
        </View>
        <Text style={styles.content}>
          {valorMetrica && (
            <>
              <Text style={[styles.number]}>{valorMetrica.valor}</Text>
              <Text style={[styles.units, { color: textColor }]}>
                {unidade()}
              </Text>
            </>
          )}
          {!valorMetrica && (
            <Text style={[styles.units, { color: textColor }]}>
              Nenhum valor cadastrado
            </Text>
          )}
        </Text>
        {dataHora && (
          <Text style={[styles.time, { color: textColor }]}>
            {data} às {hora}
          </Text>
        )}
        <Icon
          name="chevron-right"
          size={16}
          color={textColor}
          style={styles.chevron}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
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
    width: 150,
    height: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 8,
  },
  content: {
    fontSize: 14,
    marginTop: 8,
  },
  number: {
    fontWeight: "bold",
    fontSize: 24,
  },
  units: {
    marginLeft: 3,
    fontSize: 18,
  },
  time: {
    color: "#888",
    fontSize: 12,
    marginTop: 8,
  },
  chevron: {
    top: 10,
    left: "85%",
    position: "absolute",
  },
  othersIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  oxygenIcon: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});
