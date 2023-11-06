import "@react-native-async-storage/async-storage/jest/async-storage-mock";

import { fireEvent, render } from "@testing-library/react-native";

import Login from "../public/login";
import React from "react";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("Login Component", () => {
  it("deve renderizar corretamente", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Senha");
    const loginButton = getByText("Entrar");

    // Use fireEvent para interagir com o componente
    fireEvent.changeText(emailInput, "seuemail@gmail.com");
    fireEvent.changeText(passwordInput, "suasenha");
    fireEvent.press(loginButton);

    // Adicione asserções para verificar o comportamento esperado
    // Por exemplo, você pode verificar se uma ação ocorreu após o pressionamento do botão
  });

  it("deve lidar com campos vazios e inválidos", () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(
      <Login />,
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Senha");
    const loginButton = getByText("Entrar");

    // Tente efetuar login com campos vazios
    fireEvent.press(loginButton);

    // Verifique se as mensagens de erro são exibidas
    expect(queryByTestId("error-email")).not.toBeNull();
    expect(queryByTestId("error-senha")).not.toBeNull();

    // Preencha campos com valores inválidos
    fireEvent.changeText(emailInput, "email_invalido");
    fireEvent.changeText(passwordInput, "senha_curta");
    fireEvent.press(loginButton);

    // Verifique se as mensagens de erro correspondentes são exibidas
    expect(queryByTestId("error-email")).not.toBeNull();
    expect(queryByTestId("error-senha")).not.toBeNull();
  });
});
