import "@react-native-async-storage/async-storage/jest/async-storage-mock";

import { fireEvent, render, waitFor } from "@testing-library/react-native";

import Login from "../public/login";
import React from "react";
import { router } from "expo-router";
// import JWT from "expo-jwt";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("expo-jwt", () => ({
  decode: () => ({ id: 1 }),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const userService = require("../services/user.service");
jest.mock("../services/user.service");

describe("Login Component", () => {
  it("renderiza corretamente", async () => {
    await waitFor(() => render(<Login />));
  });

  it("deve alterar o estado do escondeSenha", async () => {
    await waitFor(() => {
      const { getByTestId } = render(<Login />);
      const escondeSenha = getByTestId("escondeSenhaIcon");

      fireEvent.press(escondeSenha);

      expect(escondeSenha).toBeDefined();
    });
  });

  it("deve lidar com o login com falha", async () => {
    await waitFor(() => {
      const { getByPlaceholderText, getByText } = render(<Login />);
      const emailInput = getByPlaceholderText("Email");
      const passwordInput = getByPlaceholderText("Senha");
      const loginButton = getByText("Entrar");

      fireEvent.changeText(emailInput, "seuemail@gmail");
      fireEvent.changeText(passwordInput, "1");

      userService.loginUser.mockRejectedValue(new Error("Login falhou"));

      fireEvent.press(loginButton);

      expect(router.push).not.toHaveBeenCalled();
    });
  });

  it("deve lidar com o login com falha na requisicao", async () => {
    await waitFor(() => {
      const { getByPlaceholderText, getByText } = render(<Login />);
      const emailInput = getByPlaceholderText("Email");
      const passwordInput = getByPlaceholderText("Senha");
      const loginButton = getByText("Entrar");

      fireEvent.changeText(emailInput, "seuemail@gmail.com");
      fireEvent.changeText(passwordInput, "suasenha");

      userService.loginUser.mockRejectedValue({
        message: "erro",
      });

      userService.getUserById.mockResolvedValue({
        message: "sucesso",
        data: { id: 1 },
      });

      fireEvent.press(loginButton);

      expect(router.push).not.toHaveBeenCalled();
    });
  });

  it("deve lidar com o login com sucesso", async () => {
    await waitFor(() => {
      const { getByPlaceholderText, getByText } = render(<Login />);
      const emailInput = getByPlaceholderText("Email");
      const passwordInput = getByPlaceholderText("Senha");
      const loginButton = getByText("Entrar");

      fireEvent.changeText(emailInput, "seuemail@gmail.com");
      fireEvent.changeText(passwordInput, "suasenha");

      userService.loginUser.mockResolvedValue({
        message: "Login bem-sucedido",
        data: "token_de_acesso",
      });

      userService.getUserById.mockResolvedValue({
        message: "sucesso",
        data: { id: 1 },
      });

      fireEvent.press(loginButton);

      expect(router.push).toHaveBeenCalled();
    });
  });
});
