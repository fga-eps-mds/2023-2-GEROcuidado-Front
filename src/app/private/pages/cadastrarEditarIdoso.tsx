import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Text,
} from "react-native";
import Toast from "react-native-toast-message";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { postUser } from "../../services/user.service";
import BackButton from "../../components/BackButton";
import UploadImage from "../../components/UploadImage";
import ErrorMessage from "../../components/ErrorMessage";
import CustomButton from "../../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalConfirmation from "../../components/ModalConfirmation";
import { SelectList } from "react-native-dropdown-select-list";
import { ETipoSanguineo, IIdoso } from "../../interfaces/idoso.interface";
import { postIdoso, updateIdoso } from "../../services/idoso.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user.interface";
import MaskInput, { Masks } from 'react-native-mask-input';

interface IErrors {
  nome?: string;
  dataNascimento?: string;
  tipoSanguineo?: string;
  telefoneResponsavel?: string;
  descricao?: string;
}

export default function CadastrarEditarIdoso() {
  const item = useLocalSearchParams() as unknown as IIdoso | undefined;

  const [foto, setFoto] = useState<string | null | undefined>("");
  const [token, setToken] = useState<string>("");
  const [nome, setNome] = useState("");
  const [tipoSanguineo, setTipoSanguineo] = useState<ETipoSanguineo | null | undefined>(null);
  const [telefoneResponsavel, setTelefoneResponsavel] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [descricao, setDescricao] = useState<string | undefined>("");
  const [erros, setErros] = useState<IErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showLoadingApagar, setShowLoadingApagar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [maskedTelefoneResponsavel, setMaskedTelefoneResponsavel] = useState("");
  const [id, setId] = useState<number | undefined>(undefined);

  const getIdUsuario = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string) as IUser;
      setIdUsuario(usuario.id);
    });
    AsyncStorage.getItem("token").then((response) => {
      setToken(response as string);
    });
  };

  const hasFoto = (foto: string | null | undefined) => {
    if (!foto) return false;

    const raw = foto.split("data:image/png;base64,")[1];
    return raw.length > 0;
  };

  const handleEdit = (item?: IIdoso) => {
    if(!item){
      return
    }

    //setDataNascimento(item.dataNascimento);
    if(hasFoto(item.foto)) {
      setFoto(item.foto);
    }

    setNome(item.nome);
    setTelefoneResponsavel(item.telefoneResponsavel);
    setMaskedTelefoneResponsavel(item.telefoneResponsavel);
    setIdUsuario(item.idUsuario);
    setDescricao(item.descricao);
    setId(item.id);
    setTipoSanguineo(item.tipoSanguineo);
    
  }

  const salvar = async () => {
    if (Object.keys(erros).length > 0) {
      setShowErrors(true);
      return;
    }

    const body = { idUsuario: idUsuario as number, nome, dataNascimento: new Date(dataNascimento), telefoneResponsavel, foto, tipoSanguineo, descricao };

    if (body.foto && isBase64Image(body.foto)) {
      delete body.foto;
    }

    try {
      setShowLoading(true);
      const response = await (id ? updateIdoso(id, body, token) : postIdoso(body, token));
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: response.message as string,
      });
      router.back();
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

  const apagarIdoso = async () => {

    //TODO função de apagar idoso
  };

  const confirmation = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(
    () => handleErrors(),
    [nome, telefoneResponsavel, dataNascimento],
  );
  useEffect(() => getIdUsuario(), []);

  const handleErrors = () => {
    const erros: IErrors = {};

    if (!nome) {
      erros.nome = "Campo obrigatório!";
    } else if (nome.length < 5) {
      erros.nome = "O nome completo deve ter pelo menos 5 caractéres.";
    } else if (nome.length > 60) {
      erros.nome = "O nome completo deve ter no máximo 60 caractéres.";
    }

    if (!dataNascimento) {
      erros.dataNascimento = "Campo obrigatório";
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
      erros.dataNascimento = "Data deve ser no formato dd/mm/yyyy!"
    }

    if (!telefoneResponsavel) {
      erros.telefoneResponsavel = "Campo obrigatório!";
    } else if (telefoneResponsavel.length !== 11) {
      erros.telefoneResponsavel = "Deve estar no formato (XX)XXXXX-XXXX";
      //TODO arrumar regex
    }

    setErros(erros);
  };

  const data = [
    { key: null, value: "Nenhum" },
    { key: ETipoSanguineo.A_POSITIVO, value: ETipoSanguineo.A_POSITIVO },
    { key: ETipoSanguineo.A_NEGATIVO, value: ETipoSanguineo.A_NEGATIVO },
    { key: ETipoSanguineo.B_POSITIVO, value: ETipoSanguineo.B_POSITIVO },
    { key: ETipoSanguineo.B_NEGATIVO, value: ETipoSanguineo.B_NEGATIVO },
    { key: ETipoSanguineo.AB_POSITIVO, value: ETipoSanguineo.AB_POSITIVO },
    { key: ETipoSanguineo.AB_NEGATIVO, value: ETipoSanguineo.AB_NEGATIVO },
    { key: ETipoSanguineo.O_POSITIVO, value: ETipoSanguineo.O_POSITIVO },
    { key: ETipoSanguineo.O_NEGATIVO, value: ETipoSanguineo.O_NEGATIVO },
  ];


  return (
    <View>
      <BackButton route="/private/tabs/perfil" color="#000" />

      <ScrollView>
      {foto && <UploadImage setFoto={setFoto} uri={foto} />}
      {!foto && <UploadImage setFoto={setFoto} />}

        <View style={styles.formControl}>
          <View style={styles.field}>
            <Icon style={styles.iconInput} name="account-outline" size={20} />
            <TextInput
              onChangeText={setNome}
              value={nome}
              placeholder="Nome"
              style={styles.textInput}
            />
          </View>
          <ErrorMessage show={showErrors} text={erros.nome} />
        </View>

        <View style={styles.formControl}>
          <View style={styles.field}>
            <Icon
              style={styles.iconInput}
              name="cake-variant-outline"
              size={20}
            />
            <MaskInput
              style={styles.textInput}
              value={dataNascimento}
              onChangeText={setDataNascimento}
              mask={Masks.DATE_DDMMYYYY}
              placeholder="Data de Nascimento"
            />
          </View>
          <ErrorMessage show={showErrors} text={erros.dataNascimento} />
        </View>

        <View style={styles.formControl}>
          <View style={styles.field}>
            <AntDesign style={styles.iconInput} name="phone" size={20} />
            <MaskInput
              style={styles.textInput}
              value={maskedTelefoneResponsavel}
              onChangeText={(masked, unmasked) => {
                setTelefoneResponsavel(unmasked);
                setMaskedTelefoneResponsavel(masked);
              }}
              mask={Masks.BRL_PHONE}
              placeholder="Telefone Responsável"
            />
          </View>
          <ErrorMessage show={showErrors} text={erros.telefoneResponsavel} />
        </View>

        <View style={styles.formControl}>
          <View style={styles.field}>
            <Fontisto style={styles.iconInput} name="left-align" size={15} />
            <TextInput
              onChangeText={setDescricao}
              value={descricao}
              placeholder="Descrição"
              style={styles.textInput}
            />
          </View>
        </View>

        <View style={styles.formControl2}>
          <View style={styles.field}>
            <Fontisto style={styles.iconInput2} name="blood-drop" size={20} />
            <View style={styles.formControl2}>
              <SelectList
                boxStyles={styles.dropdown}
                inputStyles={styles.textInput}
                data={data}
                setSelected={setTipoSanguineo}
                placeholder="Tipo Sanguíneo"
                search={false}
              />
            </View>
          </View>
          <ErrorMessage show={showErrors} text={erros.tipoSanguineo} />
        </View>

        <View style={styles.linkButton}>
          <CustomButton
            title="Salvar"
            callbackFn={salvar}
            showLoading={showLoading}
          />
        </View>

        <Pressable onPress={confirmation}>
          {showLoadingApagar ? (
            <ActivityIndicator size="small" color="#FF7F7F" />
          ) : (
            <Text style={styles.apagar}>Apagar Idoso</Text>
          )}
        </Pressable>

        <ModalConfirmation
          visible={modalVisible}
          callbackFn={apagarIdoso}
          closeModal={closeModal}
          message="Apagar publicação?"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  voltar: {
    marginTop: 5,
  },
  formControl: {
    flexDirection: "column",
    width: 320,
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: 10,
  },
  formControl2: {
    flexDirection: "row",
    width: 320,
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: 10,
  },
  button: {
    width: "80%",
    maxWidth: 350,
    paddingVertical: 16,
    paddingHorizontal: 26,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#2CCDB5",
    textAlign: "center",
  },
  field: {
    flexDirection: "row",
    width: 320,
    borderBottomWidth: 1,
    borderBottomColor: "#AFB1B6",
    paddingBottom: 5,
    alignSelf: "center",
    marginBottom: 5,
  },
  fieldBlood: {
    flexDirection: "row",
    width: 320,
    borderBottomWidth: 1,
    borderBottomColor: "#AFB1B6",
    paddingBottom: 5,
    alignSelf: "center",
    marginBottom: 5,
  },
  iconInput: {
    width: "10%",
    alignSelf: "center",
    marginLeft: 10,
  },
  iconInput2: {
    width: "10%",
    marginTop: "7%",
    marginLeft: 10,
  },
  bloodInput: {
    paddingLeft: 10,
    color: "#05375a",
    width: "80%",
    fontSize: 17,
  },
  bloodIcon: {
    width: "10%",
  },
  textInput: {
    width: "90%",
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 17,
  },
  arrow: {
    alignSelf: "flex-start",
  },
  linkButton: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: "center",
  },
  apagar: {
    color: "#FF7F7F",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  dropdown: {
    width: 300,
    borderWidth: 0,
    paddingLeft: 10,
    color: "#05375A",
    fontSize: 17,
  }
});
function isBase64Image(foto: string) {
  throw new Error("Function not implemented.");
}

