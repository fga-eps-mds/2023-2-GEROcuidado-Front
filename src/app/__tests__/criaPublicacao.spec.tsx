import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CriaPublicacao from "../private/pages/criaPublicacao";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

// describe("<CriaPublicacao />", () => {
//   it("renders without crashing", () => {
//     render(<CriaPublicacao />);
//   });
// });

test('lidar com titulo com caracteres em excesso', () => {
  (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
    if (key === "usuario") {
      return Promise.resolve(JSON.stringify({ id: 1 }));
    } else if (key === "token") {
      return Promise.resolve("mockedToken");
    }
    return Promise.resolve(null);
  });
  
  const { getByText, getByPlaceholderText } = render(<CriaPublicacao />);
  const titulo = getByPlaceholderText("Título");
  const publicarButton = getByText("Publicar");

  act(() => {
    fireEvent.changeText(titulo,"Em uma cidade movimentada, as luzes da noite pintam um espetáculo urbano. Carros traçam caminhos, pessoas dançam na rua, e a cidade nunca dorme. ");
    fireEvent.press(publicarButton);
  });

    const erroTitulo = getByText("Deve ter no máximo 100 caracteres!");

    expect(erroTitulo).toBeDefined();

  });

  test('lidar com descricao com caracteres em excesso', () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "usuario") {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === "token") {
        return Promise.resolve("mockedToken");
      }
      return Promise.resolve(null);
    });
    
    const { getByText, getByPlaceholderText } = render(<CriaPublicacao />);
    const descricao = getByPlaceholderText("Descrição");
    const titulo = getByPlaceholderText("Título");
    const publicarButton = getByText("Publicar");
  
    act(() => {
      fireEvent.changeText(descricao,"Uma gota de chuva dança na folha de uma árvore, enquanto o sol se despede no horizonte. Crianças riem, pássaros entoam melodias e o aroma de flores enche o ar. Num café, histórias se entrelaçam entre xícaras de café fumegante. Carros traçam linhas na estrada, guiando-se pela sinfonia do tráfego. No canto de uma biblioteca, páginas de livros sussurram segredos do passado. Um artista na praça pinta a vida em telas coloridas, capturando momentos efêmeros. No silêncio da noite, estrelas cintilam, revelando um cosmos vasto e misterioso. Em algum lugar, o som suave do mar acalma mentes inquietas. No caos do quotidiano, a vida tece sua tapeçaria, entrelaçando experiências únicas. E assim, o mundo gira, ecoando uma sinfonia interminável de histórias, cada uma com sua própria magia.");
      fireEvent.changeText(titulo,"Em uma cidade movimentada, as luzes da noite pintam um espetáculo urbano. Carros traçam caminhos, pessoas dançam na rua, e a cidade nunca dorme. ");
      fireEvent.press(publicarButton);
    });
  
      const erroDescricao = getByText("Deve ter no máximo 500 caracteres!");
  
      expect(erroDescricao).toBeDefined();
  
    });