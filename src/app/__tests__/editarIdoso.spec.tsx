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

  test("Exibe mensagem de erro ao tentar salvar numero de telefone errado", async () => {
    const { getByText, getByPlaceholderText, findByText } = render(
      <EditarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(nameInput, "batata");


    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "23102001");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "12345678");

    const saveButton = getByText("Salvar");
    fireEvent.press(saveButton);

    await act(async () => {
      const errorMessage = await findByText(
        "Deve estar no formato (XX)XXXXX-XXXX",
      );
      expect(errorMessage).toBeTruthy();
    });
  });


  /*
  test("Exibe mensagem de erro ao tentar salvar com nome muito curto", async () => {
    const { getByText, getByPlaceholderText, findByText } = render(
      <EditarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(nameInput, "batata");


    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "23102001");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "12345678");

    const saveButton = getByText("Salvar");
    fireEvent.press(saveButton);

    await act(async () => {
      const errorMessage = await findByText(
        "Deve estar no formato (XX)XXXXX-XXXX",
      );
      expect(errorMessage).toBeTruthy();
    });
  });


  test("Exibe mensagem de erro ao tentar salvar com data vazia", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <EditarIdoso />,
    );
    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(nameInput, "batata");

    const nameInput1 = getByPlaceholderText("Data de Nascimento");
    fireEvent.changeText(nameInput1, "");

    const nameInput2 = getByPlaceholderText("Telefone Responsável");
    fireEvent.changeText(nameInput2, "55111111111");

    const saveButton = getByText("Salvar");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(getByText("Campo obrigatório")).toBeTruthy();
    });

    // Certifique-se de que a mensagem de erro específica não está presente quando não deve ser exibida
    await waitFor(() => {
      expect(
        queryByText("Data deve ser no formato dd/mm/yyyy!"),
      ).toBeNull();
    });
  });

  
  test('validação de nome - comprimento mínimo', async () => {
    const { getByPlaceholderText, getByText } = render(<EditarIdoso />);
  
    // Encontrar o campo de nome e definir seu valor com menos de 5 caracteres
    const nomeInput = getByPlaceholderText('Nome');
    fireEvent.changeText(nomeInput, 'abc');
  
    // Encontrar o botão de salvar e clicar nele
    const salvarButton = getByText('Salvar');
    fireEvent.press(salvarButton);
  
    // Verificar se a mensagem de erro é exibida
    const errorMessage = getByText('O nome completo deve ter pelo menos 5 caractéres.');
    expect(errorMessage).toBeDefined();
  });
  
  test('validação de nome - comprimento máximo', async () => {
    const { getByPlaceholderText, getByText } = render(<EditarIdoso />);
  
    // Encontrar o campo de nome e definir seu valor com mais de 60 caracteres
    const nomeInput = getByPlaceholderText('Nome');
    fireEvent.changeText(nomeInput, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
  
    // Encontrar o botão de salvar e clicar nele
    const salvarButton = getByText('Salvar');
    fireEvent.press(salvarButton);
  
    // Verificar se a mensagem de erro é exibida
    const errorMessage = getByText('O nome completo deve ter no máximo 60 caractéres.');
    expect(errorMessage).toBeDefined();
  });*/
});

