import React from "react";
import { render, } from "@testing-library/react-native";
import CardIdoso from "../components/CardIdoso";
import { ETipoSanguineo } from "../interfaces/idoso.interface";
import { EMetricas } from "../interfaces/metricas.interface";
import CardMetrica from "../components/CardMetrica";

const mockItem = {
    id: 1, // Adicione um valor adequado
  idIdoso: 123, // Adicione a propriedade idIdoso
  nome: 'João Silva',
  dataNascimento: '1950-01-01',
  idUsuario: 123,
  foto: 'url_da_foto.jpg',
  tipoSanguineo: ETipoSanguineo.A_POSITIVO,
  telefoneResponsavel: '123456789',
  descricao: 'Idoso com histórico de hipertensão',
  dataHora: new Date(),
  categoria: EMetricas.FREQ_CARDIACA,
  valor: 75,
 
 };
 

 jest.mock("expo-router", () => ({
    router: {
      push: jest.fn(),
      replace: jest.fn(),
    },
  }));
describe('CardIdoso Component', () => {
    it('renderiza sem erros', () => {
        render(<CardMetrica item={mockItem} />);
      });
  it('exibe as unidades corretas', () => {
    const { getByText } = render(<CardMetrica item={mockItem} />);
    
    if (mockItem.categoria === EMetricas.FREQ_CARDIACA) {
      expect(getByText('bpm')).toBeTruthy();
    } else {
      expect(() => getByText('bpm')).toThrow();
    }
  });

});