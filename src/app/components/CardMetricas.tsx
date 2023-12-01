import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // ou qualquer outro ícone disponível

interface MetricCardProps {
  title: string;
  content: string;
  unit: string;
  time: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, content, unit, time }) => {
  let titleColor = '#000'; // Cor padrão

  if (title.toLowerCase().includes('pressão sanguínea') || title.toLowerCase().includes('frequência cardíaca')) {
    titleColor = '#FF7D7D'; // Vermelho
  } else if (title.toLowerCase().includes('temperatura')) {
    titleColor = '#FFAC7D'; // Laranja
  } else if (title.toLowerCase().includes('hidratação')) {
    titleColor = '#5ABCD8'; // Azul
  }

  const textColor = '#888'; // Cor do texto do horário e unidades

  return (
    <View style={[styles.card, { borderColor: '#ddd', backgroundColor: '#fff' }]}>
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      <Text style={styles.content}>
        <Text style={[styles.number]}>{content}</Text>
        <Text style={[styles.units, { color: textColor }]}>{unit}</Text>
      </Text>
      <Text style={[styles.time, { color: textColor }]}>{time}</Text>
      <Icon name="chevron-right" size={16} color={textColor} style={styles.chevron} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: '45%', // Adjust width for two cards in a row
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
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
    fontSize: 24, // Adjust font size for the content (number)
  },
  units: {
    fontSize: 18, // Adjust font size for units
  },
  time: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
  },
  chevron: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

});

export default MetricCard;
