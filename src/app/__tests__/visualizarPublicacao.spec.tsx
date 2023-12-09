import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import VisualizarPublicacao from "../private/pages/visualizarPublicacao";

describe("Visualizar publicacao", () => {
  it("Rendeziza sem quebrar", () => {
    render(<VisualizarPublicacao />);
  });
  it("displays actions correctly for admin", () => {
    const { getByText } = render(<VisualizarPublicacao />, {
      initialState: {
        usuario: {
          id: 1,
          admin: true,
        },
      },
    });

    expect(getByText("Apagar")).toBeTruthy();
  });

  it('Testa apertar o botao de apagar', () => {
    const { getByText } = render(<VisualizarPublicacao />);
    fireEvent.press(getByText('Apagar'));

    // OBS verificar se a lógica de deleção está funcionando corretamente
    // OBS fazer teste para verificar se o modal de confirmação é exibido após pressionar o botão de deletar.
  });
  

});
