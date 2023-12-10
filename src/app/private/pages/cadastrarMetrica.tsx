import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { IUser } from "../../interfaces/user.interface";
import { IIdoso } from "../../interfaces/idoso.interface";
import { router } from "expo-router";
import { getAllMetrica, postMetrica } from "../../services/metrica.service";
import {
  EMetricas,
  IMetrica,
  IMetricaFilter,
} from "../../interfaces/metricas.interface";
import Toast from "react-native-toast-message";

export default function criarMetrica() {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [idoso, setIdoso] = useState<IIdoso>();
  const [token, setToken] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [metricas, setMetricas] = useState<IMetrica[]>([]);
  const [metricaSelecionada, setMetricaSelecionada] = useState<IMetrica | null>(
    null,
  );

  const getToken = () => {
    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
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

  const handleMetricSelection = async (metricType: EMetricas) => {
    const body = {
      idIdoso: Number(idoso?.id),
      categoria: metricType,
    };

    try {
      setShowLoading(true);
      const response = await postMetrica(body, token);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });

      router.replace({
        pathname: "private/tabs/registros",
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

  const back = () => {
    router.push({
      pathname: "private/tabs/registros",
    });
  };

  const renderMetricCard = (
    metricType: EMetricas,
    iconName: string,
    description: string,
    iconColor: string,
  ) => (
    <Pressable
      key={metricType}
      style={styles.metricCard}
      onPress={() => handleMetricSelection(metricType)}
      testID={`${metricType}-card`}
    >
      <View style={styles.metricCardContent}>
        {iconName === "oxygen" && <Text style={styles.oxygenSymbol}>O2</Text>}
        {iconName !== "oxygen" && (
          <Icon
            name={iconName}
            color={iconColor}
            size={30}
            style={styles.metricCardIcon}
          />
        )}
        <View style={styles.metricsName}>
          <Text style={styles.metricCardText}>{description}</Text>
          <Text style={styles.cadastrarPlaceholder}>
            Cadastrar {description}
          </Text>
        </View>
        <Icon name="chevron-right" color={"#888"} />
      </View>
    </Pressable>
  );

  useEffect(() => getToken(), []);
  useEffect(() => handleUser(), []);
  useEffect(() => getIdoso(), []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.botaoCriarMetricas} onPress={() => back()}>
          <Icon
            name="chevron-left"
            color={"black"}
            size={20}
            style={styles.chevronLeft}
          />
        </Pressable>
        <View style={styles.photoAndName}>
          {user?.id && idoso?.id && (
            <View style={styles.photoAndName}>
              {getFoto(idoso?.foto)}
              <Text style={styles.nomeUsuario}>
                <Text style={styles.negrito}>{idoso?.nome}</Text>
              </Text>
            </View>
          )}
        </View>
        <View style={styles.none}></View>
      </View>
      <Text style={styles.textoAbaixoDoBotao}>
        <Text style={styles.text}>Selecione a métrica a ser cadastrada</Text>
      </Text>

      <View style={styles.metricCardsContainer}>
        {renderMetricCard(
          EMetricas.FREQ_CARDIACA,
          "heartbeat",
          "Frequência Cardíaca",
          "#FF7D7D",
        )}
        {renderMetricCard(
          EMetricas.PRESSAO_SANGUINEA,
          "tint",
          "Pressão Sanguínea",
          "#FF7D7D",
        )}
        {renderMetricCard(
          EMetricas.SATURACAO_OXIGENIO,
          "oxygen",
          "Saturação do Oxigênio",
          "87F4E4",
        )}
        {renderMetricCard(
          EMetricas.TEMPERATURA,
          "thermometer",
          "Temperatura",
          "FFAC7D",
        )}
        {renderMetricCard(EMetricas.GLICEMIA, "cubes", "Glicemia", "#3F3F3F")}

        {renderMetricCard(
          //Apenas para o caso de serem necessários nesta tela (se não forem, podem excluir)
          EMetricas.ALTURA,
          "user",
          "Altura (m)",
          "#3F3F3F",
        )}

        {renderMetricCard(
          //Apenas para o caso de serem necessários nesta tela (se não forem, podem excluir)
          EMetricas.PESO,
          "balance-scale",
          "Peso (kg)",
          "#000000",
        )}

        {renderMetricCard(
          EMetricas.HORAS_DORMIDAS,
          "bed",
          "Horas Dormidas",
          "#3F3F3F",
        )}
      </View>

      {/* Adicione aqui o restante do conteúdo do componente criarMetrica */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    backgroundColor: "#2CCDB5",
  },
  photoAndName: {
    padding: 10,
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
  },
  none: { width: 30 }, // necessário para alinhar a foto, NÃO REMOVA
  fotoPerfil: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 100,
  },
  semFoto: { position: "relative", backgroundColor: "#EFEFF0" },
  semFotoIcon: {
    opacity: 0.4,
    margin: "auto",
    alignSelf: "center",
  },
  nomeUsuario: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 10,
    maxWidth: "100%",
  },
  container: {
    flexGrow: 1,
  },
  botaoCriarMetricas: {},
  chevronLeft: {
    marginLeft: 15,
    width: 15,
  },
  textoBotaoCriarMetricas: {
    color: "#3F3F3F",
    fontSize: 17,
    marginLeft: 15,
  },
  textoAbaixoDoBotao: {
    marginTop: 30,
    textAlign: "center",
    color: "#3F3F3F",
    fontSize: 20,
  },
  metricCardsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  metricCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  metricCardIcon: {
    marginRight: 10,
  },
  metricCardText: {
    color: "#3F3F3F",
    fontSize: 16,
  },
  metricsName: {
    flexDirection: "column",
    alignItems: "center",
  },
  imagem: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  metricCardContent: {
    flex: 1,
    flexDirection: "row",
    //alignItems: "center",
    justifyContent: "space-between",
  },
  cadastrarPlaceholder: {
    color: "#A9A9A9",
    fontSize: 12,
    marginTop: 5,
  },
  oxygenSymbol: {
    fontSize: 30,
    color: "#3F3F3F",
    marginRight: 10,
  },
  negrito: {
    fontWeight: "bold",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
