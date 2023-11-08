import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Forum from "../private/tabs/forum";

describe("Forum", () => {
  it("renderiza corretamente", async () => {
    await waitFor(() => render(<Forum />));
  });
});
