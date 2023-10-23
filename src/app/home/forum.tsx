import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

export default function HomeScreen (props) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={["1", "2", "3"]}
        renderItem={({ item }) => <View style={{
          margin: 10, borderRadius: 10, elevation: 5, backgroundColor: "white", shadowColor: '#333',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}>


          <View style={{ flexDirection: "row", alignItems: "center", padding: 10, }}>
            <Image source={{ uri: "https://murally.blob.core.windows.net/uploads/unbfgaepsmds202111846/0-1695170483745.jpeg?se=2023-10-23T01%3A01%3A00Z&sp=r&sv=2018-03-28&sr=b&rscc=public%2C%20max-age%3D600&sig=P1oy%2BmOTwq4e6r65yKri5RoVIkzp11aRVuMn%2B0upHTI%3D" }} style={{ height: 50, width: 50, borderRadius: 50}} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 20 }}>Amélia</Text>
              <Text style={{ fontSize: 12 }}>{new Date().toString().substring(0, 16)}</Text>
            </View>
          </View>
          
          <Image source={{uri: "https://murally.blob.core.windows.net/uploads/unbfgaepsmds202111846/0-1695170483745.jpeg?se=2023-10-23T01%3A01%3A00Z&sp=r&sv=2018-03-28&sr=b&rscc=public%2C%20max-age%3D600&sig=P1oy%2BmOTwq4e6r65yKri5RoVIkzp11aRVuMn%2B0upHTI%3D"}} style={{height: 200}}/>

        </View>}
        keyExtractor={(item) => (item)}
      />
    </View>
  )
}
