import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import CardIdoso from "../../components/CardIdoso";
import { router } from "expo-router";
import { IIdoso, IOrder } from "../../interfaces/idoso.interface";
import { getAllIdoso } from "../../services/idoso.service";
import Toast from "react-native-toast-message";
import ModalConfirmation from "../../components/ModalConfirmation";

export default function ListarIdosos() {
  const [idosos, setIdosos] = useState<IIdoso[]>([]);
  const [nome, setNome] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selecionado, setSelecionado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const order: IOrder = {
    column: "nome",
    dir: "DESC",
  };

  const getIdosos = (
    anterior: IIdoso[],
    nome: string,
    offset: number,
  ) => {
    setOffset(offset);
    setNome(nome);

    getAllIdoso(offset, { nome }, order)
      .then((response) => {
        const newIdosos = response.data as IIdoso[];

        /* if (newIdosos.length === 0) {
          setShowCarregarMais(false);
        } */

        setIdosos([...anterior, ...newIdosos]);
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

  const selecionar = () => {
    setSelecionado(!selecionado);
    console.log(selecionado);
  }

  const navigateCadastrar = () => {
    router.push({ pathname: "/private/pages/cadastrarIdoso" })
  }

  const confirmation = () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => getIdosos([], "", 0), []);

  return (
    <View style={styles.screen}>

      <View style={styles.backButton}>
        <BackButton route="/private/tabs/perfil" color="#000" />
      </View>

      <View>
        <Text style={styles.header}>De quem está cuidando agora?</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={confirmation}
          style={[styles.actionButton, styles.editButton]}
        >
          <Text style={styles.actionButtonText}>Filtro</Text>
        </Pressable>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2CCDB5" />
        </View>
      )}

      {!loading && (
        <View style={styles.cardIdoso}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={idosos}
            renderItem={({ item }) => (
              <Pressable
                onPress={selecionar}>
                <CardIdoso
                  item={item} />
              </Pressable>
            )}
          />
        </View>
      )}

      <View style={styles.cadastroContainer}>
        <Pressable style={styles.cadastroContainer} onPress={navigateCadastrar}>
          <AntDesign name="pluscircleo" size={54} />
          <Text style={styles.cadastroText}>Cadastrar um idoso</Text>
        </Pressable>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  backButton: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#3d3d3d",
    marginBottom: 15,
    textAlign: "center",
  },
  cadastroContainer: {
    alignItems: "center",
    maxWidth: "auto",
  },
  cadastroText: {
    marginTop: 8,
    fontWeight: "500",
  },
  cardIdoso: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "65%",
  },
  idosoSelecionado: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 32,
    borderWidth: 3,
    borderColor: "#2CCDB5",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
    width: 110,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  editButton: {
    backgroundColor: "#2CCDB5",
  },
  actionButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
    marginRight: 5,
  },
  actions: {
    alignItems: "center",
    width: "100%",
    padding: 10,
    paddingBottom: 15,
  },
  loading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 50,
  },
  idoso: {

  },
});
