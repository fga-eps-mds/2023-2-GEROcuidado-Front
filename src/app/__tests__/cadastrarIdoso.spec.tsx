import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
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
  test('should set error message when "nome" is empty', () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "usuario") {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === "token") {
        return Promise.resolve("mockedToken");
      }
      return Promise.resolve(null);
    });
    
    const { getByText, getByPlaceholderText } = render(<CadastrarIdoso />);
    const nome = getByPlaceholderText("Nome");
    const cadastrarButton = getByText("Cadastrar");

    act(() => {
      fireEvent.changeText(nome,"Leo");
      fireEvent.press(cadastrarButton);
    });


    const erroNome = getByText("O nome completo deve ter pelo menos 5 caractéres.");

    expect(erroNome).toBeDefined;
    
  });

  // it('shows validation errors when submitting empty form', async () => {
  //   const { getByText } = render(<CadastrarIdoso />);
  //   const cadastrarButton = getByText('Cadastrar');

  //   fireEvent.press(cadastrarButton);

  //   // Ensure that the error messages are displayed
  //   await waitFor(() => {
  //     expect(getByText('Campo obrigatório!')).toBeTruthy();

  //   });
  // });

});
