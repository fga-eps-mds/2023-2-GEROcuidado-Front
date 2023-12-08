import React from "react";
import { render, } from "@testing-library/react-native";
import CardIdoso from "../components/CardIdoso";
import { ETipoSanguineo } from "../interfaces/idoso.interface";
import { EMetricas } from "../interfaces/metricas.interface";
import CardMetrica from "../components/CardMetrica";

const mockItem = {
    id: 1, 
  idIdoso: 123, 
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

 const mockItem1 = {
  id: 1, 
  idIdoso: 123,
nome: 'João Silva',
dataNascimento: '1950-01-01',
idUsuario: 123,
foto: 'url_da_foto.jpg',
tipoSanguineo: ETipoSanguineo.A_POSITIVO,
telefoneResponsavel: '123456789',
descricao: 'Idoso com histórico de hipertensão',
dataHora: new Date(),
categoria: EMetricas.GLICEMIA,
valor: 75,

};
 
const mockItem2 = {
  id: 1, 
  idIdoso: 123,
nome: 'João Silva',
dataNascimento: '1950-01-01',
idUsuario: 123,
foto: 'url_da_foto.jpg',
tipoSanguineo: ETipoSanguineo.A_POSITIVO,
telefoneResponsavel: '123456789',
descricao: 'Idoso com histórico de hipertensão',
dataHora: new Date(),
categoria: EMetricas.PESO,
valor: 75,

};

const mockItem3 = {
  id: 1, 
  idIdoso: 123,
nome: 'João Silva',
dataNascimento: '1950-01-01',
idUsuario: 123,
foto: 'url_da_foto.jpg',
tipoSanguineo: ETipoSanguineo.A_POSITIVO,
telefoneResponsavel: '123456789',
descricao: 'Idoso com histórico de hipertensão',
dataHora: new Date(),
categoria: EMetricas.PRESSAO_SANGUINEA,
valor: 75,

};

const mockItem4 = {
  id: 1, 
idIdoso: 123, 
nome: 'João Silva',
dataNascimento: '1950-01-01',
idUsuario: 123,
foto: 'url_da_foto.jpg',
tipoSanguineo: ETipoSanguineo.A_POSITIVO,
telefoneResponsavel: '123456789',
descricao: 'Idoso com histórico de hipertensão',
dataHora: new Date(),
categoria: EMetricas.SATURACAO_OXIGENIO,
valor: 75,

};

const mockItem5 = {
  id: 1, 
idIdoso: 123, 
nome: 'João Silva',
dataNascimento: '1950-01-01',
idUsuario: 123,
foto: 'url_da_foto.jpg',
tipoSanguineo: ETipoSanguineo.A_POSITIVO,
telefoneResponsavel: '123456789',
descricao: 'Idoso com histórico de hipertensão',
dataHora: new Date(),
categoria: EMetricas.TEMPERATURA,
valor: 75,

};

const mockItem6 = {
  id: 1, 
idIdoso: 123, 
nome: 'João Silva',
dataNascimento: '1950-01-01',
idUsuario: 123,
foto: 'url_da_foto.jpg',
tipoSanguineo: ETipoSanguineo.A_POSITIVO,
telefoneResponsavel: '123456789',
descricao: 'Idoso com histórico de hipertensão',
dataHora: new Date(),
categoria: EMetricas.HORAS_DORMIDAS,
valor: 75,

};

const mockItem7 = {
  id: 1, 
idIdoso: 123, 
nome: 'João Silva',
dataNascimento: '1950-01-01',
idUsuario: 123,
foto: 'url_da_foto.jpg',
tipoSanguineo: ETipoSanguineo.A_POSITIVO,
telefoneResponsavel: '123456789',
descricao: 'Idoso com histórico de hipertensão',
dataHora: new Date(),
categoria: EMetricas.ALTURA,
valor: 75,

};

const mockItem8 = {
  id: 1, 
idIdoso: 123, 
nome: 'João Silva',
dataNascimento: '1950-01-01',
idUsuario: 123,
foto: 'url_da_foto.jpg',
tipoSanguineo: ETipoSanguineo.A_POSITIVO,
telefoneResponsavel: '123456789',
descricao: 'Idoso com histórico de hipertensão',
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
  it('exibe as unidades corretas 1', () => {
    const { getByText } = render(<CardMetrica item={mockItem1} />);
    
    if (mockItem1.categoria === EMetricas.GLICEMIA) {
      expect(getByText('mg/dL')).toBeTruthy();
    } else {
      expect(() => getByText('mg/dL')).toThrow();
    }
  });
  it('exibe as unidades corretas 2', () => {
    const { getByText } = render(<CardMetrica item={mockItem2} />);
    
    if (mockItem2.categoria === EMetricas.PESO) {
      expect(getByText('kg')).toBeTruthy();
    } else {
      expect(() => getByText('kg')).toThrow();
    }
  });
  it('exibe as unidades corretas 3', () => {
    const { getByText } = render(<CardMetrica item={mockItem3} />);
    
    if (mockItem3.categoria === EMetricas.PRESSAO_SANGUINEA) {
      expect(getByText('mmHg')).toBeTruthy();
    } else {
      expect(() => getByText('mmHg')).toThrow();
    }
  });
  it('exibe as unidades corretas 4', () => {
    const { getByText } = render(<CardMetrica item={mockItem4} />);
    
    if (mockItem4.categoria === EMetricas.SATURACAO_OXIGENIO) {
      expect(getByText('%')).toBeTruthy();
    } else {
      expect(() => getByText('%')).toThrow();
    }
  });

  it('exibe as unidades corretas 5', () => {
    const { getByText } = render(<CardMetrica item={mockItem5} />);
    
    if (mockItem5.categoria === EMetricas.TEMPERATURA) {
      expect(getByText('°C')).toBeTruthy();
    } else {
      expect(() => getByText('°C')).toThrow();
    }
  });

  it('exibe as unidades corretas 6', () => {
    const { getByText } = render(<CardMetrica item={mockItem6} />);
    
    if (mockItem6.categoria === EMetricas.HORAS_DORMIDAS) {
      expect(getByText('h')).toBeTruthy();
    } else {
      expect(() => getByText('h')).toThrow();
    }
  });

  it('exibe as unidades corretas 7', () => {
    const { getByText } = render(<CardMetrica item={mockItem7} />);
    
    if (mockItem7.categoria === EMetricas.ALTURA) {
      expect(getByText('cm')).toBeTruthy();
    } else {
      expect(() => getByText('cm')).toThrow();
    }
  });

  it('exibe as unidades corretas 8', () => {
    const { getByText } = render(<CardMetrica item={mockItem8} />);
    
    if (mockItem8.categoria === EMetricas.IMC) {
      expect(getByText('kg/m²')).toBeTruthy();
    } else {
      expect(() => getByText('kg/m²')).toThrow();
    }
  });

});