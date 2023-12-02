import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface MetricCardProps {
  title: string;
  content: string;
  unit: string;
  time: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, content, unit, time }) => {
  const router = useRouter();
  const background = '#fff'; 

  const getTitleColor = (title: string): string => {
    if (title.toLowerCase().includes('pressão sanguínea') || title.toLowerCase().includes('frequência cardíaca')) {
      return '#FF7D7D'; 
    } else if (title.toLowerCase().includes('temperatura')) {
      return '#FFAC7D'; 
    } else if (title.toLowerCase().includes('hidratação')) {
      return '#5ABCD8'; 
    } else {
      return '#000'; 
    }
  };

  const onPressCard = async () => {
  
    await AsyncStorage.setItem('selectedMetric', title);

  
    router.push('/private/pages/visualizarValoresMedidos');
  };

  const titleColor = getTitleColor(title);

  return (
    <Pressable style={[styles.card, { borderColor: '#ddd', backgroundColor: background }]} onPress={onPressCard}>
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      <Text style={styles.content}>
        <Text style={[styles.number]}>{content}</Text>
        <Text style={[styles.units, { color: '#888' }]}>{unit}</Text>
      </Text>
      <Text style={[styles.time, { color: '#888' }]}>{time}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: '45%', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, 
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    marginTop: 8,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  units: {
    fontSize: 18,
  },
  time: {
    fontSize: 12,
    marginTop: 8,
  },
});

export default MetricCard;
