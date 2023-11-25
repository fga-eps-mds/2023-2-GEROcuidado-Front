import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { EDiasSemana } from "../interfaces/rotina.interface";

interface IProps {
  dias?: number[];
  callbackFn: (days: number[]) => unknown;
}

export default function WeekDays({ dias, callbackFn }: IProps) {
  const [days, setDays] = useState<number[]>(dias || []);
  const rawDays = Object.values(EDiasSemana);

  const daysValues = rawDays.slice(rawDays.length / 2) as EDiasSemana[];
  const daysName = rawDays.slice(0, rawDays.length / 2) as string[];

  const handlePress = (dia: number) => {
    if (days.includes(dia)) {
      const novoArray = days.filter((elemento) => elemento !== dia);
      setDays(novoArray);
      callbackFn(novoArray);
    } else {
      setDays([...days, dia]);
      callbackFn([...days, dia]);
    }
  };

  return (
    <View style={styles.weekDays}>
      {daysValues.map((day, index) => (
        <Pressable
          key={day}
          onPress={() => handlePress(day)}
          style={[styles.circle, days?.includes(day) && styles.active]}
        >
          <Text
            style={[styles.textDay, days?.includes(day) && styles.activeText]}
          >
            {daysName[index].charAt(0)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  textDay: {
    fontSize: 22,
    color: "black",
  },

  weekDays: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 30,
  },

  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "white",
  },
  active: {
    backgroundColor: "#2CCDB5",
    borderColor: "#2CCDB5",
  },
  activeText: {
    color: "white",
  },
});
