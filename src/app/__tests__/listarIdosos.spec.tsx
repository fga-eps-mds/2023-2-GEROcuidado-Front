// listarIdosos.spec.tsx
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import ListarIdosos from "../private/pages/listarIdosos";
import { getAllIdoso } from "../services/idoso.service";
import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';


// Mockando o módulo dos serviços para substituir as implementações
jest.mock("../services/idoso.service");

describe("ListarIdosos", () => {
  it("deve chamar a função de getAllIdoso ao montar o componente", async () => {
    // Simula uma resposta fictícia da API
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'usuario') {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === 'token') {
        return Promise.resolve('mockedToken');
      }
      return Promise.resolve(null);
    });
    (getAllIdoso as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(<ListarIdosos />);

    // Aguarda a resolução da promessa
    await waitFor(() => expect(getAllIdoso).toHaveBeenCalled());
  });

  it("deve exibir a lista de idosos após a conclusão da chamada da API", async () => {
    // Simula uma resposta fictícia da API
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'usuario') {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === 'token') {
        return Promise.resolve('mockedToken');
      }
      return Promise.resolve(null);
    });
    (getAllIdoso as jest.Mock).mockResolvedValueOnce({ data: [{ id: 1, nome: "Idoso 1" }, { id: 2, nome: "Idoso 2" }] });

    const { getByText } = render(<ListarIdosos />);

    // Aguarda a resolução da promessa
    await waitFor(() => expect(getAllIdoso).toHaveBeenCalled());

    // Verifica se os elementos esperados são renderizados
    expect(getByText("Idoso 1")).toBeTruthy();
    expect(getByText("Idoso 2")).toBeTruthy();
  });
  /*it("deve exibir uma mensagem de erro se a chamada da API falhar", async () => {
    const errorMessage = "Erro ao buscar idosos";
  
    // Simula um erro na chamada da API
    (getAllIdoso as jest.Mock).mockRejectedValueOnce({ message: errorMessage });
  
    const { queryByText } = render(<ListarIdosos />);
  
    // Aguarda a resolução da promessa
    await waitFor(() => expect(getAllIdoso).toHaveBeenCalled(), { timeout: 5000 });
  
    // Verifica se a mensagem de erro não está presente
    expect(queryByText(errorMessage)).toBeNull();
  });*/
});
