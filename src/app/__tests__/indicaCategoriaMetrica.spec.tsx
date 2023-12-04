import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@react-native-async-storage/async-storage/jest/async-storage-mock';
import CriarMetrica from '../private/pages/indicaCategoriaMetrica';


describe('CriarMetrica Component', () => {
  beforeEach(async () => {
    await AsyncStorage.setItem('usuario', JSON.stringify({ id: '123', nome: 'Nome do idoso' }));
  });

  afterEach(async () => {
    await AsyncStorage.removeItem('usuario');
  });

  it('displays user information and metric cards when authenticated', async () => {
    const { findByText, findByTestId, debug } = render(<CriarMetrica />);

    debug();

    await waitFor(() => {
      expect(findByText('Nome do idoso')).toBeTruthy();
      expect(findByText('Nova Métrica')).toBeTruthy();
      expect(findByTestId('frequenciaCardiaca-card')).toBeTruthy();
    }, { timeout: 10000 }); 

  
  });


});
