import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IPublicacao } from "../../interfaces/forum.interface";

export default function VerificarPostagem() {
  const item = useLocalSearchParams() as unknown as IPublicacao;
  const [titulo] = useState(item.titulo);
  const [foto] = useState<string | undefined | null>(item.usuario?.foto);
  const [nome] = useState(item.usuario?.nome);

  const hasFoto = (foto: string | null | undefined) => {
    if (!foto) return false;

    const raw = foto.split("data:image/png;base64,")[1];
    return raw.length > 0;
  };

  const getFoto = (foto: string | null | undefined) => {
    if (hasFoto(foto)) {
      return (
        <Image source={{ uri: foto as string }} style={styles.fotoPerfil} />
      );
    }

    return (
      <View style={[styles.semFoto, styles.fotoPerfil]}>
        <Icon style={styles.semFotoIcon} name="image-outline" size={15} />
      </View>
    );
  };

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
            <View style={styles.postHeader}>
              {getFoto(foto)}
              <View style={styles.userInfo}>
                <Text style={styles.title}>{titulo}</Text>
                <Text style={styles.username}>{nome}</Text>
                <Text style={styles.date}>{item.dataHora.toString()}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{item.descricao}</Text>
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
  postContainer: {
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  userInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
  },
  date: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 15,
    maxHeight: 100,
    padding: 6,
    textAlign: "justify",
    marginLeft: 10,
    width: "100%",
  },
  fotoPerfil: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 100,
  },
  semFoto: { position: "relative", backgroundColor: "#EFEFF0" },
  semFotoIcon: {
    position: "absolute",
    right: "38%",
    bottom: "38%",
    opacity: 0.4,
    margin: "auto",
    alignSelf: "center",
    zIndex: 1,
  },
  username: {
    color: "#000000",
    opacity: 0.5,
  },
});
