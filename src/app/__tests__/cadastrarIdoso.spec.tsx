import React from 'react';
import { render } from '@testing-library/react-native';
import CadastrarIdoso from '../private/pages/cadastrarIdoso';
import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

// Mock any dependencies if needed
// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
  }));

describe('CadastrarIdoso component', () => {
  test('renders correctly', () => {

    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === 'usuario') {
          return Promise.resolve(JSON.stringify({ id: 1 }));
        } else if (key === 'token') {
          return Promise.resolve('mockedToken');
        }
        return Promise.resolve(null);
      });

    const { getByText } = render(<CadastrarIdoso />);
    
    // You can add more specific queries based on your UI
    const saveButton = getByText('Salvar');
    expect(saveButton).toBeTruthy();
  });
});