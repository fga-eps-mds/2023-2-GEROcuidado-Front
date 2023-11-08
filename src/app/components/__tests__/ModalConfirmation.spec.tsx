import { fireEvent, render, waitFor } from "@testing-library/react-native";

import ModalConfirmation from "../ModalConfirmation";
import React from "react";

describe("ModalConfirmation Component", () => {
  it("renderiza corretamente", async () => {
    await waitFor(() => {
      const { getByTestId } = render(
        <ModalConfirmation
          visible={true}
          callbackFn={() => {}}
          closeModal={() => {}}
          message=""
          messageButton=""
        />,
      );

      const cancelarBtn = getByTestId("cancelarBtn");
      const callbackBtn = getByTestId("callbackBtn");

      fireEvent.press(cancelarBtn);
      fireEvent.press(callbackBtn);

      expect(callbackBtn).toBeDefined();
      expect(cancelarBtn).toBeDefined();
    });
  });
});
