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

          {/* Fixed Search Bar */}
      <View style={{ backgroundColor: 'lightgray', padding: 10 }}>
        {/* Your search bar component */}
        <Text>Search Bar</Text>
      </View>

      {/* Scrollable Posts */}
      <ScrollView style={{ flex: 1 }}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            onPress={() => {
              // Navigate to the post detail screen or perform an action when a post is clicked
            }}
            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
          >
            <Text style={{ fontWeight: 'bold' }}>{post.title}</Text>
            <Text>{post.content}</Text>
            <Text>{`Likes: ${post.likes} Comments: ${post.comments}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      </View>
  );
}