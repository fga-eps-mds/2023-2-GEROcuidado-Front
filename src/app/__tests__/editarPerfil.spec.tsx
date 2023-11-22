import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import EditarPerfil from '../private/pages/editarPerfil';

describe('EditarPerfil component', () => {

  test('Atualiza nome com o input', async () => {
    const { getByPlaceholderText } = render(<EditarPerfil />);
    const nameInput = getByPlaceholderText('Nome completo');
    fireEvent.changeText(nameInput, 'Gustavo A');

    await waitFor(() => {
      expect(nameInput.props.value).toBe('Gustavo A');
    });
  });

  test('Exibe mensagem de erro ao tentar salvar com nome vazio', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<EditarPerfil />);
    const nameInput = getByPlaceholderText('Nome completo');
    fireEvent.changeText(nameInput, '');

    const saveButton = getByText('Salvar');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(getByText('Campo obrigatório!')).toBeTruthy();
    });

    // Certifique-se de que a mensagem de erro específica não está presente quando não deve ser exibida
    await waitFor(() => {
      expect(queryByText('O nome completo deve ter pelo menos 5 caractéres.')).toBeNull();
      expect(queryByText('O nome completo deve ter no máximo 60 caractéres.')).toBeNull();
    });
  });

  test('Exibe mensagem de erro ao tentar salvar com nome muito curto', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<EditarPerfil />);
    const nameInput = getByPlaceholderText('Nome completo');
    fireEvent.changeText(nameInput, 'Jo');

    const saveButton = getByText('Salvar');
    fireEvent.press(saveButton);

    await act(async () => {
      const errorMessage = await findByText('O nome completo deve ter pelo menos 5 caractéres.');
      expect(errorMessage).toBeTruthy();
    });
  });

  test('Exibe mensagem de erro ao tentar salvar com nome muito longo', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<EditarPerfil />);
    const nameInput = getByPlaceholderText('Nome completo');
    fireEvent.changeText(
      nameInput,
      'Lorem Ipsum é apenas um texto fictício da indústria de impressão e composição tipográfica.'
    );

    const saveButton = getByText('Salvar');
    fireEvent.press(saveButton);

    await act(async () => {
      const errorMessage = await findByText('O nome completo deve ter no máximo 60 caractéres.');
      expect(errorMessage).toBeTruthy();
    });
  });
  
  test('Não exibe mensagem de erro ao salvar com nome válido', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<EditarPerfil />);
    const nameInput = getByPlaceholderText('Nome completo');
    fireEvent.changeText(nameInput, 'Nome Válido');
  
    const saveButton = getByText('Salvar');
    fireEvent.press(saveButton);
  
    // Certifique-se de que nenhuma mensagem de erro é exibida
    await waitFor(() => {
      expect(queryByText('Campo obrigatório!')).toBeNull();
      expect(queryByText('O nome completo deve ter pelo menos 5 caractéres.')).toBeNull();
      expect(queryByText('O nome completo deve ter no máximo 60 caractéres.')).toBeNull();
    });
  });
  
  test('Exibe mensagem de confirmação ao apagar conta', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<EditarPerfil />);
    const apagarContaButton = getByText('Apagar Conta');
  
    fireEvent.press(apagarContaButton);
  
    // Aguarde até que a mensagem de confirmação seja encontrada
    await waitFor(() => {
      expect(findByText('Prosseguir com a exclusão da conta?')).toBeTruthy();
    });
  });
  
});
