import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Registros from "../private/tabs/registros";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

describe("Registros", () => {
  it("renderiza corretamente", async () => {
    await waitFor(() => render(<Registros />));
  });

  it("renderiza corretamente com user id", async () => {
    AsyncStorage.setItem("usuario", JSON.stringify({ id: 1 }));

    await waitFor(() => render(<Registros />));
  });
});
