import React, { useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MetricCard from '../../components/CardMetricas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '../../interfaces/user.interface';
import NaoAutenticado from "../../components/NaoAutenticado";

export default function Registros() {

    const [user, setUser] = useState<IUser | undefined>(undefined);

  const handleUser = () => {
    AsyncStorage.getItem("usuario").then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  useEffect(() => handleUser(), []);

  return !user ? (
    <NaoAutenticado />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      {
      }
      <View style={styles.header}>
        <Image
          source={require('../../../../assets/Idoso.png')}
          style={styles.imagem}
          resizeMode="contain"
        />
        <Text style={styles.name}>Nome do idoso</Text>
      </View>

      {
      }
      <View>
        <TouchableOpacity style={styles.botaoCriarMetricas} onPress={() => console.log('Button pressed')}>
          <Icon name="plus" color={'white'} size={20} />
          <Text style={styles.textoBotaoCriarMetricas}>Nova Métrica</Text>
        </TouchableOpacity>
      </View>

      {
      }
      <View style={styles.metricsContainer}>
        <MetricCard
          title="Frequência Cardíaca"
          content="70"
          unit="bpm"
          time="há 3 horas"
        />
        <MetricCard
          title="Pressão Sanguínea"
          content="120/80"
          unit="mmHg"
          time="há 10 minutos"
        />
        <MetricCard
          title="Temperatura"
          content="36.7"
          unit="°C"
          time="agora mesmo"
        />
        <MetricCard
          title="Hidratação"
          content="1400/3500"
          unit="ml"
          time="dados de hoje"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#2CCDB5',
    width: '100%',
    padding: 10,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCriarMetricas: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B4026D',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 10,
    marginVertical: 10,
  },
  textoBotaoCriarMetricas: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
  imagem: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 10,
  },

});