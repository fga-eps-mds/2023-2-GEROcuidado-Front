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

    it('Salvar com descrição muito grande', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarRotina />);
              
        const descricao = getByPlaceholderText('Descrição');
        const salvar = getByText('Salvar');

        act(() => {
            fireEvent.changeText(descricao, 'Chapeuzinho Vermelho, uma garotinha de capa vermelha, foi mandada pela mãe para levar doces à vovó doente. No caminho, encontrou o lobo, que a enganou perguntando sobre o destino. O lobo, mais rápido, chegou à casa da vovó primeiro, a engoliu e se disfarçou. Quando Chapeuzinho chegou, notou algo estranho na vovó. O lobo tentou enganá-la, mas Chapeuzinho percebeu. O caçador apareceu, salvou-as, cortou a barriga do lobo, libertando vovó e Chapeuzinho. Moral: cuidado com estranhos, até mesmo disfarçados de vovó!');
            fireEvent.press(salvar);
        });
        const erroDescricao = getByTestId('Erro-descricao');
    
        expect(erroDescricao.props.children.props.text).toBe('A descrição deve ter no máximo 300 caracteres.');
    }); 
});
