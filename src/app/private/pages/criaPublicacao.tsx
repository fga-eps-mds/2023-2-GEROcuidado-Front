import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView } from "react-native-gesture-handler";
import { ECategoriaPublicacao } from "../../interfaces/forum.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import { postPublicacao } from "../../services/forum.service";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/CustomButton";
import ErrorMessage from "../../components/ErrorMessage";

interface IErrors {
  titulo?: string;
  descricao?: string;
  categoria?: string;
}

export default function CriaPublicacao() {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [token, setToken] = useState<string>("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<ECategoriaPublicacao | null>(null);
  const [erros, setErros] = useState<IErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const getIdUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setIdUsuario(usuario.id);
    });
    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  const data = [
    { key: ECategoriaPublicacao.GERAL, value: ECategoriaPublicacao.GERAL },
    { key: ECategoriaPublicacao.SAUDE, value: ECategoriaPublicacao.SAUDE },
    {
      key: ECategoriaPublicacao.ALIMENTACAO,
      value: ECategoriaPublicacao.ALIMENTACAO,
    },
    {
      key: ECategoriaPublicacao.EXERCICIOS,
      value: ECategoriaPublicacao.EXERCICIOS,
    },
  ];

  const publicar = async () => {
    if (Object.keys(erros).length > 0) {
      setShowErrors(true);
      return;
    }

    const body = {
      idUsuario: idUsuario as number,
      titulo,
      descricao,
      dataHora: new Date(),
      categoria: categoria as ECategoriaPublicacao,
      contagemReportes: 0,
    };

    try {
      setLoading(true);
      const response = await postPublicacao(body, token);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      router.push("/private/tabs/forum");
    } catch (err) {
      const error = err as { message: string };
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => handleErrors(), [titulo, descricao, categoria]);
  useEffect(() => getIdUsuario());

  const handleErrors = () => {
    const erros: IErrors = {};

    if (!titulo) {
      erros.titulo = "Campo obrigatório!";
    } else if (titulo.length > 100) {
      erros.titulo = "Deve ter no máximo 100 caracteres!";
    }

    if (!descricao) {
      erros.descricao = "Campo Obrigatório!";
    } else if (descricao.length > 500) {
      erros.descricao = "Deve ter no máximo 500 caracteres!";
    }

    if (!categoria) {
      erros.categoria = "Campo Obrigatório!";
    }

    setErros(erros);
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Link href="private/tabs/forum">
          <Icon name="chevron-left" size={40} color="#fff" />
        </Link>

        <View>
          <Text style={styles.tituloheader}>Nova publicação</Text>
        </View>
      </View>

      <View style={styles.publicacao}>
        <View style={styles.formControl}>
          <Text style={styles.inputLabel}>Título</Text>
          <TextInput
            onChangeText={setTitulo}
            value={titulo}
            placeholder="Título"
            style={styles.input}
          />
          <ErrorMessage show={showErrors} text={erros.titulo} />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.inputLabel}>Descrição</Text>
          <TextInput
            onChangeText={setDescricao}
            value={descricao}
            multiline={true}
            placeholder="Descrição"
            numberOfLines={12}
            style={styles.input}
          />
          <ErrorMessage show={showErrors} text={erros.descricao} />
        </View>

        <View style={styles.formControl}>
          <View style={styles.selectInput}>
            <SelectList
              data={data}
              setSelected={setCategoria}
              placeholder="Categoria"
              search={false}
            />
          </View>
          <ErrorMessage show={showErrors} text={erros.categoria} />
        </View>

        <View style={styles.botaoPublicar}>
          <CustomButton
            title="Publicar"
            callbackFn={publicar}
            showLoading={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2CCDB5",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  tituloheader: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    padding: 20,
  },
  publicacao: {
    borderRadius: 24,
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  formControl: {
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 10,
    fontWeight: "700",
  },
  input: {
    borderWidth: 0,
    padding: 12,
    backgroundColor: "#F1F1F1",
    borderRadius: 15,
    marginBottom: 5,
  },
  selectInput: {
    marginBottom: 5,
  },
  botaoPublicar: {
    marginTop: 30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
});
