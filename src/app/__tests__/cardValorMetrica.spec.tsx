import React from 'react';
import { render } from '@testing-library/react-native';
import CardValorMetrica from '../components/CardValorMetrica';
import { EMetricas } from '../interfaces/metricas.interface';

const mockItem = {
    categoria: EMetricas.FREQ_CARDIACA,
    id: 1,
    valor: '80',
    dataHora: '2023-01-01T12:30:00',
    idMetrica: 123,  };

const mockItem1 = {
    categoria: EMetricas.GLICEMIA,
    id: 1,
    valor: '80',
    dataHora: '2023-01-01T12:30:00',
    idMetrica: 123,  };

const mockItem2 = {
    categoria: EMetricas.PESO,
    id: 1,
    valor: '80',
    dataHora: '2023-01-01T12:30:00',
    idMetrica: 123,  };

const mockItem3 = {
    categoria: EMetricas.PRESSAO_SANGUINEA,
    id: 1,
    valor: '80',
    dataHora: '2023-01-01T12:30:00',
    idMetrica: 123,  };

const mockItem4 = {
    categoria: EMetricas.SATURACAO_OXIGENIO,
    id: 1,
    valor: '80',
    dataHora: '2023-01-01T12:30:00',
    idMetrica: 123,  };

const mockItem5 = {
    categoria: EMetricas.TEMPERATURA,
    id: 1,
    valor: '80',
    dataHora: '2023-01-01T12:30:00',
    idMetrica: 123,  };

const mockItem6 = {
    categoria: EMetricas.ALTURA,
    id: 1,
    valor: '80',
    dataHora: '2023-01-01T12:30:00',
    idMetrica: 123,  };

const mockItem7 = {
    categoria: EMetricas.HORAS_DORMIDAS,
    id: 1,
    valor: '80',
    dataHora: '2023-01-01T12:30:00',
    idMetrica: 123,  };

const mockItem8 = {
    categoria: EMetricas.IMC,
    id: 1,
    valor: '80',
    dataHora: '2023-01-01T12:30:00',
    idMetrica: 123,  };
    
describe('CardValorMetrica Component', () => {

  it('renderiza corretamente', () => {
    const { getByText } = render(<CardValorMetrica item={mockItem} />);

    expect(getByText('80')).toBeDefined();
    expect(getByText('bpm')).toBeDefined();
    expect(getByText('01/01/2023')).toBeDefined();
    expect(getByText('12:30')).toBeDefined();
  });

  it('exibe as unidades corretas 1', () => {
    const { getByText } = render(<CardValorMetrica item={mockItem1} />);
    
    if (mockItem1.categoria === EMetricas.GLICEMIA) {
      expect(getByText('mg/dL')).toBeTruthy();
    } else {
      expect(() => getByText('mg/dL')).toThrow();
    }
  });

  it('exibe as unidades corretas 2', () => {
    const { getByText } = render(<CardValorMetrica item={mockItem2} />);
    
    if (mockItem2.categoria === EMetricas.PESO) {
      expect(getByText('kg')).toBeTruthy();
    } else {
      expect(() => getByText('kg')).toThrow();
    }
  });
  it('exibe as unidades corretas 3', () => {
    const { getByText } = render(<CardValorMetrica item={mockItem3} />);
    
    if (mockItem3.categoria === EMetricas.PRESSAO_SANGUINEA) {
      expect(getByText('mmHg')).toBeTruthy();
    } else {
      expect(() => getByText('mmHg')).toThrow();
    }
  });
  it('exibe as unidades corretas 4', () => {
    const { getByText } = render(<CardValorMetrica item={mockItem4} />);
    
    if (mockItem4.categoria === EMetricas.SATURACAO_OXIGENIO) {
      expect(getByText('%')).toBeTruthy();
    } else {
      expect(() => getByText('%')).toThrow();
    }
  });

  it('exibe as unidades corretas 5', () => {
    const { getByText } = render(<CardValorMetrica item={mockItem5} />);
    
    if (mockItem5.categoria === EMetricas.TEMPERATURA) {
      expect(getByText('°C')).toBeTruthy();
    } else {
      expect(() => getByText('°C')).toThrow();
    }
  });

  it('exibe as unidades corretas 6', () => {
    const { getByText } = render(<CardValorMetrica item={mockItem6} />);
    
    if (mockItem6.categoria === EMetricas.ALTURA) {
      expect(getByText('cm')).toBeTruthy();
    } else {
      expect(() => getByText('cm')).toThrow();
    }
  });

  it('exibe as unidades corretas 7', () => {
    const { getByText } = render(<CardValorMetrica item={mockItem7} />);
    
    if (mockItem7.categoria === EMetricas.HORAS_DORMIDAS) {
      expect(getByText('h')).toBeTruthy();
    } else {
      expect(() => getByText('h')).toThrow();
    }
  });

  it('exibe as unidades corretas 8', () => {
    const { getByText } = render(<CardValorMetrica item={mockItem8} />);
    
    if (mockItem8.categoria === EMetricas.IMC) {
      expect(getByText('kg/m²')).toBeTruthy();
    } else {
      expect(() => getByText('cmkg/m²')).toThrow();
    }
  });

});

