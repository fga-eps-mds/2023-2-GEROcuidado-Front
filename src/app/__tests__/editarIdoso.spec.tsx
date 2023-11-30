import "@testing-library/jest-native/extend-expect";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react-native";
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
      expect(screen.getByText("Campo obrigatório!")).toBeTruthy();
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


  test("Não exibe mensagem de erro ao salvar com nome válido", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <EditarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(nameInput, "batata");

    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "23102001");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "55111111111");
    const saveButton = getByText("Salvar");
    fireEvent.press(saveButton);
    
    await waitFor(() => {
      expect(queryByText("Campo obrigatório!")).toBeNull();
      expect(
        queryByText("O nome completo deve ter pelo menos 5 caractéres."),
      ).toBeNull();
      expect(
        queryByText("O nome completo deve ter no máximo 60 caractéres."),
      ).toBeNull();
    });
  });

  test("Exibe mensagem de erro ao tentar salvar com curto", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <EditarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(nameInput, "oi");

    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "23102001");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "55111111111");

    const saveButton = getByText("Salvar");
    fireEvent.press(saveButton);
    await waitFor(() => {
      expect(screen.getByText("O nome completo deve ter pelo menos 5 caractéres.")).toBeDefined();
    });
    // Certifique-se de que a mensagem de erro específica não está presente quando não deve ser exibida
    await waitFor(() => {
      expect(
        queryByText("Campo obrigatório!"),
      ).toBeNull();
      expect(
        queryByText("O nome completo deve ter no máximo 60 caractéres."),
      ).toBeNull();
    });
  });

  test("Exibe mensagem de erro ao tentar salvar com nome muito longo", async () => {
    const { getByText, getByPlaceholderText, findByText } = render(
      <EditarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(
      nameInput,
      "Lorem Ipsum é apenas um texto fictício da indústria de impressão e composição tipográfica.",
    );

    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "23102001");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "55111111111");

    const saveButton = getByText("Salvar");
    fireEvent.press(saveButton);

    await act(async () => {
      const errorMessage = await findByText(
        "O nome completo deve ter no máximo 60 caractéres.",
      );
      expect(errorMessage).toBeTruthy();
    });
  });
});

