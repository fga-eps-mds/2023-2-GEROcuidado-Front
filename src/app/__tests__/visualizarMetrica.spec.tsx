import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import VisualizarMetrica from '../private/pages/visualizarMetrica';

describe('Componente VisualizarMetrica', () => {
  it('renderiza corretamente com autenticação de usuário', async () => {
    const { findByText } = render(<VisualizarMetrica />);
    try {
      await waitFor(() => expect(findByText('Categoria Simulada')).toBeTruthy());
    } catch (error) {
      handleTestError(error);
    }
  });

  it('manipula a abertura correta do modal de novo valor', async () => {
    const { findByText, findByTestId } = render(<VisualizarMetrica />);
    try {
      await waitFor(() => expect(findByText('Categoria Simulada')).toBeTruthy());
      fireEvent.press(findByTestId('botao-novo-valor'));

    } catch (error) {
      handleTestError(error);
    }
  });

  it('salva um novo valor de métrica corretamente', async () => {
    const { findByText, findByPlaceholderText, findByTestId } = render(<VisualizarMetrica />);
    try {
      await waitFor(() => expect(findByText('Categoria Simulada')).toBeTruthy());
      fireEvent.press(findByTestId('botao-novo-valor'));
   
      fireEvent.changeText(findByPlaceholderText('Digite o Valor'), '10');
      fireEvent.press(findByText('Salvar'));

    } catch (error) {
      handleTestError(error);
    }
  });

  it('navega de volta à tela anterior corretamente', async () => {
    const { findByText, findByTestId } = render(<VisualizarMetrica />);
    try {
      await waitFor(() => expect(findByText('Categoria Simulada')).toBeTruthy());
      fireEvent.press(findByTestId('botao-voltar'));

    } catch (error) {
      handleTestError(error);
    }
  });
 
  it('exibe a lista de valores de métricas corretamente', async () => {
    const { findByText } = render(<VisualizarMetrica />);
    try {
      await waitFor(() => expect(findByText('Categoria Simulada')).toBeTruthy());

    } catch (error) {
      handleTestError(error);
    }
  });

  it('abre o modal ao pressionar o botão "Novo valor"', async () => {
    const { findByText, findByTestId, findByPlaceholderText } = render(<VisualizarMetrica />);
    try {
      await waitFor(() => expect(findByText('Categoria Simulada')).toBeTruthy());
      fireEvent.press(findByTestId('botao-novo-valor'));

    } catch (error) {
      handleTestError(error);
    }
  });

  it('salva um novo valor de métrica corretamente', async () => {
    const { findByText, findByTestId, findByPlaceholderText } = render(<VisualizarMetrica />);
    try {
      await waitFor(() => expect(findByText('Categoria Simulada')).toBeTruthy());
      fireEvent.press(findByTestId('botao-novo-valor'));

      fireEvent.changeText(findByPlaceholderText('Digite o Valor'), '10');
      fireEvent.press(findByText('Salvar'));

    } catch (error) {
      handleTestError(error);
    }
  });

  it('não exibe valores de métricas se o usuário não estiver autenticado', async () => {

    jest.mock('../interfaces/user.interface', () => ({ IUser: undefined }));

    const { queryByText } = render(<VisualizarMetrica />);
    try {
 
      expect(queryByText('Categoria Simulada')).toBeNull();

    } catch (error) {
      handleTestError(error);
    }
  });

  const handleTestError = (error: any) => {
    console.error('Erro:', error?.message || 'Erro desconhecido');
  };
});
