import React from 'react';
import { act, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@react-native-async-storage/async-storage/jest/async-storage-mock';
import CardRotina from '../components/CardRotina';
import { ECategoriaRotina, EDiasSemana } from '../interfaces/rotina.interface';

  jest.mock('expo-router', () => ({
    router: {
      push: jest.fn(),
    },
  }));

  const rotina = {
    id: 1,
  titulo: 'Título de Exemplo',
  idIdoso: 123, 
  categoria: ECategoriaRotina.ALIMENTACAO, 
  descricao: 'Descrição de Exemplo',
  dataHoraConcluidos: [],
  dataHora: new Date(),
  dias: [EDiasSemana.Domingo],
  };

describe('card Rotina Component', () => {
    act(() => {
        test('renders routine information correctly', () => {
            const { getByText } = render(<CardRotina item={rotina} index={0} date={new Date()} />);
            expect(getByText('Título de Exemplo')).toBeTruthy();
            expect(getByText('Descrição de Exemplo')).toBeTruthy();
          });
    });

});