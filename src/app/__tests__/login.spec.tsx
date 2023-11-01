import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../public/login";

// Importe o mock do AsyncStorage no início do arquivo
import "@react-native-async-storage/async-storage/jest/async-storage-mock";

// Configurar o mock do AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("Login Component", () => {
  it("deve renderizar corretamente", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    
    // Faça seus testes aqui, por exemplo:
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Senha");
    const loginButton = getByText("Entrar");

    // Simule a entrada de dados e o clique no botão de login
    fireEvent.changeText(emailInput, "seuemail@gmail.com");
    fireEvent.changeText(passwordInput, "suasenha");
    fireEvent.press(loginButton);

    // Execute suas asserções conforme necessário
  });
});
