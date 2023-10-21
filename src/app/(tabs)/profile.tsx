import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import React from 'react';

export default function Settings() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>VOLTAR</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Configurações - GEROcuidado</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Nome completo" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
      </View>
      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center', 
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%', 
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
