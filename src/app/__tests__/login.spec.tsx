import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../public/login";
import "@react-native-async-storage/async-storage/jest/async-storage-mock";

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

    
    fireEvent.changeText(emailInput, "seuemail@gmail.com");
    fireEvent.changeText(passwordInput, "suasenha");
    fireEvent.press(loginButton);

  });
});
