import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SelectList from "react-native-dropdown-select-list"; // Importe o componente SelectList, ou use o componente desejado

interface FiltroDropdownProps {
  filtro: string | null;
  setFiltro: (filtro: string | null) => void;
}

interface IOrderOption {
  column: string;
  dir: string;
  value: string;
}

const FiltroDropdown: React.FC<FiltroDropdownProps> = ({ filtro, setFiltro }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedOption, setSelectedOption] = useState<string | null>(filtro);

  useEffect(() => {
    setSelectedOption(filtro);
  }, [filtro]);

  const options: IOrderOption[] = [
    { column: "alimentacao", dir: "ASC", value: "Alimentação" },
    { column: "exercicios", dir: "ASC", value: "Exercícios" },
    { column: "medicamentos", dir: "ASC", value: "Medicamentos" },
    { column: "geral", dir: "ASC", value: "Geral" },
  ];

  const measureButton = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setModalPosition({ top: pageY + height, left: pageX });
      });
    }
  };

  const buttonRef = useRef<TouchableOpacity>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={buttonRef}
        style={styles.dropdownContainer}
        onPress={() => {
          measureButton();
          setModalVisible(true);
        }}
      >
        <Text style={styles.label}>{selectedOption ? selectedOption : "Filtro"}</Text>
        <Icon name="chevron-down" size={20} color="#fff" style={styles.chevronIcon} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { top: modalPosition.top, left: modalPosition.left }]}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  { backgroundColor: selectedOption === item.value ? "#2CCDB5" : "#fff" },
                ]}
                onPress={() => {
                  setFiltro(item.value);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: selectedOption === item.value ? "#fff" : "#333" },
                  ]}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.value}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 150,
    backgroundColor: "#2CCDB5",
    borderWidth: 1,
    borderColor: "#2CCDB5",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "capitalize",
  },
  chevronIcon: {
    marginLeft: 5,
    color: "black",
  },
  modalContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    elevation: 5,
    maxHeight: 180,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default FiltroDropdown;
