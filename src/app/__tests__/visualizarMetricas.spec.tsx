import React from 'react';
import { render } from '@testing-library/react-native';
import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage'; 
import Registros from '../private/tabs/registros';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('Visualizar registros', () => {
  test('The component rendered', () => {
    // Mock the response for AsyncStorage.getItem
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'usuario') {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === 'token') {
        return Promise.resolve('mockedToken');
      }
      return Promise.resolve(null);
    });

    render(<Registros />);
  });
});