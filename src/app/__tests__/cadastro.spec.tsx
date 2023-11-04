/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Cadastro from "../public/cadastro";

// Mock do serviço user.service
jest.mock("../services/user.service", () => ({
  postUser: jest.fn(),
}));

describe("Cadastro Component", () => {
  // Função de limpar todos os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  /*it("deve exibir erro em campos obrigatórios vazios", () => {
    const { getByPlaceholderText, getByText } = render(<Cadastro />);
    const cadastrarButton = getByText("Cadastrar");
  
    fireEvent.press(cadastrarButton);
  
    // Assegure-se de que os erros para campos individuais são exibidos
    expect(getByText("Campo obrigatório!")).toBeDefined(); // Para o campo nome
    expect(getByText("Campo Obrigatório!")).toBeDefined(); // Para o campo email
    // Adicione mais asserções para outros campos obrigatórios, se necessário
  });
  */

  it("deve chamar a função 'postUser' quando não há erros nos campos", () => {
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

    expect(require("../services/user.service").postUser).toHaveBeenCalledWith({
      nome: "Seu Nome",
      email: "seuemail@gmail.com",
      senha: "suasenha",
      foto: "",
    });
  });

  it("deve exibir o Toast de sucesso", () => {
    // Configurar o mock de postUser para simular uma resposta de sucesso
    require("../services/user.service").postUser.mockResolvedValue({
      message: "Sucesso!",
    });

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

    // Adicione asserções para verificar se o Toast de sucesso é exibido
  });

  it("deve exibir o Toast de erro", async () => {
    // Configurar o mock de postUser para simular uma resposta de erro
    require("../services/user.service").postUser.mockRejectedValue({
      message: "Erro!",
    });

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
    fireEvent.changeText(confirmPasswordInput, "senhaincorreta");

    fireEvent.press(cadastrarButton);

    // Adicione asserções para verificar se o Toast de erro é exibido
  });
  it("deve exibir erros quando o nome está em branco ou muito curto", () => {
    const { getByPlaceholderText, getByText } = render(<Cadastro />);
    const cadastrarButton = getByText("Cadastrar");

    fireEvent.press(cadastrarButton);

    expect(getByText("Campo obrigatório!")).toBeDefined(); // Para o campo nome

    fireEvent.changeText(getByPlaceholderText("Nome completo"), "Jo");
    fireEvent.press(cadastrarButton);

    expect(
      getByText("O nome completo deve ter pelo menos 5 caractéres."),
    ).toBeDefined();
  });

  it("deve exibir erro quando o nome é muito longo", () => {
    const { getByPlaceholderText, getByText } = render(<Cadastro />);
    const nomeInput = getByPlaceholderText("Nome completo");
    const cadastrarButton = getByText("Cadastrar");

    fireEvent.changeText(
      nomeInput,
      "Um nome muito, muito longo que excede o limite de 60 caractéres",
    );
    fireEvent.press(cadastrarButton);

    expect(
      getByText("O nome completo deve ter no máximo 60 caractéres."),
    ).toBeDefined();
  });

  it("deve exibir erro quando os emails não coincidem", () => {
    const { getByPlaceholderText, getByText } = render(<Cadastro />);
    const emailInput = getByPlaceholderText("Email");
    const confirmEmailInput = getByPlaceholderText("Confirme seu Email");
    const cadastrarButton = getByText("Cadastrar");

    fireEvent.changeText(emailInput, "email@test.com");
    fireEvent.changeText(confirmEmailInput, "emaildiferente@test.com");
    fireEvent.press(cadastrarButton);

    expect(getByText("Os emails precisam ser iguais!")).toBeDefined();
  });

  it("deve exibir erro quando as senhas não coincidem", () => {
    const { getByPlaceholderText, getByText } = render(<Cadastro />);
    const passwordInput = getByPlaceholderText("Senha");
    const confirmPasswordInput = getByPlaceholderText("Confirme sua senha");
    const cadastrarButton = getByText("Cadastrar");

    fireEvent.changeText(passwordInput, "senhadiferente");
    fireEvent.changeText(confirmPasswordInput, "senhaincorreta");
    fireEvent.press(cadastrarButton);

    expect(getByText("As senhas precisam ser iguais")).toBeDefined();
  });
});
