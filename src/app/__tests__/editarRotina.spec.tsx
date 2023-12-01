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

    it("Rotina sem titulo", () => {
      const mockParams = {
        titulo: "",
        descricao: "MockedDescricao",
        categoria: "MockedCategoria",
        dias: "1,2,3",
        dataHora: "2023-01-01T12:00:00", 
      };
      jest.spyOn(require("expo-router"), "useLocalSearchParams").mockReturnValue(mockParams);
      render(<EditarRotina />);
    });

    it("Rotina com titulo muito grande e data errada", () => {
      const mockParams = {
        titulo: "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        descricao: "MockedDescricao012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
        categoria: "",
        dias: "1,2,3",
        dataHora: "21023-01-01T12:000:000", 
      };
      jest.spyOn(require("expo-router"), "useLocalSearchParams").mockReturnValue(mockParams);
      render(<EditarRotina />);
    });

  });