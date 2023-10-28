import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from '../../components/BackButton';
import LinkButton from '../../components/LinkButton';
import { Link, router } from 'expo-router';

// CRIANDO OBJETOS DE COMENTÁRIOS
export default function HomeScreen() {
  const [posts, setPosts] = useState([
    {
      id: '1',
      username: 'Amélia',
      date: new Date().toString().substring(0, 16),
      content: 'Eu sou uma cuidadora, Eu sou uma cuidadora, Eu sou uma cuidadora, Eu sou uma cuidadora, Eu sou uma cuidadora, Eu sou uma cuidadora, Eu sou uma cuidadora, Eu sou uma cuidadora',
      likes: 25,
      comments: 0,
    },
    {
      id: '2',
      username: 'Joana',
      date: new Date().toString().substring(0, 16),
      content: 'Eu cuido de idosos, e também cuido de outros idosos, e também cuido.',
      likes: 12,
      comments: 0,
    },
    {
      id: '3',
      username: 'Ana',
      date: new Date().toString().substring(0, 16),
      content: 'Eu cuido de idosos, e também cuido de outros idosos, e também cuido.',
      likes: 32,
      comments: 0,
    },


  ]);

  const handleLike = (postId: string) => {
    // Aqui quando clica no like, dai aumenta o número de like.
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (postId: string) => {
    // Quando clicar no comentário o que acontece???
  };
  
  const novaPublicacao = () => {
    router.push({ pathname: "/private/tabs/perfil"});
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        {/* BARRA DE PESQUISA */}
        <View style={{ backgroundColor: "#2CCDB5", padding: 10 }}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <View>
              <Link href="">
                <Icon name="chevron-left" size={60} style={{color:"white", alignSelf: "flex-start" }} />
              </Link>
            </View>
            <View>
              <Text style={styles.titulo}>Fórum Gero Cuidado</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <TextInput
              style={styles.barraDePesquisa}
              placeholder="Pesquise uma notícia"
              // onChangeText={(text) => setSearchText(text)}
            />
            <Pressable style={styles.botao} onPress={() => {}}>
              <Icon style={{position:'absolute', right:15}} name='magnify' color={'#ADADAD'} size={30}></Icon>
            </Pressable>
          </View>

        </View>
        <View style={{ backgroundColor: 'white', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
            <Text style={{fontSize:24, fontWeight:'600'}}>Publicações</Text>
            <Pressable style={styles.botao} onPress={novaPublicacao}>
              <Text style={styles.textoBotao}>Crie uma publicação </Text>
              <Icon name='pencil' color={'white'} size={25}></Icon>
            </Pressable>
          </View>   
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image
                style={styles.avatar}
                source={require('../../../../assets/amelia.png')}
              />
              <View style={styles.userInfo}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{item.content}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Icon name="heart" color="red" size={30} />
                <Text>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleComment(item.id)}>
                <Icon name="comment" color="blue" size={30} />
                <Text>{item.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  titulo:{

    fontWeight:'bold', 
    color:'white',
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
  avatar: {
    height: 50,
    width: 50,
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
  },
  date: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 15,
    maxHeight: 100,
    padding: 6,
    textAlign: 'justify',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});