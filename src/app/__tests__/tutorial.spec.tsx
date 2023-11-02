import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Tutorial from '../public/tutorial';

jest.mock('expo-router', () => {
  return {
    router: {
      replace: jest.fn(),
    },
  };
});

test('O componente Tutorial deve renderizar corretamente', () => {
  const { getByText } = render(<Tutorial />);
  
  expect(getByText('Gerencie as rotinas do seu idoso')).toBeTruthy();
  expect(getByText('Avançar')).toBeTruthy();
  expect(getByText('Pular')).toBeTruthy();
});

test('O botão "Pular" deve chamar a função "router.replace" com o caminho correto', () => {
  const { getByText } = render(<Tutorial/>);
  
  const pularButton = getByText('Pular');
  fireEvent.press(pularButton);

  // Verifica se a função "router.replace" foi chamada com o caminho correto
  expect(require('expo-router').router.replace).toHaveBeenCalledWith('/private/tabs/rotinas');
});

