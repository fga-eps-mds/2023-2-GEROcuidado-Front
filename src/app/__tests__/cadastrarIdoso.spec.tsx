import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import CadastrarIdoso from "../private/pages/cadastrarIdoso";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock any dependencies if needed
// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

describe("CadastrarIdoso component", () => {
  test("renders correctly", () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "usuario") {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === "token") {
        return Promise.resolve("mockedToken");
      }
      return Promise.resolve(null);
    });

    const { getByText } = render(<CadastrarIdoso />);

    const cadastrarButton = getByText("Cadastrar");
    expect(cadastrarButton).toBeTruthy();
  });

  it('cadastrar com nome curto', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarIdoso />);
          
    const titulo = getByPlaceholderText('Nome');
    const cadastrar = getByText('Cadastrar');

    act(() => {
        fireEvent.changeText(titulo, 'Jo');
        fireEvent.press(cadastrar);
    });
    const erroNome = getByTestId('Erro-nome');

    expect(erroNome.props.children.props.text).toBe('O nome completo deve ter pelo menos 5 caractéres.');
});

it('cadastrar com nome muito grande', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarIdoso />);
          
    const titulo = getByPlaceholderText('Nome');
    const cadastrar = getByText('Cadastrar');

    act(() => {
        fireEvent.changeText(titulo, 'Por que o livro de matemática está sempre triste? Porque tem muitos problemas! hahahahahahhahahahahhahahaahahahahahahhahahahahahahahahahahahhahaahahahahahahahahah');
        fireEvent.press(cadastrar);
    });
    const erroNome = getByText('O nome completo deve ter no máximo 60 caractéres.');

    expect(erroNome).toBeTruthy();
});

it('cadastrar sem data', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarIdoso />);
          
    const data = getByPlaceholderText('Data de Nascimento');
    const cadastrar = getByText('Cadastrar');

    act(() => {
        fireEvent.changeText(data, '');
        fireEvent.press(cadastrar);
    });
    const erroData = getByTestId('Erro-data');

    expect(erroData.props.children.props.text).toBe('Campo obrigatório');
});   

it('cadastrar data com formato errado', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarIdoso />);
          
    const data = getByPlaceholderText('Data de Nascimento');
    const cadastrar = getByText('Cadastrar');

    act(() => {
        fireEvent.changeText(data, '2010');
        fireEvent.press(cadastrar);
    });
    const erroData = getByTestId('Erro-data');

    expect(erroData.props.children.props.text).toBe('Data deve ser no formato dd/mm/yyyy!');
});    

it('cadastrar sem telefone', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarIdoso />);
          
    const hora = getByPlaceholderText('Telefone Responsável');
    const cadastrar = getByText('Cadastrar');

    act(() => {
        fireEvent.changeText(hora, '');
        fireEvent.press(cadastrar);
    });
    const erroHora = getByTestId('Erro-telefone');

    expect(erroHora.props.children.props.text).toBe('Campo obrigatório!');
});   

it('cadastrar telefone com formato errado', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<CadastrarIdoso />);
          
    const hora = getByPlaceholderText('Telefone Responsável');
    const cadastrar = getByText('Cadastrar');

    act(() => {
        fireEvent.changeText(hora, '551111');
        fireEvent.press(cadastrar);
    });
    const erroHora = getByTestId('Erro-telefone');

    expect(erroHora.props.children.props.text).toBe('Deve estar no formato (XX)XXXXX-XXXX');
});    
});
