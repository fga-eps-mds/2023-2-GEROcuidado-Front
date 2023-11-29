import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import Rotina from "../private/pages/cadastrarRotina";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CadastrarRotina from "../private/pages/cadastrarRotina";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

describe("Cadastrar Rotina component", () => {
      it("renderiza corretamente", async () => {
        (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
          if (key === "idoso") {
            return Promise.resolve(JSON.stringify({ id: 1 }));
          } else if (key === "token") {
            return Promise.resolve("mockedToken");
          }
          return Promise.resolve(null);
        });
        await waitFor(() => render(<Rotina />));
      });

      it("titulo com caracteres em excesso", () => {
        (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
          if (key === "idoso") {
            return Promise.resolve(JSON.stringify({ id: 1 }));
          } else if (key === "token") {
            return Promise.resolve("mockedToken");
          }
          return Promise.resolve(null);
        });

        const { getByText, getByPlaceholderText } = render(<CadastrarRotina />);
        const titulo = getByPlaceholderText("Adicionar título");
        const salvar = getByText("Salvar");
        
        act(() => {
          fireEvent.changeText(titulo,"Comer comidaaaaaaaaaaaaaaaaaaaaaa delicosaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          fireEvent.press(salvar);
        });

        const erroTitulo = getByText("O título deve ter no máximo 100 caracteres.");

        expect(erroTitulo).toBeDefined;

      });
});
