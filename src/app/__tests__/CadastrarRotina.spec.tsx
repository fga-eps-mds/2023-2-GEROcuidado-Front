import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import CadastrarRotina from '../private/pages/cadastrarRotina';
import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';


describe('CadastrarRotina Component', () => {
    it('Salvar sem titulo', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarRotina />);
              
        const titulo = getByPlaceholderText('Adicionar título');
        const salvar = getByText('Salvar');

        act(() => {
            fireEvent.changeText(titulo, '');
            fireEvent.press(salvar);
        });
        const erroHora = getByTestId('Erro-titulo');
    
        expect(erroHora.props.children.props.text).toBe('Campo obrigatório!');
        });
      });
