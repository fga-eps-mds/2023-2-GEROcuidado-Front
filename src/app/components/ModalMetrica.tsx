import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { IMetrica } from "../interfaces/metricas.interface";

interface IProps {
  visible: boolean;
  callbackFn: () => unknown;
  closeModal: () => unknown;
  message: string;
  messageButton: string;
  metrica: IMetrica;
}

export default function ModalMetrica({
  visible,
  callbackFn,
  closeModal,
  metrica,
  message,
}: Readonly<IProps>) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000098",
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