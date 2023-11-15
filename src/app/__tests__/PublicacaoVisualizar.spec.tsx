import React from "react";
import { render, screen } from "@testing-library/react-native";
import PublicacaoVisualizar from "../components/PublicacaoVisualizar";

const mockItem = {
  usuario: {
    id: 1,
    nome: "Nome do Usuário",
    foto: "data:image/png;base64,base64-encoded-image-data",
  },
  idUsuarioReporte: [],
  titulo: "Título da publicação",
  descricao: "Descrição da publicação",
  categoria: "Categoria da publicação",
  dataHora: "2023-11-04T12:00:00Z",
};

describe("PublicacaoVisualizar", () => {
  it("não deve renderizar a imagem do usuário quando não há foto", () => {
    const itemSemFoto = {
      ...mockItem,
      usuario: { nome: "Nome do Usuário", foto: null },
    };
    render(<PublicacaoVisualizar item={itemSemFoto} />);
    const imageElement = screen.queryByRole("img");
    expect(imageElement).toBeNull();
  });

  it("deve formatar a data corretamente", () => {
    render(<PublicacaoVisualizar item={mockItem} />);
    const dateElement = screen.getByText("04/11/2023");
    expect(dateElement).toBeTruthy();
  });
});
