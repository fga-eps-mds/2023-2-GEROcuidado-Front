import React from "react";
import { render } from "@testing-library/react-native";
import EditarRotina from "../private/pages/editarRotina";


// Mock the useLocalSearchParams hook
jest.mock("expo-router", () => ({
    ...jest.requireActual("expo-router"),
    useLocalSearchParams: jest.fn(),
  }));
  
  describe("Testes editar rotina", () => {
    it("renders without crashing", () => {
      // Set up mock values for useLocalSearchParams
      const mockParams = {
        titulo: "MockedTitulo",
        descricao: "MockedDescricao",
        categoria: "MockedCategoria",
        dias: "1,2,3",
        dataHora: "2023-01-01T12:00:00", // Adjust with a valid date and time
      };
  
      jest.spyOn(require("expo-router"), "useLocalSearchParams").mockReturnValue(mockParams);
  
      // Render the component
      render(<EditarRotina />);
    });
  });