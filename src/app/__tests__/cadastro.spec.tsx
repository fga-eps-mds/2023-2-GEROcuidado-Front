import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Cadastro from "../public/cadastro";

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

    fireEvent.changeText(nomeInput, "Seu Nome");
    fireEvent.changeText(emailInput, "seuemail@gmail.com");
    fireEvent.changeText(confirmEmailInput, "seuemail@gmail.com");
    fireEvent.changeText(passwordInput, "suasenha");
    fireEvent.changeText(confirmPasswordInput, "suasenha");

    fireEvent.press(cadastrarButton);
  });

  it("deve exibir erro em campos obrigatórios vazios", () => {
    const { getByText } = render(<Cadastro />);
    const cadastrarButton = getByText("Cadastrar");

    fireEvent.press(cadastrarButton);

    // Adicione aqui as asserções para verificar se os erros são exibidos corretamente
  });

  it("deve chamar a função 'cadastrar' quando não há erros nos campos", () => {
    const { getByPlaceholderText, getByText } = render(<Cadastro />);
    const nomeInput = getByPlaceholderText("Nome completo");
    const emailInput = getByPlaceholderText("Email");
    const confirmEmailInput = getByPlaceholderText("Confirme seu Email");
    const passwordInput = getByPlaceholderText("Senha");
    const confirmPasswordInput = getByPlaceholderText("Confirme sua senha");
    const cadastrarButton = getByText("Cadastrar");

    fireEvent.changeText(nomeInput, "Seu Nome");
    fireEvent.changeText(emailInput, "seuemail@gmail.com");
    fireEvent.changeText(confirmEmailInput, "seuemail@gmail.com");
    fireEvent.changeText(passwordInput, "suasenha");
    fireEvent.changeText(confirmPasswordInput, "suasenha");

    fireEvent.press(cadastrarButton);

    // Adicione aqui as asserções para verificar se a função 'cadastrar' é chamada corretamente
  });

  it("deve exibir o Toast de sucesso", () => {
    // Adicione aqui as asserções para verificar se o Toast de sucesso é exibido
  });

  it("deve exibir o Toast de erro", () => {
    // Adicione aqui as asserções para verificar se o Toast de erro é exibido
  });
});
