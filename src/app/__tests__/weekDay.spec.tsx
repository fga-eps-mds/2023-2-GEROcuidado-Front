import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WeekDays from "../components/weekDay";

describe("WeekDays component", () => {
  it("should toggle the background color and text color on press", () => {
    const { getByText, getByTestId } = render(<WeekDays day="Monday" />);

    const dayButton = getByTestId("day-button");

    // Verifica se as cores iniciais estão corretas
    expect(dayButton).toHaveStyle({ backgroundColor: "White" });
    expect(getByText("Monday")).toHaveStyle({ color: "black" });

    // Simula o pressionamento do botão
    fireEvent.press(dayButton);

    // Verifica se as cores foram alteradas após o press
    expect(dayButton).toHaveStyle({ backgroundColor: "#2CCDB5" });
    expect(getByText("Monday")).toHaveStyle({ color: "white" });
  });
});