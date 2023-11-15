import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ModalConfirmation from "../components/ModalConfirmation";

describe("ModalConfirmation", () => {
  it("deve renderizar corretamente quando visível", () => {
    const message = "Prosseguir com a exclusão da conta?"; // Mensagem esperada
    const { getByText } = render(
      <ModalConfirmation
        visible={true}
        callbackFn={() => {}}
        closeModal={() => {}}
        message={message} // Passa a mensagem como prop
        messageButton={"Teste"}
      />,
    );

    // Verifica se o texto da mensagem é exibido quando o modal está visível
    expect(getByText(message)).toBeTruthy();
  });

  it('deve chamar a função de fechamento do modal ao pressionar "Cancelar"', () => {
    const closeModal = jest.fn();
    const { getByText } = render(
      <ModalConfirmation
        visible={true}
        callbackFn={() => {}}
        closeModal={closeModal}
        message="Qualquer mensagem" // Você pode usar qualquer mensagem aqui
        messageButton={"Teste"}
      />,
    );

    // Simula o pressionar do botão "Cancelar"
    fireEvent.press(getByText("Cancelar"));

    // Verifica se a função de fechamento do modal foi chamada
    expect(closeModal).toHaveBeenCalled();
  });

  it("não deve renderizar quando não visível", () => {
    const { queryByText } = render(
      <ModalConfirmation
        visible={false}
        callbackFn={() => {}}
        closeModal={() => {}}
        message="Qualquer mensagem" // Você pode usar qualquer mensagem aqui
        messageButton={"Teste"}
      />,
    );

    // Verifica se o texto da mensagem não está presente quando o modal não está visível
    expect(queryByText("Qualquer mensagem")).toBeNull();
  });
});
