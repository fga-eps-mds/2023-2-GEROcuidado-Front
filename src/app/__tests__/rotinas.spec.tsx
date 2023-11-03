import React from "react";
import { render } from "@testing-library/react-native";
import Rotinas from "../private/tabs/rotinas";

describe("Rotinas", () => {
  it("renderiza corretamente", () => {
    const { toJSON } = render(<Rotinas />);
    expect(toJSON());
  });
});
