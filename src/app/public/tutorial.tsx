import React, { useState } from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import ItemTutorial from "../components/ItemTutorial";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

export default function Tutorial() {
  const [index, setIndex] = useState(0);

  const textEl1 = (
    <Text style={styles.text}>
      Gerencie as <Text style={styles.word}>rotinas</Text> {"\n"} do seu idoso
    </Text>
  );

  const textEl2 = (
    <Text style={styles.text}>
      Colete os dados da {"\n"} <Text style={styles.word}>saúde</Text> do idoso
    </Text>
  );

  const textEl3 = (
    <Text style={styles.text}>
      Obtenha ajuda no {"\n"} <Text style={styles.word}>portal</Text>
    </Text>
  );

  const skip = () => {
    router.replace("/public/login");
  };

  return (
    <View style={styles.carousel}>
      <Pressable onPress={skip}>
        <Text style={styles.skip}>Pular</Text>
      </Pressable>

      <Swiper
        index={index}
        onIndexChanged={(newIndex) => setIndex(newIndex)}
        dotColor="#D9D9D9"
        activeDotColor="#9E9696"
        showsButtons={false}
        scrollEnabled={false}
        loop={false}
      >
        <ItemTutorial
          imageSrc={require("../../../assets/img_tutor1.png")}
          textEl={textEl1}
        />
        <ItemTutorial
          imageSrc={require("../../../assets/img_tutor2.png")}
          textEl={textEl2}
        />
        <ItemTutorial
          imageSrc={require("../../../assets/img_tutor3.png")}
          textEl={textEl3}
        />
      </Swiper>

      <View style={styles.center}>
        <CustomButton
          title="Avançar"
          callbackFn={() => (index > 1 ? skip() : setIndex(index + 1))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
  },
  word: {
    color: "#B4026D",
  },
  carousel: {
    height: "95%",
  },
  skip: {
    textAlign: "right",
    marginTop: 15,
    marginBottom: 10,
    marginRight: 20,
    fontWeight: "bold",
    color: "gray",
  },
  center: {
    alignItems: "center",
    width: "100%",
  },
});
