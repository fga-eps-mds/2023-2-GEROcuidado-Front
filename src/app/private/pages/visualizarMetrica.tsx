import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IIdoso } from "../../interfaces/idoso.interface";
import { router, useLocalSearchParams } from "expo-router";
import {
  EMetricas,
  IMetrica,
  IMetricaFilter,
  IMetricaValueFilter,
  IOrder,
  IValorMetrica,
} from "../../interfaces/metricas.interface";
import {
  getAllMetricaValues,
  postMetricaValue,
} from "../../services/metricaValue.service";
import Toast from "react-native-toast-message";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ModalMetrica from "../../components/ModalMetrica";
import CardValorMetrica from "../../components/CardValorMetrica";
import { getAllMetrica } from "../../services/metrica.service";

export default function VisualizarMetrica() {
  const params = useLocalSearchParams() as unknown as IMetrica;
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [idoso, setIdoso] = useState<IIdoso>();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>("");
  const [valueMetrica, setValueMetrica] = useState<IValorMetrica[]>([]);
  const [valor, setValor] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [altura, setAltura] = useState<IMetrica>();
  const [alturaValue, setAlturaValue] = useState(0);
  const [peso, setPeso] = useState<IMetrica>();
  const [pesoValue, setPesoValue] = useState(0);
  const [imc, setImc] = useState<IMetrica>();

  const order: IOrder = {
    column: "dataHora",
    dir: "DESC",
  };

  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });

    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  const getIdoso = () => {
    AsyncStorage.getItem("idoso").then((idosoString) => {
      if (idosoString) {
        const idosoPayload = JSON.parse(idosoString) as IIdoso;
        setIdoso(idosoPayload);
      }
    });
  };

  const getMetricasValues = () => {
    if (!idoso) return;

    setLoading(true);
    const filter: IMetricaValueFilter = { idMetrica: params.id };
    getAllMetricaValues(filter, order)
      .then((response) => {
        const newMetricasVAlues = response.data as IValorMetrica[];
        setValueMetrica(newMetricasVAlues);
      })
      .catch((err) => {
        const error = err as { message: string };
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const novoValor = () => {
    setModalVisible(true);
  };

  const salvar = async () => {
    const body = {
      idMetrica: Number(params.id),
      valor: valor,
      dataHora: new Date(),
    };

    try {
      setShowLoading(true);
      const response = await postMetricaValue(body, token);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      router.replace({
        pathname: "private/pages/visualizarMetrica",
        params: params,
      });
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
      setShowLoading(false);
    }
  };

  const debounceValor = (valor: string) => {
    setValor(valor);
  };

  const back = () => {
    router.push({
      pathname: "private/tabs/registros",
    });
  };

  const getMetricas = async () => {
    if (params.categoria == EMetricas.IMC) {
      if (idoso == undefined) return;

      setLoading(true);

      const metricaFilter: IMetricaFilter = {
        idIdoso: Number(idoso.id),
      };

      getAllMetrica(metricaFilter)
        .then((response) => {
          const newMetricas = response.data as IMetrica[];
          for (let metrica of newMetricas) {
            if (metrica.categoria == EMetricas.PESO) {
              // setPeso(metrica);
              getPesoValue(metrica);
            }
            if (metrica.categoria == EMetricas.ALTURA) {
              // setAltura(metrica);
              getAlturaValue(metrica);
            }
            if (metrica.categoria == EMetricas.IMC) {
              setImc(metrica);
            }
          }
        })
        .catch((err) => {
          const error = err as { message: string };
          Toast.show({
            type: "error",
            text1: "Erro!",
            text2: error.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const getAlturaValue = (item: IMetrica) => {
    if (!item) return;

    const filter: IMetricaValueFilter = { idMetrica: item.id };
    getAllMetricaValues(filter, order)
      .then((response) => {
        const newMetricasVAlues = response.data as IValorMetrica[];
        setAlturaValue(Number(newMetricasVAlues[0].valor));
      })
      .catch((err) => {
        const error = err as { message: string };
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: "Você ainda não cadastrou a altura!",
        });
      })
      .finally(() => {});
  };

  const getPesoValue = (item: IMetrica) => {
    if (!item) return;

    const filter: IMetricaValueFilter = { idMetrica: item.id };
    getAllMetricaValues(filter, order)
      .then((response) => {
        const newMetricasVAlues = response.data as IValorMetrica[];
        setPesoValue(Number(newMetricasVAlues[0].valor));
      })
      .catch((err) => {
        const error = err as { message: string };
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: "Você ainda não cadastrou o Peso!",
        });
      })
      .finally(() => {});
  };

  const calcular = async () => {
    getMetricas();

    const body = {
      idMetrica: Number(params.id),
      valor: (pesoValue / (alturaValue * alturaValue)).toString(),
      dataHora: new Date(),
    };

    try {
      setShowLoading(true);
      const response = await postMetricaValue(body, token);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      router.replace({
        pathname: "private/pages/visualizarMetrica",
        params: params,
      });
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
      setShowLoading(false);
    }
    useEffect(() => getIdoso(), []);
    useEffect(() => handleUser(), []);
    useEffect(() => getMetricasValues(), [idoso]);
  };

  return !user?.id ? (
    <NaoAutenticado />
  ) : (
    <View>
      <View>
        <View style={styles.header}>
          <Pressable onPress={() => back()}>
            <Icon name="chevron-left" size={40} color="#fff" />
          </Pressable>
          <Text style={styles.textheader}>{params.categoria}</Text>
        </View>

        <View
          style={
            params.categoria == EMetricas.IMC ? styles.botoes : styles.botao
          }
        >
          {params.categoria == EMetricas.IMC && (
            <Pressable style={styles.botaoEditarMetricas} onPress={calcular}>
              <Icon name="plus" color={"white"} size={20} />
              <Text style={styles.textoBotaoEditarMetricas}>
                Calcular automaticamente
              </Text>
            </Pressable>
          )}
          <Pressable style={styles.botaoEditarMetricas} onPress={novoValor}>
            <Icon name="plus" color={"white"} size={20} />
            <Text style={styles.textoBotaoEditarMetricas}>Novo valor</Text>
          </Pressable>
        </View>
        {/* 
        {valueMetrica.length == 0 && <Text>foi</Text>}
        {valueMetrica.length == 0 && <Text>foi</Text>} */}

        <FlatList
          data={valueMetrica}
          renderItem={({ item }) => (
            <Pressable>
              <CardValorMetrica
                item={{ ...item, categoria: params.categoria }}
                metrica={params}
              />
            </Pressable>
          )}
        />

        {modalVisible && (
          <ModalMetrica
            visible={modalVisible}
            callbackFn={salvar}
            callbackValor={debounceValor}
            closeModal={() => setModalVisible(false)}
            metrica={params}
            message={params.categoria}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2CCDB5",
    width: "100%",
    padding: 10,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  botaoEditarMetricas: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B4026D",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 10,
  },

  textoBotaoEditarMetricas: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 5,
  },

  textheader: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  botoes: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botao: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },
});
