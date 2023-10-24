import { Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';

export default function HomeScreen() {
  return (

    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        {/* Fixed Search Bar */}
        <View style={{ backgroundColor: "#2CCDB5", padding: 10 }}>
          <View style={{alignItems:'center'}}>
            <Icon name='chevron-left' color={'white'} size={60} style={{position:'absolute', left:-20}}></Icon>
            <Text style={styles.titulo}>Fórum Gero Cuidado</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <TextInput
              style={styles.barraDePesquisa}
              placeholder="Pesquise uma notícia"
              // onChangeText={(text) => setSearchText(text)}
            />
            <TouchableOpacity style={styles.botao} onPress={() => {}}>
              <Icon style={{position:'absolute', right:15}} name='magnify' color={'#ADADAD'} size={30}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ backgroundColor: 'white', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
        <Text style={{fontSize:24, fontWeight:'600'}}>Publicacoes</Text>
        <TouchableOpacity style={styles.botao} onPress={() => {}}>
          <Text style={styles.textoBotao}>Crie uma publicação </Text>
          <Icon name='pencil' color={'white'} size={25}></Icon>
        </TouchableOpacity>
      </View>

      <FlatList
        data={["1", "2", "3"]}
        renderItem={({ item }) => (
          <View style={{
            margin: 10, borderRadius: 10, elevation: 5, backgroundColor: "white", shadowColor: '#333',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
          }}>

            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
              <Image source={require('../../../assets/amelia.png')} style={{ height: 50, width: 50, borderRadius: 50 }} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 20 }}>Amélia</Text>
                <Text style={{ fontSize: 12 }}>{new Date().toString().substring(0, 16)}</Text>
              </View>
            </View>
            
            <Image source={require('../../../assets/amelia.png')} style={{ height: 200 }} />

          </View>
        )}
        keyExtractor={(item) => (item)}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  titulo:{
    
    fontWeight:'bold', 
    color:'white', 
    textAlign:'center',
    fontSize: 24,
    padding:20,
  },
  barraDePesquisa:{
    flex:1, height: 40, 
    borderColor: 'white', 
    textAlign:'center', 
    color:'#ADADAD', 
    backgroundColor:'white', 
    borderWidth: 1, 
    margin: 10, 
    padding: 5, 
    borderRadius:14
  },
  botao: {
    flexDirection:'row',
    alignItems:'center',
    backgroundColor: '#B4026D',
    padding: 1,
    borderRadius: 14,
  },
  textoBotao: {
    color:'white',

    fontWeight:'600',
    fontSize:16,
  },
})
