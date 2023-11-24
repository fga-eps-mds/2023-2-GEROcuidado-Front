import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import Forum from "../private/tabs/forum";

describe("Forum", () => {
  it("renderiza corretamente", async () => {
    await waitFor(() => render(<Forum />));
  });

  it("should call handlePesquisar when searching", async () => {
    const { getByPlaceholderText } = render(<Forum />);

    // Wait for the component to be rendered
    await waitFor(() => {});

    // Simulate entering a search query
    fireEvent.changeText(getByPlaceholderText("Pesquise uma publicação"), "example search");

    // You might need to wait for some asynchronous actions to complete
    await waitFor(() => {});

    // Add assertions or additional tests as needed
  });
});
