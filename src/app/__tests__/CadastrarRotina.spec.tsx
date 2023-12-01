import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import CadastrarRotina from '../private/pages/cadastrarRotina';


describe('CadastrarRotina Component', () => {
    it('Salvar sem titulo', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarRotina />);
              
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
        const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarRotina />);
              
        const titulo = getByPlaceholderText('Adicionar título');
        const salvar = getByText('Salvar');

        act(() => {
            fireEvent.changeText(titulo, 'Por que o livro de matemática está sempre triste? Porque tem muitos problemas! hahahahahahhahahahahhahahaahahahahahahhahahahahahahahahahahahhahaahahahahahahahahah');
            fireEvent.press(salvar);
        });
        const erroTitulo = getByText('O título deve ter no máximo 100 caracteres.');
    
        expect(erroTitulo).toBeTruthy();
    });

    it('Salvar sem data', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarRotina />);
              
        const data = getByPlaceholderText('Data da rotina');
        const salvar = getByText('Salvar');

        act(() => {
            fireEvent.changeText(data, '');
            fireEvent.press(salvar);
        });
        const erroData = getByTestId('Erro-data');
    
        expect(erroData.props.children.props.text).toBe('Campo obrigatório');
    });   
    
    it('Salvar data com formato errado', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarRotina />);
              
        const data = getByPlaceholderText('Data da rotina');
        const salvar = getByText('Salvar');

        act(() => {
            fireEvent.changeText(data, '2010');
            fireEvent.press(salvar);
        });
        const erroData = getByTestId('Erro-data');
    
        expect(erroData.props.children.props.text).toBe('Data deve ser no formato dd/mm/yyyy!');
    });    

    it('Salvar sem hora', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarRotina />);
              
        const hora = getByPlaceholderText('Horário de início');
        const salvar = getByText('Salvar');

        act(() => {
            fireEvent.changeText(hora, '');
            fireEvent.press(salvar);
        });
        const erroHora = getByTestId('Erro-hora');
    
        expect(erroHora.props.children.props.text).toBe('Campo obrigatório');
    });   

    it('Salvar hora com formato errado', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarRotina />);
              
        const hora = getByPlaceholderText('Horário de início');
        const salvar = getByText('Salvar');

        act(() => {
            fireEvent.changeText(hora, '201');
            fireEvent.press(salvar);
        });
        const erroHora = getByTestId('Erro-hora');
    
        expect(erroHora.props.children.props.text).toBe('Hora deve ser no formato hh:mm!');
    });    

});
