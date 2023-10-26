import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
  { id: 3, title: 'Post 3', content: 'Content of Post 3', likes: 17, comments: 2 },
  { id: 4, title: 'Post 4', content: 'Content of Post 4', likes: 14, comments: 6 },
  { id: 5, title: 'Post 5', content: 'Content of Post 5', likes: 2, comments: 7 },
  { id: 6, title: 'Post 6', content: 'Content of Post 6', likes: 5, comments: 8 },
  { id: 7, title: 'Post 7', content: 'Content of Post 7', likes: 2, comments: 13 },
  { id: 8, title: 'Post 8', content: 'Content of Post 8', likes: 7, comments: 0 },
  { id: 9, title: 'Post 9', content: 'Content of Post 9', likes: 9, comments: 1 },
  { id: 10, title: 'Post 10', content: 'Content of Post 10', likes: 11, comments: 1 },
];

export default function Forum() {
  return (

      <View>
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