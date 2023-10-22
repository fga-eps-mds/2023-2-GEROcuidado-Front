import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


type Post = {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
};

const posts: Post[] = [
  { id: 1, title: 'Post 1', content: 'Content of Post 1', likes: 10, comments: 5 },
  { id: 2, title: 'Post 2', content: 'Content of Post 2', likes: 7, comments: 3 },
];

export default function Forum() {
  return (

      <View>
          <Text>Teste - Forum</Text>
      </View>
  );
}