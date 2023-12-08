import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { EMetricas, IMetrica, IValorMetrica } from "../interfaces/metricas.interface";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
interface IProps {
  visible: boolean;
  callbackFn: () => unknown;
  callbackValor: (valor: string) => unknown
  closeModal: () => unknown;
  message: string;
  metrica: IMetrica;
}

export default function ModalMetrica({
  visible,
  callbackFn,
  callbackValor,
  closeModal,
  metrica,
  message,
}: Readonly<IProps>) {
  const [valor, setValor] = useState<string>("");
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
            <View style = {styles.input}>

              {metrica.categoria == EMetricas.FREQ_CARDIACA && (
                <FontAwesome name="heartbeat" color={"#FF7D7D"} size={60}/>
              )}
              {metrica.categoria === EMetricas.HORAS_DORMIDAS && (
                <FontAwesome name="bed" color={"#3F3F3F"} size={60} />
              )}
              {metrica.categoria == EMetricas.GLICEMIA && (
                <FontAwesome name="cubes" color={"#3F3F3F"} size={60}/>
              )}
              {metrica.categoria == EMetricas.TEMPERATURA && (
                <FontAwesome name="thermometer" color={"#FFAC7D"} size={60}/>
              )}
              {metrica.categoria == EMetricas.PRESSAO_SANGUINEA && (
                <FontAwesome name="tint" color={"#FF7D7D"} size={60}/>
              )}
              {metrica.categoria == EMetricas.PESO && (
                <Icon name="scale-bathroom" color={"#B4026D"} size={60}/>
              )}
              {metrica.categoria == EMetricas.SATURACAO_OXIGENIO && (
                <View><Text style = {{fontSize: 60}}>O<Text style={{fontSize:30}}>2</Text></Text></View>
              )}
              
              <TextInput
                value={valor}
                onChangeText={(valor) => 
                {
                  setValor(valor);
                  callbackValor(valor);
                }
                }
                style = {styles.textInput}
                placeholderTextColor={"#3D3D3D"}
              />

            </View>
          <View style={styles.buttonContainer}>

            <Pressable
              testID="cancelarBtn"
              style={[styles.button, styles.buttonCancel]}
              onPress={() => closeModal()}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
            <Pressable
              testID="callbackBtn"
              style={[styles.button, styles.buttonClose]}
              onPress={() => callbackFn()}
            >
              <Text style={styles.textStyle}>{"Salvar"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000098",
  },

  input:{
    flexDirection:"row",
    marginBottom: 30,
  },

  textInput:{
    fontSize: 40,
    width:100,
    marginLeft:15,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FF7F7F",
    marginHorizontal: 15,
  },
  buttonCancel: {
    backgroundColor: "#2CCDB5",
    marginHorizontal: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 35,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    
  },
});