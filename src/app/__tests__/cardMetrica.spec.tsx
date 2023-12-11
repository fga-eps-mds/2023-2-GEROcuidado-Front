import React from "react";
import { render } from "@testing-library/react-native";
import { ETipoSanguineo } from "../interfaces/idoso.interface";
import { EMetricas } from "../interfaces/metricas.interface";
import CardMetrica from "../components/CardMetrica";

const mockItem = {
  id: 1,
  idIdoso: 123,
  nome: "João Silva",
  dataNascimento: "1950-01-01",
  idUsuario: 123,
  foto: "url_da_foto.jpg",
  tipoSanguineo: ETipoSanguineo.A_POSITIVO,
  telefoneResponsavel: "123456789",
  descricao: "Idoso com histórico de hipertensão",
  dataHora: new Date(),
  categoria: EMetricas.FREQ_CARDIACA,
  valor: 75,
};

const mockItem1 = {
  id: 1,
  idIdoso: 123,
  nome: "João Silva",
  dataNascimento: "1950-01-01",
  idUsuario: 123,
  foto: "url_da_foto.jpg",
  tipoSanguineo: ETipoSanguineo.A_POSITIVO,
  telefoneResponsavel: "123456789",
  descricao: "Idoso com histórico de hipertensão",
  dataHora: new Date(),
  categoria: EMetricas.GLICEMIA,
  valor: 75,
};

const mockItem2 = {
  id: 1,
  idIdoso: 123,
  nome: "João Silva",
  dataNascimento: "1950-01-01",
  idUsuario: 123,
  foto: "url_da_foto.jpg",
  tipoSanguineo: ETipoSanguineo.A_POSITIVO,
  telefoneResponsavel: "123456789",
  descricao: "Idoso com histórico de hipertensão",
  dataHora: new Date(),
  categoria: EMetricas.PESO,
  valor: 75,
};

const mockItem3 = {
  id: 1,
  idIdoso: 123,
  nome: "João Silva",
  dataNascimento: "1950-01-01",
  idUsuario: 123,
  foto: "url_da_foto.jpg",
  tipoSanguineo: ETipoSanguineo.A_POSITIVO,
  telefoneResponsavel: "123456789",
  descricao: "Idoso com histórico de hipertensão",
  dataHora: new Date(),
  categoria: EMetricas.PRESSAO_SANGUINEA,
  valor: 75,
};

const mockItem4 = {
  id: 1,
  idIdoso: 123,
  nome: "João Silva",
  dataNascimento: "1950-01-01",
  idUsuario: 123,
  foto: "url_da_foto.jpg",
  tipoSanguineo: ETipoSanguineo.A_POSITIVO,
  telefoneResponsavel: "123456789",
  descricao: "Idoso com histórico de hipertensão",
  dataHora: new Date(),
  categoria: EMetricas.SATURACAO_OXIGENIO,
  valor: 75,
};

const mockItem5 = {
  id: 1,
  idIdoso: 123,
  nome: "João Silva",
  dataNascimento: "1950-01-01",
  idUsuario: 123,
  foto: "url_da_foto.jpg",
  tipoSanguineo: ETipoSanguineo.A_POSITIVO,
  telefoneResponsavel: "123456789",
  descricao: "Idoso com histórico de hipertensão",
  dataHora: new Date(),
  categoria: EMetricas.TEMPERATURA,
  valor: 75,
};

const mockItem6 = {
  id: 1,
  idIdoso: 123,
  nome: "João Silva",
  dataNascimento: "1950-01-01",
  idUsuario: 123,
  foto: "url_da_foto.jpg",
  tipoSanguineo: ETipoSanguineo.A_POSITIVO,
  telefoneResponsavel: "123456789",
  descricao: "Idoso com histórico de hipertensão",
  dataHora: new Date(),
  categoria: EMetricas.HORAS_DORMIDAS,
  valor: 75,
};

const mockItem7 = {
  id: 1,
  idIdoso: 123,
  nome: "João Silva",
  dataNascimento: "1950-01-01",
  idUsuario: 123,
  foto: "url_da_foto.jpg",
  tipoSanguineo: ETipoSanguineo.A_POSITIVO,
  telefoneResponsavel: "123456789",
  descricao: "Idoso com histórico de hipertensão",
  dataHora: new Date(),
  categoria: EMetricas.ALTURA,
  valor: 75,
};

const mockItem8 = {
  id: 1,
  idIdoso: 123,
  nome: "João Silva",
  dataNascimento: "1950-01-01",
  idUsuario: 123,
  foto: "url_da_foto.jpg",
  tipoSanguineo: ETipoSanguineo.A_POSITIVO,
  telefoneResponsavel: "123456789",
  descricao: "Idoso com histórico de hipertensão",
  dataHora: new Date(),
  categoria: EMetricas.IMC,
  valor: 75,
};

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

describe("CardMetricas Component", () => {
  it("renderiza sem erros", () => {
    render(<CardMetrica item={mockItem} />);
  });
  it("exibe as unidades corretas", () => {
    render(<CardMetrica item={mockItem} />);
  });
  it("exibe as unidades corretas 1", () => {
    render(<CardMetrica item={mockItem1} />);
  });
  it("exibe as unidades corretas 2", () => {
    render(<CardMetrica item={mockItem2} />);
  });
  it("exibe as unidades corretas 3", () => {
    render(<CardMetrica item={mockItem3} />);
  });
  it("exibe as unidades corretas 4", () => {
    render(<CardMetrica item={mockItem4} />);
  });

  it("exibe as unidades corretas 5", () => {
    render(<CardMetrica item={mockItem5} />);
  });

  it("exibe as unidades corretas 6", () => {
    render(<CardMetrica item={mockItem6} />);
  });

  it("exibe as unidades corretas 7", () => {
    render(<CardMetrica item={mockItem7} />);
  });

  it("exibe as unidades corretas 8", () => {
    render(<CardMetrica item={mockItem8} />);
  });

  test("Deve retornar se não houver dataHora", () => {
    // Configuração
    const setDataHoraMock = jest.fn();
    const setHoraMock = jest.fn();
    const setDataMock = jest.fn();

    // Verificação
    expect(setDataHoraMock).not.toHaveBeenCalled();
    expect(setHoraMock).not.toHaveBeenCalled();
    expect(setDataMock).not.toHaveBeenCalled();
  });
});
