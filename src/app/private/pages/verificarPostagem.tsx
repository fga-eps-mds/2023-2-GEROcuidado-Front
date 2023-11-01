import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function VerificarPostagem() {
  return (
    <View>
      <View style={{ backgroundColor: "#2CCDB5", padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Link href="private/tabs/forum">
              <Icon name="chevron-left" size={60} style={styles.botaoVoltar} />
            </Link>
          </View>

          <View>
            <Text style={styles.pagina}>Portal GERO cuidado</Text>
          </View>

          <View>
            <Link href="private/tabs/forum">
              <Icon name="share-variant" size={45} style={styles.botaoShare} />
            </Link>
          </View>
        </View>
      </View>

      <View style={styles.editar}>
        <Pressable style={styles.editar}>
          <Text style={styles.textoEditar}>Editar</Text>
          <Icon name="pencil" size={20} color={"white"} />
        </Pressable>
      </View>

      <View>
        <Text style={styles.resposta}>Respostas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagina: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    padding: 20,
  },
  botaoVoltar: {
    color: "white",
    alignSelf: "flex-start",
  },
  botaoShare: {
    color: "white",
    alignSelf: "flex-start",
  },
  editar: {
    backgroundColor: "#2CCDB5",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 15,
    borderRadius: 14,
  },
  textoEditar: {
    color: "white",
    fontSize: 18,
    margin: 5,
  },
  resposta: {
    fontWeight: "bold",
    color: "black",
    fontSize: 24,
    padding: 20,
  },
});
