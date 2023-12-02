import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@react-native-async-storage/async-storage/jest/async-storage-mock';
import VisualizarValoresMedidos from '../private/pages/visualizarValoresMedidos';

describe('Visualizar Valores Medidos Component', () => {
    test('The component rendered', () => {
        (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
            if (key === 'usuario') {
                return Promise.resolve(JSON.stringify({ id: 1 }));
            } else if (key === 'token') {
                return Promise.resolve('mockedToken');
            }
            return Promise.resolve(null);
        });
        render(
            <NavigationContainer>
                <VisualizarValoresMedidos />
            </NavigationContainer>
        );
    });
});
