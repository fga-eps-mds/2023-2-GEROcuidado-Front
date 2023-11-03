import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ModalConfirmation from '../components/ModalConfirmation';

describe('ModalConfirmation', () => {
  it('deve renderizar corretamente quando visível', () => {
    const { getByText } = render(<ModalConfirmation visible={true} callbackFn={() => {}} closeModal={() => {}} />);

    // Verifica se o texto do modal é exibido quando o modal está visível
    expect(getByText('Prosseguir com a exclusão da conta?')).toBeTruthy();
  });

  it('deve chamar a função de callback ao pressionar "Apagar"', () => {
    const callbackFn = jest.fn(); // Função de callback mock
    const { getByText } = render(<ModalConfirmation visible={true} callbackFn={callbackFn} closeModal={() => {}} />);

    // Simula o pressionar do botão "Apagar"
    fireEvent.press(getByText('Apagar'));

    // Verifica se a função de callback foi chamada
    expect(callbackFn).toHaveBeenCalled();
  });

  it('deve chamar a função de fechamento do modal ao pressionar "Cancelar"', () => {
    const closeModal = jest.fn(); // Função de fechamento do modal mock
    const { getByText } = render(<ModalConfirmation visible={true} callbackFn={() => {}} closeModal={closeModal} />);

    // Simula o pressionar do botão "Cancelar"
    fireEvent.press(getByText('Cancelar'));

    // Verifica se a função de fechamento do modal foi chamada
    expect(closeModal).toHaveBeenCalled();
  });
  it('não deve renderizar quando não visível', () => {
    const { queryByText } = render(<ModalConfirmation visible={false} callbackFn={() => {}} closeModal={() => {}} />);
  
    // Verifica se o texto do modal não está presente quando o modal não está visível
    expect(queryByText('Prosseguir com a exclusão da conta?')).toBeNull();
  });

  it('deve renderizar corretamente quando visível', () => {
    const { getByText } = render(<ModalConfirmation visible={true} callbackFn={() => {}} closeModal={() => {}} />);
  
    // Verifica se o texto do modal é exibido quando o modal está visível
    expect(getByText('Prosseguir com a exclusão da conta?')).toBeTruthy();
  });
  
  it('deve chamar a função de callback ao pressionar "Apagar"', () => {
    const callbackFn = jest.fn(); // Função de callback mock
    const { getByText } = render(<ModalConfirmation visible={true} callbackFn={callbackFn} closeModal={() => {}} />);
  
    // Simula o pressionar do botão "Apagar"
    fireEvent.press(getByText('Apagar'));
  
    // Verifica se a função de callback foi chamada
    expect(callbackFn).toHaveBeenCalled();
  });
  
  it('deve chamar a função de fechamento do modal ao pressionar "Cancelar"', () => {
    const closeModal = jest.fn(); // Função de fechamento do modal mock
    const { getByText } = render(<ModalConfirmation visible={true} callbackFn={() => {}} closeModal={closeModal} />);
  
    // Simula o pressionar do botão "Cancelar"
    fireEvent.press(getByText('Cancelar'));
  
    // Verifica se a função de fechamento do modal foi chamada
    expect(closeModal).toHaveBeenCalled();
  });
  
  it('não deve renderizar quando não visível', () => {
    const { queryByText } = render(<ModalConfirmation visible={false} callbackFn={() => {}} closeModal={() => {}} />);
  
    // Verifica se o texto do modal não está presente quando o modal não está visível
    expect(queryByText('Prosseguir com a exclusão da conta?')).toBeNull();
  });
  
});
