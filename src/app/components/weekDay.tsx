import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Pressable } from "react-native";

interface IProps {
  dias?: number[];
  callbackFn: (days: number[]) => unknown;
}

export default function WeekDays({ dias, callbackFn }: IProps) {
  const [days,setDays] = useState<number[]>(dias as number[]); 
  
  const handlePress = (dia: number) => {
    // dias.split(",").map((item) => Number(item));
    if(days.includes(dia)){
      const novoArray = days.filter((elemento) => elemento !== dia);
      setDays(novoArray);
      callbackFn(novoArray);
    }
    else{
      setDays([...days,dia]);
      callbackFn([...days, dia]);
    }
  };
  
  return (
    <View style = {styles.weekDays}>
      <Pressable
        onPress={() => handlePress(0)}
        style={[
          styles.circle,
          { backgroundColor: days.includes(0) ? "#2CCDB5" : "White" },
        ]}
      >
        <Text style={[styles.textDay, { color: days.includes(0) ? "white" : "black" }]}>
          D
        </Text>
      </Pressable>

      <Pressable
        onPress={() => handlePress(1)}
        style={[
          styles.circle,
          { backgroundColor: days.includes(1) ? "#2CCDB5" : "White" },
        ]}
      >
        <Text style={[styles.textDay, { color: days.includes(1) ? "white" : "black" }]}>
          S
        </Text>
      </Pressable>

      <Pressable
       onPress={() => handlePress(2)}
        style={[
          styles.circle,
          { backgroundColor: days.includes(2) ? "#2CCDB5" : "White" },
        ]}
      >
        <Text style={[styles.textDay, { color: days.includes(2) ? "white" : "black" }]}>
          T
        </Text>
      </Pressable>

      <Pressable
        onPress={() => handlePress(3)}
        style={[
          styles.circle,
          { backgroundColor: days.includes(3) ? "#2CCDB5" : "White" },
        ]}
      >
        <Text style={[styles.textDay, { color: days.includes(3) ? "white" : "black" }]}>
          Q
        </Text>
      </Pressable>

      <Pressable
        onPress={() => handlePress(4)}
        style={[
          styles.circle,
          { backgroundColor: days.includes(4) ? "#2CCDB5" : "White" },
        ]}
      >
        <Text style={[styles.textDay, { color: days.includes(4) ? "white" : "black" }]}>
         Q
        </Text>
      </Pressable>

      <Pressable
        onPress={() => handlePress(5)}
        style={[
          styles.circle,
          { backgroundColor: days.includes(5) ? "#2CCDB5" : "White" },
        ]}
      >
        <Text style={[styles.textDay, { color: days.includes(5) ? "white" : "black" }]}>
         S
        </Text>
      </Pressable>

      <Pressable
        onPress={() => handlePress(6)}
        style={[
          styles.circle,
          { backgroundColor: days.includes(6) ? "#2CCDB5" : "White" },
        ]}
      >
        <Text style={[styles.textDay, { color: days.includes(6) ? "white" : "black" }]}>
          S
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textDay: {
    fontSize: 22,
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
  },

  
});
