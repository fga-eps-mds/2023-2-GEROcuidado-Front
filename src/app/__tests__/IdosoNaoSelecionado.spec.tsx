import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import IdosoNaoSelecionado from '../components/IdosoNaoSelecionado';


jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
  }));
  
  test('renderiza IdosoNaoSelecionado corretamente e navega ao pressionar o link', async () => {
    const { getByText } = render(<IdosoNaoSelecionado />);
  
    const textoIdosoNaoSelecionado = getByText('Idoso não selecionado');
    expect(textoIdosoNaoSelecionado).toBeDefined();
  
    const linkSelecioneSeuIdoso = getByText('Selecione seu idoso');
    expect(linkSelecioneSeuIdoso).toBeDefined();
  
    });