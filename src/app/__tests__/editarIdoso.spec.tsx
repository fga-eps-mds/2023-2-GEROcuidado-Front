import "@testing-library/jest-native/extend-expect";
import { render, fireEvent, act } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditarIdoso from "../private/pages/editarIdoso";
import React from "react";

// Mock AsyncStorage para retornar valores específicos durante o teste
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

describe("EditarIdoso", () => {
  const mockUsuario = {
    id: 123,
    // outras propriedades do usuário, se necessário
  };

  beforeEach(() => {
    // Configura o valor de retorno para AsyncStorage.getItem
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockUsuario));
  });

  it("renderiza corretamente", () => {
    render(<EditarIdoso />);

    // Você pode continuar a escrever o teste de renderização aqui
  });

  it("Salvar sem nome", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <EditarIdoso />,
    );

    const nome = getByPlaceholderText("Nome");
    const salvar = getByText("Salvar");

    act(() => {
      fireEvent.changeText(nome, "");
      fireEvent.press(salvar);
    });
    const erroTitulo = getByTestId("Erro-nome");

    expect(erroTitulo.props.children.props.text).toBe("Campo obrigatório!");
  });

  it("Salvar com nome muito grande", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <EditarIdoso />,
    );

    const titulo = getByPlaceholderText("Nome");
    const salvar = getByText("Salvar");

    act(() => {
      fireEvent.changeText(
        titulo,
        "Por que o livro de matemática está sempre triste? Porque tem muitos problemas!",
      );
      fireEvent.press(salvar);
    });
    const erroTitulo = getByText(
      "O nome completo deve ter no máximo 60 caractéres.",
    );

    expect(erroTitulo).toBeTruthy();
  });

  it("Salvar com nome curto", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <EditarIdoso />,
    );

    const nome = getByPlaceholderText("Nome");
    const salvar = getByText("Salvar");

    act(() => {
      fireEvent.changeText(nome, "Jo");
      fireEvent.press(salvar);
    });
    const erroTitulo = getByTestId("Erro-nome");

    expect(erroTitulo.props.children.props.text).toBe(
      "O nome completo deve ter pelo menos 5 caractéres.",
    );
  });
});
