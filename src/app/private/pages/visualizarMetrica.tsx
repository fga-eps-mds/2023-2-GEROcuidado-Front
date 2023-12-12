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
import { FlatList } from "react-native-gesture-handler";
import ModalMetrica from "../../components/ModalMetrica";
import ModalMeta from "../../components/ModalMeta";
import CardValorMetrica from "../../components/CardValorMetrica";
import {
  getAllMetrica,
  getSomaHidratacao,
  updateMetrica,
} from "../../services/metrica.service";

export default function VisualizarMetrica() {
  const params = useLocalSearchParams() as unknown as IMetrica;
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [token, setToken] = useState<string>("");
  const [valueMetrica, setValueMetrica] = useState<IValorMetrica[]>([]);
  const [idoso, setIdoso] = useState<IIdoso>();
  const [showLoading, setShowLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMetaVisible, setModalMetaVisible] = useState(false);
  const [meta, SetMeta] = useState(params.valorMaximo);
  const [somaMeta, setSomaMeta] = useState(0);

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
      getHidratacao(response as string);
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
    setShowLoading(true);
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
        setShowLoading(false);
      });
  };

  const novoValor = () => {
    setModalVisible(true);
  };

  const novaMeta = () => {
    setModalMetaVisible(true);
  };

  const salvar = async (valor: string) => {
    const body = {
      idMetrica: Number(params.id),
      valor,
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
      setModalVisible(false);
      getMetricasValues();
      getHidratacao(token);
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

  const back = () => {
    router.replace({
      pathname: "private/tabs/registros",
    });
  };

  const getIMC = async () => {
    if (params.categoria !== EMetricas.IMC || !idoso) return;

    const metricaFilter: IMetricaFilter = {
      idIdoso: Number(idoso.id),
    };

    const response = await getAllMetrica(metricaFilter);
    const newMetricas = response.data as IMetrica[];

    const metricaPeso = newMetricas.find((metrica) => {
      return metrica.categoria == EMetricas.PESO;
    }) as IMetrica;

    const metricaAltura = newMetricas.find((metrica) => {
      return metrica.categoria == EMetricas.ALTURA;
    }) as IMetrica;

    const peso = await getLastValue(metricaPeso.id);
    const altura = await getLastValue(metricaAltura.id);

    const alturaMetro = Number(altura) / 100;

    return Number(peso) / (alturaMetro * alturaMetro);
  };

  const getLastValue = async (idMetrica: number) => {
    const filter: IMetricaValueFilter = { idMetrica };
    const response = await getAllMetricaValues(filter, order);
    const newMetricasValues = response.data as IValorMetrica[];

    const valor = newMetricasValues[0]?.valor;

    if (!valor) {
      throw new Error("Altura/Peso não cadastrado!");
    }

    return valor;
  };

  const calcular = async () => {
    setShowLoading(true);

    try {
      const IMC = await getIMC();

      const body = {
        idMetrica: Number(params.id),
        valor: String(IMC?.toFixed(2)),
        dataHora: new Date(),
      };

      const response = await postMetricaValue(body, token);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      getMetricasValues();
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

  const adicionarMeta = async (valorMaximo: string) => {
    const body = {
      valorMaximo: valorMaximo,
    };

    try {
      setShowLoading(true);
      const response = await updateMetrica(params.id, body, token);
      SetMeta(response.data?.valorMaximo);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      setModalMetaVisible(false);
      getMetricasValues();
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

  const getHidratacao = (token: string) => {
    if (params.categoria !== EMetricas.HIDRATACAO) return;

    getSomaHidratacao(params.id, token)
      .then((response) => {
        setSomaMeta(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getIdoso();
    getMetricasValues();
    handleUser();
  }, []);

  return !user?.id ? (
    <NaoAutenticado />
  ) : (
    <View>
      <View style={styles.header}>
        <Pressable onPress={() => back()}>
          <Icon name="chevron-left" size={40} color="#fff" />
        </Pressable>
        <Text style={styles.textheader}>{params.categoria}</Text>
      </View>

      <View
        style={params.categoria == EMetricas.IMC ? styles.botoes : styles.botao}
      >
        {params.categoria == EMetricas.IMC && (
          <Pressable style={styles.botaoEditarMetricas} onPress={calcular}>
            <Icon name="plus" color={"white"} size={20} />
            <Text style={styles.textoBotaoEditarMetricas}>
              Calcular automaticamente
            </Text>
          </Pressable>
        )}
        {params.categoria == EMetricas.HIDRATACAO && (
          <Pressable style={styles.botaoAdicionarMeta} onPress={novaMeta}>
            <Text style={styles.textoBotaoAdicionarMeta}>Adicionar meta</Text>
          </Pressable>
        )}
        <Pressable style={styles.botaoEditarMetricas} onPress={novoValor}>
          <Icon name="plus" color={"white"} size={20} />
          <Text style={styles.textoBotaoEditarMetricas}>Novo valor</Text>
        </Pressable>
      </View>
      <View style={styles.valorMaximoHidratacao}>
        {params.categoria == EMetricas.HIDRATACAO && (
          <View>
            <View
              style={[
                styles.valorAtualCotainer,
                { borderColor: somaMeta >= Number(meta) ? "green" : "#000" },
              ]}
            >
              <Text
                style={[
                  styles.valorAtualTexto,
                  { color: somaMeta >= Number(meta) ? "green" : "#000" },
                ]}
              >{`${somaMeta} ml/${meta} ml`}</Text>
            </View>
          </View>
        )}
      </View>
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
          closeModal={() => setModalVisible(false)}
          metrica={params}
          message={params.categoria}
        />
      )}
      {modalMetaVisible && (
        <ModalMeta
          visible={modalMetaVisible}
          callbackFn={adicionarMeta}
          closeModal={() => setModalMetaVisible(false)}
          metrica={params}
          message={params.categoria}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2CCDB5",
    width: "100%",
    padding: 20,
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

  botaoAdicionarMeta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B4026D",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 10,
    position: "absolute",
    left: 10,
  },

  textoBotaoEditarMetricas: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 5,
  },
  textoBotaoAdicionarMeta: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 5,
    padding: 3,
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
  valorMaximoHidratacao: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  valorAtualCotainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 15,
    opacity: 0.7,
  },
  valorAtualTexto: {
    fontSize: 25,
  },
  botaoLimpar: {
    alignItems: "center",
    marginTop: 10,
  },
  textoBotaoLimpar: {
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
