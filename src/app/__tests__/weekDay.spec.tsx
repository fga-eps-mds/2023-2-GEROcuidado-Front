import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WeekDays from "../components/weekDay";
import { EDiasSemana } from "../interfaces/rotina.interface";

describe("Testes para WeekDays", () => {
  it("deve renderizar corretamente", () => {
    const { getByText } = render(<WeekDays callbackFn={() => {}} />);
    expect(getByText("D")).toBeTruthy(); // Verifique se o dia 'D' está presente
  });

  it("deve chamar a função de callback corretamente ao pressionar um dia", () => {
    const mockCallbackFn = jest.fn();
    const { getByText } = render(<WeekDays callbackFn={mockCallbackFn} />);
    fireEvent.press(getByText("D"));
    expect(mockCallbackFn).toHaveBeenCalledWith([EDiasSemana.Domingo]);
  });

  test('handlePress funciona corretamente', () => {
  const mockCallbackFn = jest.fn();
  const { getByText } = render(<WeekDays dias={[1, 3, 5]} callbackFn={mockCallbackFn} />);

  const circle1 = getByText('D').parent; 
  expect(circle1).toBeDefined();

  fireEvent.press(circle1);

  expect(mockCallbackFn).toHaveBeenCalledWith(expect.arrayContaining([3, 5]));

  fireEvent.press(circle1);

  expect(mockCallbackFn).toHaveBeenCalledWith(expect.arrayContaining([3, 5, 1]));
});
});
