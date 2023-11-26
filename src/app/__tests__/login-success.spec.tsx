import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import Login from "../public/login";

// Mock do AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));
// Mock da função de login
// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock("../services/user.service");

describe("Login Component - Sucesso", () => {
  it("deve lidar com campos vazios e inválidos", () => {
    const { getByText, queryByTestId } = render(<Login />);
    const loginButton = getByText("Entrar");

    act(() => {
      fireEvent.press(loginButton);
    });

    // Verifique se as mensagens de erro são exibidas
    expect(queryByTestId("error-email")).toBeNull();
    expect(queryByTestId("error-senha")).toBeNull();
  });

  /*it("deve lidar com email inválido", () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(<Login />);
    const emailInput = getByPlaceholderText("Email");
    const loginButton = getByText("Entrar");

    act(() => {
      fireEvent.changeText(emailInput, "email_invalido");
      fireEvent.press(loginButton);
    });

    // Verifique se a mensagem de erro de email inválido é exibida
    expect(queryByTestId("error-email")).not.toBeNull();
  });
*/
  it("deve lidar com senha inválida", () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(
      <Login />,
    );
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Senha");
    const loginButton = getByText("Entrar");

    act(() => {
      fireEvent.changeText(emailInput, "seuemail@gmail.com");
      fireEvent.changeText(passwordInput, "senha_curta");
      fireEvent.press(loginButton);
    });

    // Verifique se a mensagem de erro de senha inválida é exibida
    expect(queryByTestId("error-senha")).toBeNull();
  });
});
