import '@testing-library/jest-native/extend-expect';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditarIdoso from '../private/pages/editarIdoso';

// Mock AsyncStorage para retornar valores específicos durante o teste
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('EditarIdoso', () => {
  const mockUsuario = {
    id: 123,
    // outras propriedades do usuário, se necessário
  };

  beforeEach(() => {
    // Configura o valor de retorno para AsyncStorage.getItem
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockUsuario));
  });

  it('renderiza corretamente', () => {
    render(<EditarIdoso />);
    
    // Você pode continuar a escrever o teste de renderização aqui
  });

  it('renders component correctly', () => {
    const { getByText, getByPlaceholderText } = render(<EditarIdoso />);

    expect(getByText('Salvar')).toBeTruthy();
    expect(getByPlaceholderText('Nome')).toBeTruthy();
  });

});
