import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import CustomButton from "../components/CustomButton";

describe("CustomButton", () => {
  it("renderiza corretamente", () => {
    const { toJSON } = render(
      <CustomButton title="teste" callbackFn={jest.fn()} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it("Chama a função de callback quando pressionado", () => {
    const callbackFn = jest.fn();
    const { getByText } = render(
      <CustomButton title="Test" callbackFn={callbackFn} />,
    );
    const button = getByText("Test");
    fireEvent.press(button);
    expect(callbackFn).toHaveBeenCalled();
  });
});
