import { FlatList, Image, Text, View } from 'react-native';

import React from 'react';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      
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
