import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinkButton } from "../../../components/LinkButton";

export default function Tutorial2() {
  return (
    <View>
      <View>
        <TouchableOpacity>
          <Text style={styles.skip}>Pular</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          style={styles.image}
          source={require("../../../../assets/img_tutor3.png")}
        />
        <Text style={styles.text}>Obtenha ajuda no</Text>
        <Text style={[styles.text, styles.word]}>portal</Text>
        <View style={styles.row}>
          <Icon
            name="checkbox-blank-circle"
            size={15}
            style={[styles.circle, styles.notSelectedCircle]}
          />
          <Icon
            name="checkbox-blank-circle"
            size={15}
            style={[styles.circle, styles.notSelectedCircle]}
          />
          <Icon name="checkbox-blank-circle" size={15} style={styles.circle} />
        </View>
        <View style={styles.linkButton}>
          <LinkButton
            title="Prosseguir"
            href="/pages/auth/tutorial3"
          ></LinkButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skip: {
    textAlign: "right",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    fontWeight: "bold",
    color: "gray",
  },
  image: {
    alignSelf: "center",
    marginBottom: 46,
    marginTop: 10,
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
  },
  word: {
    color: "#B4026D",
  },
  row: {
    marginTop: 40,
    flexDirection: "row",
    alignSelf: "center",
  },
  circle: {
    color: "#9E9696",
    paddingLeft: 10,
    paddingRight: 10,
  },
  notSelectedCircle: {
    opacity: 0.4,
  },
  linkButton: {
    alignItems: "center",
    marginTop: 30,
  },
});
