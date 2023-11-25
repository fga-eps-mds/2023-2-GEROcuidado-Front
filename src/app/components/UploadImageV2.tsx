import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getImageUri, noImage } from "../shared/helpers/image.helper";
import { Image } from "expo-image";

interface Props {
  setPhotoCallback: (value: string | undefined) => void;
  base64: string | undefined;
}

export default function UploadImageV2({
  setPhotoCallback,
  base64,
}: Readonly<Props>) {
  if (base64) {
    base64 = getImageUri(base64);
  }
  const [photo, setPhoto] = useState<string | undefined>(base64);

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 0,
    });

    if (result.assets && result.assets[0]) {
      setPhoto(result.assets[0].uri);
      setPhotoCallback(result.assets[0].base64 as string);
    }
  };

  return (
    <Pressable
      style={styles.foto}
      onPress={pickPhoto}
      testID="uploadImageButton"
    >
      <Icon style={styles.icone} name="image-outline" size={20} />
      <Image
        source={{ uri: photo }}
        style={styles.imagem}
        placeholder={{ uri: noImage }}
        transition={500}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imagem: {
    position: "absolute",
    width: 168,
    aspectRatio: 1,
    zIndex: 2,
    borderRadius: 25,
  },
  foto: {
    position: "relative",
    borderRadius: 25,
    alignItems: "center",
    display: "flex",
    width: 170,
    height: 170,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    marginBottom: 38,
  },
  botao: {
    width: 167,
    height: 174,
    backgroundColor: "transparent",
    zIndex: 3,
  },
  icone: {
    position: "absolute",
    right: "44%",
    bottom: "44%",
    opacity: 0.4,
    margin: "auto",
    alignSelf: "center",
    zIndex: 1,
  },
});
