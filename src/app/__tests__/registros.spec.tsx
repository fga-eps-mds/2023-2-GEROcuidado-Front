import React from "react";
import { render } from "@testing-library/react-native";
import Registros from "../private/tabs/registros";

describe("Registros", () => {
  it("renderiza corretamente", () => {
    const { toJSON } = render(<Registros />);
    expect(toJSON());
  });
});
