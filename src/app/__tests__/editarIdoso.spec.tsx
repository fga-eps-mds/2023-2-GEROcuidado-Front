import "@testing-library/jest-native/extend-expect";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import EditarIdoso from "../private/pages/editarIdoso";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

describe("EditarIdoso", () => {
  test("Renderiza corretamente com usuario", () => {
    // Mock the response for AsyncStorage.getItem
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "usuario") {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === "token") {
        return Promise.resolve("mockedToken");
      }
      return Promise.resolve(null);
    });

    render(<EditarIdoso />);
  });

  test("Exibe mensagem de erro ao tentar salvar com nome vazio", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <EditarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(nameInput, "");

    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "23102001");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "55111111111");

    const saveButton = getByText("Salvar");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(getByText("Campo obrigatório!")).toBeTruthy();
    });

    // Certifique-se de que a mensagem de erro específica não está presente quando não deve ser exibida
    await waitFor(() => {
      expect(
        queryByText("O nome completo deve ter pelo menos 5 caractéres."),
      ).toBeNull();
      expect(
        queryByText("O nome completo deve ter no máximo 60 caractéres."),
      ).toBeNull();
    });
  });
});

