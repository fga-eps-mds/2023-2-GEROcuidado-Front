import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage() {
  const [temPermissaoGaleria, setTemPermissaoGaleria] = useState(false);
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    (async () => {
      const statusGaleria =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setTemPermissaoGaleria(statusGaleria.status === "granted");
    })();
  }, []);

  const escolherImagem = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(resultado);

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }

    console.log(resultado);
  };

  return (
    <View style={styles.image}>
      {imagem && <Image source={{ uri: imagem }} />}
      <View>
        <TouchableOpacity onPress={() => escolherImagem()}>
          <Icon style={styles.icone} name="image-outline" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image:{
    top: "46%",
  },
  icone:{
    opacity: 0.4,
  }
});
