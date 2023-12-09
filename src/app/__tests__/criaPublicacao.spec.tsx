import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CriaPublicacao from "../private/pages/criaPublicacao";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

describe("CriaPublicacao", () => {
  test("The component rendered", () => {
    // Mock the response for AsyncStorage.getItem
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "usuario") {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === "token") {
        return Promise.resolve("mockedToken");
      }
      return Promise.resolve(null);
    });

    render(<CriaPublicacao />);
  });

  it("Publicar com titulo muito grande", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CriaPublicacao />,
    );

    const titulo = getByPlaceholderText("Título");
    const publicar = getByText("Publicar");

    act(() => {
      fireEvent.changeText(
        titulo,
        "Por que o livro de matemática está sempre triste? Porque tem muitos problemas! hahahahahahhahahahahhahahaahahahahahahhahahahahahahahahahahahhahaahahahahahahahahah",
      );
      fireEvent.press(publicar);
    });
    const erroTitulo = getByText("Deve ter no máximo 100 caracteres!");

    expect(erroTitulo).toBeTruthy();
  });
  it("Publicar com descrição muito grande", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CriaPublicacao />,
    );

    const titulo = getByPlaceholderText("Descrição");
    const publicar = getByText("Publicar");

    act(() => {
      fireEvent.changeText(
        titulo,
        "O boto é uma figura lendária da mitologia amazônica, um ser encantado que se transforma em um belo homem durante a noite. Conta-se que, nas festas locais, o boto seduz as jovens que dançam à beira dos rios. Disfarçado, ele usa um chapéu para esconder um orifício no alto da cabeça por onde expele água, revelando sua verdadeira identidade de boto.Diz a lenda que o boto engravidaria as moças, que retornariam às suas casas sem perceber a transformação. Ao nascer, a criança teria características de boto, como uma mancha na testa. A narrativa mistura mistério, encantamento e um toque de temor, destacando a exuberância e a imprevisibilidade da natureza amazônica. Além disso, o boto é retratado como um ser mágico, capaz de encantar as pessoas com sua música e dança. A lenda serve como um alerta para a cautela nas festividades noturnas à beira dos rios, destacando a importância de se proteger contra as forças sobrenaturais que habitam as águas da Amazônia. O mito do boto é uma expressão rica da cultura amazônica, transmitida de geração em geração, enraizada na conexão entre o povo e a natureza mística que os rodeia.",
      );
      fireEvent.press(publicar);
    });
    const erroTitulo = getByText("Deve ter no máximo 500 caracteres!");

    expect(erroTitulo).toBeTruthy();
  });
});
