import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    router.push({ pathname: "/private/stack/cria_publicacao" });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        {/* BARRA DE PESQUISA */}
        <View style={styles.cabecalho}>
          <View style={styles.titulo}>
            <View>
              <Link href="">
                <Icon name="chevron-left" size={60} style={styles.iconeVoltar} />
              </Link>
            </View>
            <View>
              <Text style={styles.textoTitulo}>Fórum Gero Cuidado</Text>
            </View>
          </View>

          <View style={styles.barraDePesquisa}>
            <TextInput
              style={styles.inputBarraDePesquisa}
              placeholder="Pesquise uma notícia"
            // onChangeText={(text) => setSearchText(text)}
            />
            <Pressable style={styles.botaoPesquisar} onPress={() => { }}>
              <Icon style={styles.iconePesquisar} name='magnify' size={30}></Icon>
            </Pressable>
          </View>

        </View>
        <View style={styles.publicacao}>
          <Text style={styles.textoPublicacoes}>Publicações</Text>
          <Pressable style={styles.botaoCriarPublicacao} onPress={novaPublicacao}>
            <Text style={styles.textoBotaoPesquisar}>Crie uma publicação </Text>
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
  cabecalho: {
    backgroundColor: "#2CCDB5",
    padding: 10
  },
  iconeVoltar: {
    color: "white",
    alignSelf: "flex-start"
  },
  titulo: {
    flexDirection: "row",
    alignItems: "center"
  },
  textoTitulo: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    padding: 20,
  },
  barraDePesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBarraDePesquisa: {
    flex: 1, height: 40,
    borderColor: 'white',
    textAlign: 'center',
    color: '#ADADAD',
    backgroundColor: 'white',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 14
  },
  iconePesquisar: {
    position: 'absolute',
    right: 15,
    color: "#ADADAD"
  },
  botaoPesquisar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    borderRadius: 14,
  },
  textoBotaoPesquisar: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  textoPublicacoes: {
    fontSize: 24,
    fontWeight: '600'
  },
  botaoCriarPublicacao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B4026D',
    padding: 5,
    borderRadius: 14,
  },
  publicacao: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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