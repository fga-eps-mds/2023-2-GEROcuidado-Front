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

  it("Salvar sem nome", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CadastrarIdoso />,
    );

    const nome = getByPlaceholderText("Nome");
    const cadastrar = getByText("Cadastrar");

    act(() => {
      fireEvent.changeText(nome, "");
      fireEvent.press(cadastrar);
    });
    const erroTitulo = getByTestId("Erro-nome");

    expect(erroTitulo.props.children.props.text).toBe("Campo obrigatório!");
  });

  it("Salvar com nome muito grande", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CadastrarIdoso />,
    );

    const titulo = getByPlaceholderText("Nome");
    const cadastrar = getByText("Cadastrar");

    act(() => {
      fireEvent.changeText(
        titulo,
        "Por que o livro de matemática está sempre triste? Porque tem muitos problemas!",
      );
      fireEvent.press(cadastrar);
    });
    const erroTitulo = getByText("O nome completo deve ter no máximo 60 caractéres.");

    expect(erroTitulo).toBeTruthy();
  });

  it("Salvar com nome curto", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CadastrarIdoso />,
    );

    const nome = getByPlaceholderText("Nome");
    const cadastrar = getByText("Cadastrar");

    act(() => {
      fireEvent.changeText(nome, "Jo");
      fireEvent.press(cadastrar);
    });
    const erroTitulo = getByTestId("Erro-nome");

    expect(erroTitulo.props.children.props.text).toBe("O nome completo deve ter pelo menos 5 caractéres.");
  });

  it("Salvar data com formato errado", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CadastrarIdoso />,
    );

    const data = getByPlaceholderText("Data de Nascimento");
    const salvar = getByText("Cadastrar");

    act(() => {
      fireEvent.changeText(data, "2010");
      fireEvent.press(salvar);
    });
    const erroData = getByTestId("Erro-data");

    expect(erroData.props.children.props.text).toBe(
      "Data deve ser no formato dd/mm/yyyy!",
    );
  });

  it("Salvar com telefone errado", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CadastrarIdoso />,
    );

    const data = getByPlaceholderText("Telefone Responsável");
    const salvar = getByText("Cadastrar");

    act(() => {
      fireEvent.changeText(data, "55111");
      fireEvent.press(salvar);
    });
    const erroData = getByTestId("Erro-telefone");

    expect(erroData.props.children.props.text).toBe(
      "Deve estar no formato (XX)XXXXX-XXXX",
    );
  });

});
