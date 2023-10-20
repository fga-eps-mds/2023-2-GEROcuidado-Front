import { StyleSheet, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import React from "react"
import Title from '../src/components/Title'

export default function App() {
  return (
    <View style={styles.container}>
      <Title/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})



