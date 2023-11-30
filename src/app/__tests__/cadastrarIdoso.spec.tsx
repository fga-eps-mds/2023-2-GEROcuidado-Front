import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CadastrarIdoso from "../private/pages/cadastrarIdoso";
import AsyncStorage, {
  AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";

// Mock any dependencies if needed
// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

describe("CadastrarIdoso component", () => {
  test("renders correctly", () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "usuario") {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === "token") {
        return Promise.resolve("mockedToken");
      }
      return Promise.resolve(null);
    });

    const { getByText } = render(<CadastrarIdoso />);

    const cadastrarButton = getByText("Cadastrar");
    expect(cadastrarButton).toBeTruthy();
  });

  test("Exibe mensagem de erro ao tentar salvar com nome vazio", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <CadastrarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(nameInput, "bat");

    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "23102001");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "55111111111");

    const saveButton = getByText("Cadastrar");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(
        getByText("O nome completo deve ter pelo menos 5 caractéres."),
      ).toBeTruthy();
    });

    // Certifique-se de que a mensagem de erro específica não está presente quando não deve ser exibida
    await waitFor(() => {
      expect(queryByText("Campo obrigatório!")).toBeNull();
      expect(
        queryByText("O nome completo deve ter no máximo 60 caractéres."),
      ).toBeNull();
    });
  });

  test("Exibe menagem de erro ao tentar cadastrar idoso com uma quantidade de caracteres maior do que o permitido", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <CadastrarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(
      nameInput,
      "extrapolando a quantidade de erros para consguir ultrapassar o numero de 60 caracacteres",
    );

    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "23102001");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "55111111111");

    const saveButton = getByText("Cadastrar");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(
        queryByText("O nome completo deve ter no máximo 60 caractéres.")).toBeTruthy();
    });
  });
  
  test("Exibe menagem de erro ao tentar cadastrar uma data nao valida", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <CadastrarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(
      nameInput,
      "extrapolando a quantidade de erros para consguir ultrapassar o numero de 60 caracacteres",
    );

    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "10");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "55111111111");

    const saveButton = getByText("Cadastrar");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(
        queryByText("Data deve ser no formato dd/mm/yyyy!")).toBeTruthy();
    });
  });
  
  test("Exibe menagem de erro ao tentar cadastrar um telefone nao valida", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <CadastrarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(
      nameInput,
      "extrapolando a quantidade de erros para consguir ultrapassar o numero de 60 caracacteres",
    );

    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "30112023");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "55 61");

    const saveButton = getByText("Cadastrar");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(
        queryByText("Deve estar no formato (XX)XXXXX-XXXX")).toBeTruthy();
    });
  });
});
