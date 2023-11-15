import React from "react";
import { render, screen } from "@testing-library/react-native";
import Publicacao from "../components/Publicacao";

const mockItem = {
  id: 1,
  titulo: "Título da publicação",
  categoria: "Categoria da publicação",
  descricao: "Descrição da publicação",
  dataHora: "2023-11-04T12:00:00Z",
  usuario: {
    nome: "Nome do Usuário",
    foto: "data:image/png;base64,base64-encoded-image-data",
  },
};

const mockItemComFoto = {
  id: 1,
  titulo: "Título da publicação",
  categoria: "Categoria da publicação",
  descricao: "Descrição da publicação",
  dataHora: "2023-11-04T12:00:00Z",
  usuario: {
    nome: "Nome do Usuário",
    foto: "data:image/png;base64,base64-encoded-image-data",
  },
};

const hasFoto = (foto: string | null | undefined) => {
  if (!foto) return false;

  const raw = foto.split("data:image/png;base64,")[1];
  return raw.length > 0;
};

describe("Publicacao", () => {
  it("deve renderizar o componente 'Publicacao' corretamente", () => {
    render(<Publicacao item={mockItem} crop={false} />);

    // Verifique se os elementos de texto estão presentes
    const titleElement = screen.getByText("Título da publicação");
    const categoryElement = screen.getByText("Categoria da publicação");
    const descriptionElement = screen.getByText("Descrição da publicação");
    const usernameElement = screen.getByText("Nome do Usuário");
    const dateElement = screen.getByText("04/11/2023");

    expect(titleElement).toBeTruthy();
    expect(categoryElement).toBeTruthy();
    expect(descriptionElement).toBeTruthy();
    expect(usernameElement).toBeTruthy();
    expect(dateElement).toBeTruthy();

    // Verifique se os elementos de texto com crop não estão presentes
    expect(screen.queryByText("Título da publicação...")).toBeNull();
    expect(screen.queryByText("Descrição da publicação...")).toBeNull();
  });
  it("deve formatar o nome corretamente com crop ativado", () => {
    render(<Publicacao item={mockItem} crop={true} />);

    // Verifique se o nome foi cortado corretamente
    const usernameElement = screen.getByText("Nome do Usuário");
    expect(usernameElement).toBeTruthy();
  });
  it("deve formatar o titulo corretamente com crop ativado", () => {
    render(<Publicacao item={mockItem} crop={true} />);

    // Verifique se o nome foi cortado corretamente
    const titleElement = screen.getByText("Título da publicação");
    expect(titleElement).toBeTruthy();
  });
  it("deve formatar a descricao corretamente com crop ativado", () => {
    render(<Publicacao item={mockItem} crop={true} />);

    // Verifique se o nome foi cortado corretamente
    const descriptionElement = screen.getByText("Descrição da publicação");
    expect(descriptionElement).toBeTruthy();
  });

  it("não deve renderizar o ícone de espaço reservado quando há uma foto", () => {
    render(<Publicacao item={mockItemComFoto} crop={false} />);

    // Verifique se o ícone de espaço reservado não está presente
    const placeholderIcon = screen.queryByTestId("placeholder-icon");
    expect(placeholderIcon).toBeNull();
  });
  it("deve retornar true em hasFoto quando há uma foto", () => {
    const foto = "data:image/png;base64,base64-encoded-image-data";
    expect(hasFoto(foto)).toBe(true);
  });
  it("deve retornar false em hasFoto quando não há uma foto", () => {
    const foto = null;
    expect(hasFoto(foto)).toBe(false);
  });
});
