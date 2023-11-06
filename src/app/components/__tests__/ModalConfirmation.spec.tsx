import { fireEvent, render } from "@testing-library/react-native";

import ModalConfirmation from "../ModalConfirmation";
import React from "react";

describe("ModalConfirmation Component", () => {

  it('deve chamar a função de callback ao pressionar "Confirmar"', () => {
    const callbackFn = jest.fn();
    const { getByText } = render(
      <ModalConfirmation
        visible={true}
        callbackFn={callbackFn}
        closeModal={() => {}}
        message="Prosseguir com a exclusão da conta?"
      />
    );

    // Simule o pressionar do botão "Confirmar"
    const confirmButton = getByText("Confirmar");
    fireEvent.press(confirmButton);

    // Verifique se a função de callback foi chamada
    expect(callbackFn).toHaveBeenCalled();
  });

  it('deve chamar a função de fechamento do modal ao pressionar "Cancelar"', () => {
    const closeModal = jest.fn();
    const { getByText } = render(
      <ModalConfirmation
        visible={true}
        callbackFn={() => {}}
        closeModal={closeModal}
        message="Prosseguir com a exclusão da conta?"
      />
    );

    // Simule o pressionar do botão "Cancelar"
    const cancelButton = getByText("Cancelar");
    fireEvent.press(cancelButton);

    // Verifique se a função de fechamento do modal foi chamada
    expect(closeModal).toHaveBeenCalled();
  });

  it("não deve renderizar quando não visível", () => {
    const { queryByTestId } = render(
      <ModalConfirmation
        visible={false}
        callbackFn={() => {}}
        closeModal={() => {}}
        message="Prosseguir com a exclusão da conta?"
      />
    );

    // Verifique se o modal não está visível
    const modal = queryByTestId("modal");
    expect(modal).toBeNull();
  });
});
