import React, { ReactNode } from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";

interface Props {
  imageSrc: ImageSourcePropType;
  textEl: ReactNode;
}

export default function ItemTutorial({ imageSrc, textEl }: Readonly<Props>) {
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
    marginBottom: 0,
    marginTop: 0,
    height: "83%",
  },
});
