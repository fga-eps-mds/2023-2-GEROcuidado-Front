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
    const errorMessage = getByTestId('error-titulo1');
    //expect(errorMessage.props.children).toBe('Campo obrigatório!');
    expect(errorMessage).toBeTruthy();
    
    const errorMessage2 = getByTestId('error-titulo2');
    expect(errorMessage2).toBeTruthy();

    const errorMessage3 = getByTestId('error-titulo3');
    expect(errorMessage3).toBeTruthy();

    const errorMessage4 = getByTestId('error-titulo4');
    expect(errorMessage4.props.children).toBeTruthy();
  });

});