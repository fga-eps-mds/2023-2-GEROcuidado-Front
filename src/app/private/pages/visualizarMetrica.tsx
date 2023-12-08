import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import NaoAutenticado from "../../components/NaoAutenticado";
import { View, StyleSheet, Pressable, Text} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IIdoso } from "../../interfaces/idoso.interface";
import { router, useLocalSearchParams } from "expo-router";
import { EMetricas, IMetrica, IMetricaValueFilter, IOrder, IValorMetrica } from "../../interfaces/metricas.interface";
import { getAllMetricaValues, postMetricaValue } from "../../services/metricaValue.service";
import Toast from "react-native-toast-message";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ModalMetrica from "../../components/ModalMetrica";
import CardValorMetrica from "../../components/CardValorMetrica";

export default function VisualizarMetrica() {
  const params = useLocalSearchParams() as unknown as IMetrica;
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [idoso, setIdoso] = useState<IIdoso>();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>("");
  const [valueMetrica,setValueMetrica] = useState<IValorMetrica[]>([]); 
  const [valor,setValor] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const order: IOrder = {
    column: "dataHora",
    dir: "DESC",
  }


  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });

    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  useEffect(() => handleUser(), []);

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
    const filter : IMetricaValueFilter = {idMetrica: params.id}
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

  useEffect(() => getIdoso(), []);
  useEffect(() => handleUser(), []);
  useEffect(() => getMetricasValues(), [idoso]);

  const novoValor = () => {
    setModalVisible(true);
  };

  const salvar = async () => {

    const body = {
      idMetrica: Number(params.id),
      valor : valor,
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
      router.replace({pathname:"private/pages/visualizarMetrica",params:params});
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
  }

  const vizualizarMetrica = (item: IValorMetrica) => {
    //////////////////////////
  }

  const back = () => {
    router.push({
      pathname: "private/tabs/registros",
    });
  };

  return !user?.id ? <NaoAutenticado /> : (
    <View>
    <View>
    <View style={styles.header}>
      <Pressable onPress={() => back()}>
          <Icon name="chevron-left" size={40} color="#fff" />
        </Pressable>
      <Text style = {styles.textheader}>{params.categoria}</Text>
    </View>
      <Pressable style={styles.botaoEditarMetricas} onPress={novoValor}>
        <Icon name="plus" color={"white"} size={20} />
        <Text style={styles.textoBotaoEditarMetricas}>Novo valor</Text>
      </Pressable>
      
      <FlatList
        data={valueMetrica}
        renderItem={({ item }) => (
          <Pressable
            //style={styles.verMetrica}
            onPress={() => vizualizarMetrica(item)}
          >
            <CardValorMetrica item = {{...item, categoria:params.categoria}}/>
          </Pressable>
        )}
      />

      {modalVisible && (
        <ModalMetrica
        visible = {modalVisible}
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
  marginLeft: "auto",
  marginRight: 10,
  marginVertical: 10,
},

textoBotaoEditarMetricas: {
  color: "white",
  fontWeight: "600",
  fontSize: 14,
  marginLeft: 5,
},

textheader:{
  color:"white",
  fontSize:20,
  fontWeight:"bold"
}

});