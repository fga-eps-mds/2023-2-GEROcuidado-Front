import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

interface IProps {
  day: string;
}
export default function WeekDays({ day }: IProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.circle,
        { backgroundColor: isPressed ? "#2CCDB5" : "White" },
      ]}
    >
      <Text style={[styles.textDay, { color: isPressed ? "white" : "black" }]}>
        {day}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textDay: {
    fontSize: 22,
  },

  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    // backgroundColor: "blue", // Cor de fundo do círculo
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});
