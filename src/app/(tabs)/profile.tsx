import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Settings() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="blue" />
        <Text style={styles.backButtonText}>VOLTAR</Text>
      </TouchableOpacity>


      <View style={styles.imageContainer}>
        <View style={styles.userImage}>

        </View>
        <TouchableOpacity style={styles.changePhotoButton}>
          <Text style={styles.changePhotoButtonText}>Alterar Foto</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Perfil - GEROcuidado</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
    marginLeft: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoButton: {
    marginTop: 10,
  },
  changePhotoButtonText: {
    color: 'blue',
    fontSize: 16,
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
    width: '100%',
  },
});
