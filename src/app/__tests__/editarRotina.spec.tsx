import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import EditarRotina from '../private/pages/editarRotina';


describe('CadastrarRotina Component', () => {
    it('Salvar sem titulo', async () => {
      const { getByText, getByPlaceholderText, getByTestId } = render(<EditarRotina />);
            
      const titulo = getByPlaceholderText('Adicionar título');
      const salvar = getByText('Salvar');

      act(() => {
          fireEvent.changeText(titulo, '');
          fireEvent.press(salvar);
      });
      const erroTitulo = getByTestId('Erro-titulo');
  
      expect(erroTitulo.props.children.props.text).toBe('Campo obrigatório!');
  });

  it('Salvar com titulo muito grande', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<EditarRotina />);
          
    const titulo = getByPlaceholderText('Adicionar título');
    const salvar = getByText('Salvar');

    act(() => {
        fireEvent.changeText(titulo, 'Por que o livro de matemática está sempre triste? Porque tem muitos problemas! hahahahahahhahahahahhahahaahahahahahahhahahahahahahahahahahahhahaahahahahahahahahah');
        fireEvent.press(salvar);
    });
    const erroTitulo = getByText('O título deve ter no máximo 100 caractéres.');

    expect(erroTitulo).toBeTruthy();
});

});