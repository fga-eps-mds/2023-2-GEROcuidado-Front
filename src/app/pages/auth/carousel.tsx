import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import Tutorial from "./tutorial";
import { CustomButton } from "../../../components/CustomButton";
import { router } from "expo-router";

export default function Carousel() {
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

  const navigateHome = () => {
    router.replace("/");
  };

  return (
    <View style={styles.carousel}>
      <TouchableOpacity onPress={navigateHome}>
        <Text style={styles.skip}>Pular</Text>
      </TouchableOpacity>
      <Swiper
        index={index}
        onIndexChanged={(newIndex) => setIndex(newIndex)}
        dotColor="#D9D9D9"
        activeDotColor="#9E9696"
        showsButtons={true}
        loop={false}
      >
        <Tutorial
          imageSrc={require("../../../../assets/img_tutor1.png")}
          textEl={textEl1}
        ></Tutorial>
        <Tutorial
          imageSrc={require("../../../../assets/img_tutor2.png")}
          textEl={textEl2}
        ></Tutorial>
        <Tutorial
          imageSrc={require("../../../../assets/img_tutor3.png")}
          textEl={textEl3}
        ></Tutorial>
      </Swiper>
      <View style={styles.center}>
        <CustomButton
          title="Avançar"
          callbackFn={() => (index > 1 ? navigateHome() : setIndex(index + 1))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
    marginBottom: 0,
    paddingBottom: 0,
  },
  word: {
    color: "#B4026D",
  },
  linkButton: {
    alignItems: "center",
    marginTop: 27,
  },
  carousel: {
    height: "90%",
  },
  skip: {
    textAlign: "right",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 30,
    fontWeight: "bold",
    color: "gray",
  },
  center: {
    alignItems: "center",
    width: "100%",
  },
});
