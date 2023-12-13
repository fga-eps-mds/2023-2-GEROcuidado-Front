import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import Publicacao from "../../components/Publicacao";
import { getAllPublicacao } from "../../services/forum.service";
import Toast from "react-native-toast-message";
import { ECategoriaPesquisa, ECategoriaPublicacao, IOrder, IPublicacao } from "../../interfaces/forum.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import BarraPesquisa from "../../components/BarraPesquisa";
import { ScrollView } from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";

export default function Forum() {
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>([]);
  const [showCarregarMais, setShowCarregarMais] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingCarregarMais, setLoadingCarregarMais] = useState(true);
  const [usuario, setUsuario] = useState<IUser | null>(null);
  const [offset, setOffset] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isReported, setIsReported] = useState(false);
  const [categoria, setCategoria] = useState<ECategoriaPesquisa>(ECategoriaPesquisa.TODAS);
  const order: IOrder = {
    column: "dataHora",
    dir: "DESC",
  };

  const data = [
    {key: ECategoriaPesquisa.TODAS, value: ECategoriaPesquisa.TODAS},
    {key: ECategoriaPesquisa.ALIMENTACAO, value: ECategoriaPesquisa.ALIMENTACAO},
    {key: ECategoriaPesquisa.SAUDE, value: ECategoriaPesquisa.SAUDE},
    {key: ECategoriaPesquisa.EXERCICIOS, value: ECategoriaPesquisa.EXERCICIOS},
    {key: ECategoriaPesquisa.GERAL, value: ECategoriaPesquisa.GERAL},

  ]

  const novaPublicacao = () => {
    router.push("private/pages/criaPublicacao");
  };

  const getUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setUsuario(usuario);
    });
  };

  const getPublicacoes = (
    anterior: IPublicacao[],
    titulo: string,
    isReported: boolean,
    offset: number,
  ) => {
    setOffset(offset);
    setTitulo(titulo);

    if (categoria === ECategoriaPesquisa.TODAS) {
      getAllPublicacao(offset, { titulo, isReported }, order)
        .then((response) => {
          const newPublicacoes = response.data as IPublicacao[];
  
          if (newPublicacoes.length === 0) {
            setShowCarregarMais(false);
          }
  
          setPublicacoes([...anterior, ...newPublicacoes]);
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
          setLoadingCarregarMais(false);
        });
      
    } else {
      getAllPublicacao(offset, { titulo, isReported, categoria }, order)
        .then((response) => {
          const newPublicacoes = response.data as IPublicacao[];
  
          if (newPublicacoes.length === 0) {
            setShowCarregarMais(false);
          }
  
          setPublicacoes([...anterior, ...newPublicacoes]);
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
          setLoadingCarregarMais(false);
        });
    }

  };

  const handleCarregarMais = () => {
    setLoadingCarregarMais(true);
    getPublicacoes(publicacoes, titulo, isReported, offset + 1);
  };

  const handlePesquisar = (newTitulo: string) => {
    setShowCarregarMais(true);
    setLoading(true);
    getPublicacoes([], newTitulo, isReported, 0);
  };

  const handleReports = (newValue: boolean) => {
    setShowCarregarMais(true);
    setLoading(true);
    getPublicacoes([], titulo, newValue, 0);
  };

  const debounceReports = (newTitulo: boolean) => {
    setIsReported(newTitulo);
    if (timer) clearTimeout(timer);
    const temp = setTimeout(() => handleReports(newTitulo), 1000);
    setTimer(temp);
  };

  const debouncePesquisar = (newTitulo: string) => {
    if (timer) clearTimeout(timer);
    const temp = setTimeout(() => handlePesquisar(newTitulo), 1000);
    setTimer(temp);
  };

  useEffect(() => getUsuario(), []);
  useEffect(() => getPublicacoes([], "", false, 0), [categoria]);

  return (
    <View style={styles.scrollView}>
      <View style={styles.cabecalho}>
        <Text style={styles.textoPublicacoes}>Publicações</Text>
        <BarraPesquisa callbackFn={debouncePesquisar} />
      </View>

      
      <View style={styles.botoes}>
        {!usuario?.admin && (
         <View style={styles.list}>
          <SelectList
            data={data}
            setSelected={(item: ECategoriaPesquisa) => {
              setCategoria(item);
            }}
            search={false}
            boxStyles={styles.boxDropDown}
            inputStyles={styles.boxInputDropDown}
            dropdownStyles={styles.dropDown}
            defaultOption={{key: ECategoriaPesquisa.TODAS, value: ECategoriaPesquisa.TODAS}}
            placeholder="Todas"
          />
      </View>

        )}

      
        {usuario?.id && usuario?.admin && (
          <View style={styles.reportadas}>
            <Switch
              trackColor={{ false: "#767577", true: "#2CCDB5" }}
              onValueChange={debounceReports}
              value={isReported}
            />
            <Text style={styles.reportadasText}>Publicações reportadas</Text>
          </View>
        )}

        {usuario?.id && (
          <Pressable
            style={styles.botaoCriarPublicacao}
            onPress={novaPublicacao}
          >
            <Icon name="plus" color={"white"} size={20}></Icon>
            <Text style={styles.textoBotaoPesquisar}>Nova publicação</Text>
          </Pressable>
        )}
      </View>
      {usuario?.admin && (
         <View style={styles.list}>
        <SelectList
          data={data}
          setSelected={(item: ECategoriaPesquisa) => {
            setCategoria(item);
          }}
          search={false}
          boxStyles={styles.boxDropDown}
          inputStyles={styles.boxInputDropDown}
          dropdownStyles={styles.dropDown}
          defaultOption={data[4]}
          placeholder="Todas"
        />
      </View>

        )}

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2CCDB5" />
        </View>
      )}

      {!loading && (
        <ScrollView>
          {publicacoes.map((publicacao) => (
            <View key={publicacao.id}>
              <Publicacao crop={true} item={publicacao} />
            </View>
          ))}

          {publicacoes.length > 0 &&
            publicacoes.length % 10 === 0 &&
            showCarregarMais && (
              <Pressable
                style={styles.botaoCarregarMais}
                onPress={handleCarregarMais}
              >
                {loadingCarregarMais && (
                  <ActivityIndicator size="small" color="#2CCDB5" />
                )}

                {!loadingCarregarMais && (
                  <Text style={styles.botaoCarregarMaisText}>
                    Carregar mais
                  </Text>
                )}
              </Pressable>
            )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  reportadas: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
    marginLeft: 10,
    fontWeight: "700",
  },
  reportadasText: {
    fontWeight: "400",
    marginLeft: 7,
    fontSize: 12,
  },
  loading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 50,
  },
  scrollView: {
    backgroundColor: "#fff",
    height: "100%",
  },
  cabecalho: {
    flexDirection: "column",
    backgroundColor: "#2CCDB5",
    padding: 10,
  },
  iconeVoltar: {
    color: "white",
    alignSelf: "flex-start",
  },
  botaoPesquisar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    borderRadius: 14,
  },
  textoBotaoPesquisar: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 5,
  },
  textoPublicacoes: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  botaoCriarPublicacao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B4026D",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: 10,
    marginVertical: 10,
    position: "absolute",
    right: 0,
    height:45
  },
  botaoCarregarMais: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginHorizontal: "auto",
    marginVertical: 25,
    height: 40,
  },
  botaoPublicacaoReportada: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2CCDB5",
    padding: 5,
    borderRadius: 14,
  },
  reportada: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
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
  },
  botaoCarregarMaisText: {
    color: "#2CCDB5",
    fontWeight: "600",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  botoes: {
    flexDirection: "row",
  },
  boxDropDownDefault: {
    borderWidth: 0,
    backgroundColor: "#2CCDB5",
  },
  boxDropDown: {
    borderWidth: 0,
    width: 149,
    backgroundColor: "#2CCDB5",
    shadowRadius: 1,
    shadowColor: "#3d3d3d",
    marginLeft: 5,
  },
  boxInputDropDown: {
    color: "#FFFFFF",
    fontSize: 16,
    paddingRight: 6,
  },
  dropDown: {
    borderColor: "#2CCDB5",
    width: 150,
    marginTop: 3,
    marginLeft: 5,
  },
  list: {
    marginTop:10,
    marginBottom: 20,
  },
});
