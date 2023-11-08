/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Cadastro from "../public/cadastro";

jest.mock("../services/user.service", () => ({
  postUser: jest.fn(),
}));

describe("Cadastro Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza corretamente", async () => {
    await waitFor(() => render(<Cadastro />));
  });

  it("deve chamar a função 'postUser' quando não há erros nos campos", async () => {
    require("../services/user.service").postUser.mockResolvedValue({
      message: "Sucesso!",
    });

    await waitFor(() => {
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

      expect(require("../services/user.service").postUser).toHaveBeenCalledWith(
        {
          nome: "Seu Nome",
          email: "seuemail@gmail.com",
          senha: "suasenha",
          foto: "",
        },
      );
    });
  });

  it("não deve chamar a função 'postUser' quando há específicos erros nos campos", async () => {
    await waitFor(() => {
      const { getByPlaceholderText, getByText } = render(<Cadastro />);
      const cadastrarButton = getByText("Cadastrar");
      const nomeInput = getByPlaceholderText("Nome completo");
      const emailInput = getByPlaceholderText("Email");
      const confirmEmailInput = getByPlaceholderText("Confirme seu Email");
      const passwordInput = getByPlaceholderText("Senha");
      const confirmPasswordInput = getByPlaceholderText("Confirme sua senha");

      fireEvent.changeText(nomeInput, "a");
      fireEvent.changeText(emailInput, "seuemail");
      fireEvent.changeText(confirmEmailInput, "seuemail@gmail.com");
      fireEvent.changeText(passwordInput, "1");
      fireEvent.changeText(confirmPasswordInput, "2");

      fireEvent.press(cadastrarButton);

      expect(
        require("../services/user.service").postUser,
      ).not.toHaveBeenCalledWith({
        nome: "Seu Nome",
        email: "seuemail@gmail.com",
        senha: "suasenha",
        foto: "",
      });
    });
  });

  it("não deve chamar a função 'postUser' quando há erros nos campos", async () => {
    await waitFor(() => {
      const { getByText } = render(<Cadastro />);
      const cadastrarButton = getByText("Cadastrar");

      fireEvent.press(cadastrarButton);

      expect(
        require("../services/user.service").postUser,
      ).not.toHaveBeenCalledWith({
        nome: "Seu Nome",
        email: "seuemail@gmail.com",
        senha: "suasenha",
        foto: "",
      });
    });
  });

  it("não deve chamar a função 'postUser' quando há erros específicos de nome nos campos", async () => {
    await waitFor(() => {
      const { getByText, getByPlaceholderText } = render(<Cadastro />);
      const cadastrarButton = getByText("Cadastrar");
      const nomeInput = getByPlaceholderText("Nome completo");
      fireEvent.changeText(
        nomeInput,
        "nome grande nome grandenome grandenome grandenome grandenome grandenome grande",
      );

      fireEvent.press(cadastrarButton);

      expect(
        require("../services/user.service").postUser,
      ).not.toHaveBeenCalled();
    });
  });

  it("deve exibir o Toast de erro", async () => {
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

  it("deve alterar o estado do escondeSenha", async () => {
    await waitFor(() => {
      const { getByTestId } = render(<Cadastro />);
      const escondeSenha = getByTestId("escondeSenhaIcon");
      const confirmaEscondeSenha = getByTestId("escondeConfirmaSenhaIcon");

      fireEvent.press(escondeSenha);
      fireEvent.press(confirmaEscondeSenha);

      expect(escondeSenha).toBeDefined();
      expect(confirmaEscondeSenha).toBeDefined();
    });
  });
});
