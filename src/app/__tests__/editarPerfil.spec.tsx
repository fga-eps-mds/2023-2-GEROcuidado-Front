import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditarPerfil from '../private/pages/editarPerfil';

describe('EditarPerfil component', () => {

  test('Atualiza nome com o input', async () => {
    const { getByPlaceholderText } = render(<EditarPerfil />);

    const nameInput = getByPlaceholderText('Nome completo');

    fireEvent.changeText(nameInput, 'Gustavo A');

    // Wait for the component to re-render with the updated state
    await waitFor(() => {
      // Check if the input field value has been updated
      expect(nameInput.props.value).toBe('Gustavo A');
    });
  });

  // Addicionar mais testes

});
