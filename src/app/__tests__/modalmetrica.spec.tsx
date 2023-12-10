import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import ModalMetrica from '../components/ModalMetrica';
import { EMetricas } from '../interfaces/metricas.interface';
import { ETipoSanguineo } from '../interfaces/idoso.interface';


const mockMetrica = {
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

describe('ModalMetrica Component', () => {
  it('renderiza sem erros', () => {
    render(
      <ModalMetrica
        visible={true}
        callbackFn={() => { }}
        closeModal={() => { }}
        callbackValor={() => { }}
        message="Teste"
        metrica={mockMetrica}
      />
    );
  });

  it('fecha o modal ao pressionar o botão Cancelar', () => {
    const mockCloseModal = jest.fn();
  
    const { getByTestId } = render(
      <ModalMetrica
        visible={true}
        callbackFn={() => {}}
        closeModal={mockCloseModal}
        callbackValor={() => {}}
        message="Teste"
        metrica={mockMetrica}
      />
    );
  
    fireEvent.press(getByTestId('cancelarBtn'));
  
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('exibe mensagem de erro ao tentar salvar com valor inválido', async () => {
    const { getByTestId, getByText } = render(
      <ModalMetrica
        visible={true}
        callbackFn={() => {}}
        closeModal={() => {}}
        callbackValor={() => {}}
        message="Teste"
        metrica={mockMetrica}
      />
    );
  
    fireEvent.press(getByTestId('callbackBtn'));
  
    const errorMessage = getByText('Campo obrigatório!');
    expect(errorMessage).toBeTruthy();
  });
      
});


