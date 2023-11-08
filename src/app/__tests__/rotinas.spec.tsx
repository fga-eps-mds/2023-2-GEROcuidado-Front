import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Rotinas from "../private/tabs/rotinas";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

describe("Rotinas", () => {
  it("renderiza corretamente", async () => {
    await waitFor(() => render(<Rotinas />));
  });

  it("renderiza corretamente com user id", async () => {
    AsyncStorage.setItem("usuario", JSON.stringify({ id: 1 }));

    await waitFor(() => render(<Rotinas />));
  });
});
