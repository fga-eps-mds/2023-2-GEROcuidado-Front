import React from "react";
import { render } from "@testing-library/react-native";
import Forum from "../private/tabs/forum";

describe("Forum", () => {
  it("renderiza corretamente", () => {
    const { toJSON } = render(<Forum />);
    expect(toJSON());
  });
});
