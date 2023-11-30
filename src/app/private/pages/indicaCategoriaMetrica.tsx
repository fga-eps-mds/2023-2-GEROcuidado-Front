import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NaoAutenticado from '../../components/NaoAutenticado';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IUser } from '../../interfaces/user.interface'; 

export default function criarMetrica() {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const handleUser = () => {
    AsyncStorage.getItem('usuario').then((response) => {
      const usuario = JSON.parse(response as string);
      setUser(usuario);
    });
  };

  useEffect(() => {
    handleUser();
  }, []);

  const handleMetricSelection = (metricType: string) => {
    console.log(`Selecionado: ${metricType}`);
  };

  const renderMetricCard = (metricType: string, iconName: string, description: string, iconColor: string) => (
    <TouchableOpacity
      key={metricType}
      style={styles.metricCard}
      onPress={() => handleMetricSelection(metricType)}
    >
      <View style={styles.metricCardContent}>
        {iconName === 'oxygen' && <Text style={styles.oxygenSymbol}>O2</Text>}
        {iconName !== 'oxygen' && (
          <Icon name={iconName} color={iconColor} size={30} style={styles.metricCardIcon} />
        )}
        <Text style={styles.metricCardText}>{description}</Text>
        <Text style={styles.cadastrarPlaceholder}>Cadastrar {description}</Text>
      </View>
    </TouchableOpacity>
  );

  return !user?.id ? (
    <NaoAutenticado />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../../assets/Idoso.png')}
          style={styles.imagem}
          resizeMode="contain"
        />
        <Text style={styles.name}>Nome do idoso</Text>
      </View>

      <TouchableOpacity
        style={styles.botaoCriarMetricas}
        onPress={() => console.log('Button pressed')}
      >
        <Icon name="chevron-left" color={'black'} size={20} style={styles.chevronLeft} />
        <Text style={styles.textoBotaoCriarMetricas}>Nova Métrica</Text>
      </TouchableOpacity>

      <Text style={styles.textoAbaixoDoBotao}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Qual tipo de métrica você quer cadastrar?</Text>
      </Text>

      <View style={styles.metricCardsContainer}>
        {renderMetricCard('frequenciaCardiaca', 'heartbeat', 'Frequência Cardíaca', '#FF7D7D')}
        {renderMetricCard('pressaoSanguinea', 'tint', 'Pressão Sanguínea', '#FF7D7D')}
        {renderMetricCard('saturacaoOxigenio', 'oxygen', 'Saturação do Oxigênio', '87F4E4')}
        {renderMetricCard('temperatura', 'thermometer', 'Temperatura', 'FFAC7D')}
        {renderMetricCard('glicemia', 'cubes', 'Glicemia', '#3F3F3F')}
      </View>

      {/* Adicione aqui o restante do conteúdo do componente criarMetrica */}
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
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 0,
    marginTop: -10,
  },
  chevronLeft: {
    marginRight: 15,
    width: 15,
  },
  textoBotaoCriarMetricas: {
    color: '#3F3F3F',
    fontSize: 17,
    marginLeft: 15,
  },
  textoAbaixoDoBotao: {
    marginTop: 30,
    textAlign: 'center',
    color: '#3F3F3F',
    fontSize: 20,
  },
  metricCardsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  metricCard: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  metricCardIcon: {
    marginRight: 10,
  },
  metricCardText: {
    color: '#3F3F3F',
    fontSize: 16,
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
  metricCardContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cadastrarPlaceholder: {
    color: '#A9A9A9',
    fontSize: 12,
    marginTop: 5,
  },
  oxygenSymbol: {
    fontSize: 30,
    color: '#3F3F3F',
    marginRight: 10,
  },
});
