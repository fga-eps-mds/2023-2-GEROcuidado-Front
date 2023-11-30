import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import Rotina from "../private/pages/cadastrarRotina";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CadastrarRotina from "../private/pages/cadastrarRotina";
import { ECategoriaRotina } from "../interfaces/rotina.interface";

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

      it("lidar com descricao com caracteres em excesso", () => {
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
        const dataRotina = getByPlaceholderText("Data da rotina");
        const horaRotina = getByPlaceholderText("Horário de início");
        const descricaoRotina = getByPlaceholderText("Descrição");
        
        act(() => {
          fireEvent.changeText(titulo,"Comer comida");
          fireEvent.changeText(dataRotina,"30/11/2023");
          fireEvent.changeText(horaRotina,"13:45");
   
          fireEvent.changeText(descricaoRotina,"comer é bomComer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer comer ");
          fireEvent.press(salvar);
        });

        const erroDescricao = getByText("A descrição deve ter no máximo 300 caracteres.");

        expect(erroDescricao).toBeDefined;

      });

      it("lidar com descricao com caracteres em excesso", () => {
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
        const dataRotina = getByPlaceholderText("Data da rotina");
        const horaRotina = getByPlaceholderText("Horário de início");
        const descricaoRotina = getByPlaceholderText("Descrição");
        
        act(() => {
          fireEvent.changeText(titulo,"Comer comida");
          fireEvent.changeText(dataRotina,"30/11/2023");
          fireEvent.changeText(horaRotina,"111:455");
          fireEvent.changeText(descricaoRotina,"comer");
          fireEvent.press(salvar);
        });
        
        const erroHora = getByText("Hora deve ser no formato hh:mm!");

        expect(erroHora).toBeDefined;

      });
      test("Não exibe mensagem de erro ao salvar sem selecionar categoria", async () => {
        const { getByText, getByPlaceholderText, queryByText } = render(
          <CadastrarRotina />,
        );
        const nameInput = getByPlaceholderText("Adicionar título");
        fireEvent.changeText(nameInput, "batata");
    
        const nameInput1 = getByPlaceholderText("Data da rotina");
        fireEvent.changeText(nameInput1, "");
    
        const nameInput2 = getByPlaceholderText("Horário de início");
        fireEvent.changeText(nameInput2, "1350");
              
        const saveButton = getByText("Salvar");
        fireEvent.press(saveButton);

        await waitFor(() => {
          expect(getByText("OCampo obrigatório")).toBeTruthy();
        });
      });
});
