import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Cadastro from "../public/cadastro";
import "@react-native-async-storage/async-storage/jest/async-storage-mock";


jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("Cadastro Component", () => {
  it("deve renderizar corretamente", () => {
    const { getByPlaceholderText, getByText } = render(<Cadastro />);
    
    const nomeInput = getByPlaceholderText("Nome completo");
    const emailInput = getByPlaceholderText("Email");
    const confirmEmailInput = getByPlaceholderText("Confirme seu Email");
    const passwordInput = getByPlaceholderText("Senha");
    const confirmPasswordInput = getByPlaceholderText("Confirme sua senha");
    const cadastrarButton = getByText("Cadastrar");

    // Simulando a entrada de dados e o clique no botão de cadastro
    fireEvent.changeText(nomeInput, "Seu Nome");
    fireEvent.changeText(emailInput, "seuemail@gmail.com");
    fireEvent.changeText(confirmEmailInput, "seuemail@gmail.com");
    fireEvent.changeText(passwordInput, "suasenha");
    fireEvent.changeText(confirmPasswordInput, "suasenha");
    fireEvent.press(cadastrarButton);

    
  });
});
