import { Link } from "expo-router";
import React from "react";
import { Pressable, Image, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Perfil() {
  return (
    <View>
      <View style={{ backgroundColor: "#2CCDB5", padding: 10 }}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <View>
            <Link href="private/tabs/forum">
              <Icon name="chevron-left" size={60} style={styles.botaoVoltar} />
            </Link>
          </View>
          <View>
            <Text style={styles.pagina}>Nova publicação</Text>
          </View>
        </View>
      </View>
      <View style={styles.publicacao}>
        <View style={styles.autor}>
          <View style={styles.postHeader}>
            <Image
              style={styles.avatar}
              source={require('../../../../assets/amelia.png')}
            />
            <View style={styles.userInfo}>
              <Text style={styles.username}>Amélia</Text>
            </View>
          </View>
        </View>
        <View style={styles.tituloPublicacao}>
          <Text>Título</Text>
          <TextInput style={styles.inputTitulo}/>
        </View>
        <View style={styles.descricao}>
          <Text>Descrição</Text>
          <TextInput style={styles.inputDescricao} multiline={true} numberOfLines={12}/>
        </View>
        <View style={styles.botoesPublicacao}>
          <Pressable style={styles.categoria}>
            <Text style={styles.textoBotao}>Categoria</Text>
            <Icon name="chevron-down"/>
          </Pressable>
          <Pressable style={styles.publicar}>
            <Text style={styles.textoBotao}>Publicar</Text>
            <Icon name="pencil"/>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagina:{
    fontWeight:'bold', 
    color:'white',
    fontSize: 24,
    padding:20,
  },
  botaoVoltar:{
    color:"white", 
    alignSelf: "flex-start"
  },
  publicacao: {
    borderWidth: 1,
    borderColor:"gray",
    borderRadius:24,
    backgroundColor:"white",
    margin:10,
  },
  autor: {
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontSize: 20,
    fontWeight:"bold"
  },
  tituloPublicacao:{
    margin: 10, 
  },
  inputTitulo:{
    borderWidth: 0, 
    padding: 5,
    backgroundColor:"#F1F1F1"
  },
  descricao:{
    margin:10,
  },
  inputDescricao:{
    borderWidth: 0, 
    padding: 5,
    backgroundColor:"#F1F1F1"
  },
  botoesPublicacao:{
    flexDirection:"row",
    justifyContent:"space-between",
    margin:10,
  },
  publicar: {
    flexDirection:'row',
    alignItems:'center',
    backgroundColor: '#B4026D',
    padding: 5,
    borderRadius: 14,
  },
  categoria: {
    flexDirection:'row',
    alignItems:'center',
    backgroundColor: '#B4026D',
    padding: 1,
    borderRadius: 14,
  },
  textoBotao:{
    color:"white"
  },
});
