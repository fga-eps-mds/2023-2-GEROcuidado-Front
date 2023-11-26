import React from "react";
import { render } from "@testing-library/react-native";
import EmConstrucao from "../components/EmConstrucao";

describe("EmConstrucao component", () => {
  test("renders correctly", () => {
    const { getByTestId, getByText } = render(<EmConstrucao />);

    // Check if the component is rendered
    const container = getByTestId("em-construcao-container");
    expect(container).toBeTruthy();

    // Check if the text is rendered
    const text = getByText("Página em construção!");
    expect(text).toBeTruthy();
  });
});
