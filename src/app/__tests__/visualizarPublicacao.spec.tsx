import React from "react";
import { render } from "@testing-library/react-native";
import VisualizarPublicacao from "../private/pages/visualizarPublicacao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import exp from "constants";

describe("Visualizar publicacao", () => {

  it("Rendeziza sem quebrar", () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "usuario") {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === "token") {
        return Promise.resolve("mockedToken");
      }
      return Promise.resolve(null);
    });
    render(<VisualizarPublicacao />);
  });


  it("editar", () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "usuario") {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === "token") {
        return Promise.resolve("mockedToken");
      }
      return Promise.resolve(null);
    });

    const {getByText, getByPlaceholderText} = render(<VisualizarPublicacao />);

    const editar = getByPlaceholderText("Editar");
    expect(editar).toBeDefined;

  });

  // it("displays actions correctly for admin", () => {
  //   const { getByText } = render(<VisualizarPublicacao />, {
  //     initialState: {
  //       usuario: {
  //         id: 1,
  //         admin: true,
  //       },
  //     },
  //   });

  //   expect(getByText("Apagar")).toBeTruthy();
  // });
});
