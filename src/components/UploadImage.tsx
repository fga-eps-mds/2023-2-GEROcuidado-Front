import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function UploadImage() {
  const [image, setImage] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.foto}>
      <Icon style={styles.icone} name="image-outline" size={20} />
      <TouchableOpacity style={styles.botao} onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.imagem} />}
    </View>
  );
}

const styles = StyleSheet.create({
  imagem: {
    position: "absolute",
    width: 170,
    height: 170,
    zIndex: 2,
    borderRadius: 25,
  },
  foto: {
    position: "relative",
    backgroundColor: "#EFEFF0",
    borderRadius: 25,
    alignItems: "center",
    display: "flex",
    width: 170,
    height: 170,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#AFB1B6",
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