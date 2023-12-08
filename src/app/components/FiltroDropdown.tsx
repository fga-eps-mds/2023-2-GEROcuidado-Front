import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(filtro);
  const [buttonDimensions, setButtonDimensions] = useState({ width: 0, height: 0 });

  const options: IOrderOption[] = [
    { column: "alimentacao", dir: "ASC", value: "Alimentação" },
    { column: "exercicios", dir: "ASC", value: "Exercícios" },
    { column: "medicamentos", dir: "ASC", value: "Medicamentos" },
    { column: "geral", dir: "ASC", value: "Geral" },
  ];

  const buttonRef = useRef<TouchableOpacity>(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = (item: IOrderOption) => {
    setFiltro(item.value);
    setSelectedOption(item.value === selectedOption ? null : item.value);
    setDropdownVisible(false);
  };

  const renderDropdownItem = ({ item }: { item: IOrderOption }) => (
    <TouchableOpacity
      style={[
        styles.option,
        { backgroundColor: selectedOption === item.value ? "#2CCDB5" : "#fff", width: buttonDimensions.width },
      ]}
      onPress={() => selectOption(item)}
    >
      <Text style={[styles.optionText, { color: selectedOption === item.value ? "#fff" : "#333", textAlign: 'left' }]}>
        {item.value}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    setSelectedOption(filtro);
  }, [filtro]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonDimensions({ width, height });
      });
    }
  }, [dropdownVisible]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={buttonRef}
        style={styles.dropdownContainer}
        onPress={toggleDropdown}
      >
        <Text style={styles.label}>{selectedOption ? selectedOption : "Filtro"}</Text>
        <Icon name="chevron-down" size={20} color="#fff" style={styles.chevronIcon} />
      </TouchableOpacity>

      {dropdownVisible && (
        <FlatList
          data={options}
          renderItem={renderDropdownItem}
          keyExtractor={(item) => item.value}
          style={[
            styles.dropdownList,
            { width: buttonDimensions.width, top: buttonDimensions.height, marginLeft: 15 },
          ]}
        />
      )}
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
    backgroundColor: "#2CCDB5",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: 150,
    marginLeft: 15,
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
  dropdownList: {
    position: "absolute",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    elevation: 5,
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
