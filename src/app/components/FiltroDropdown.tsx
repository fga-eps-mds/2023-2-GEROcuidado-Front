// FiltroDropdown.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface FiltroDropdownProps {
  filtro: string | null;
  setFiltro: (filtro: string | null) => void;
}

const FiltroDropdown: React.FC<FiltroDropdownProps> = ({ filtro, setFiltro }) => {
  return (
    <DropDownPicker
      items={[
        { label: "Alimentação", value: "alimentacao" },
        { label: "Atividade Física", value: "atividadeFisica" },
        { label: "Medicamento", value: "medicamento" },
      ]}
      defaultValue={filtro}
      containerStyle={styles.container}
      style={styles.dropdown}
      itemStyle={{
        justifyContent: "flex-start",
      }}
      labelStyle={styles.label}
      dropDownMaxHeight={100}
      dropDownStyle={styles.dropDown}
      placeholder="Filtro"
      placeholderStyle={styles.placeholder}
      onChangeItem={(item: { label: string; value: string }) => {
        console.log("Item selecionado:", item);
        setFiltro(item.value);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 150,
    borderColor: "#B4026D",
    marginTop: 10,
    marginLeft:10,
  },
  dropdown: {
    backgroundColor: "#2CCDB5",
  },
  label: {
    color: "white",
    fontFamily: "Inter-SemiBold",  
    fontSize: 16,
    fontWeight: "600",  
    textAlign: "center",  
  },
  dropDown: {
    backgroundColor: "#2CCDB5",
    marginTop: 2,  
    borderColor: "white",  
    borderWidth: 10,
  },
  placeholder: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default FiltroDropdown;
