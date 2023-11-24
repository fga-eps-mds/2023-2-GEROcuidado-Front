import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Rotina from '../private/pages/cadastrarRotina';

describe('Rotina component', () => {
  it('renders without crashing', () => {
    render(<Rotina />);
  });

  it('displays error message for missing title on save', () => {
    const { getByText, getByTestId } = render(<Rotina />);
    const saveButton = getByText('Salvar');
    fireEvent.press(saveButton);
    const errorMessage = getByTestId('error-titulo');
    expect(errorMessage.props.children).toBe('Campo obrigatório!');
  });

  // Add more tests as needed
});