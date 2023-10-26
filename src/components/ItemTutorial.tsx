import React, { ReactNode } from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";

interface Props {
  imageSrc: ImageSourcePropType;
  textEl: ReactNode;
}

export default function ItemTutorial({ imageSrc, textEl }: Props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={imageSrc} />
      {textEl}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  image: {
    alignSelf: "center",
    aspectRatio: 3 / 4,
    marginBottom: 28,
    marginTop: 32,
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
    marginTop: 27,
  },
});
