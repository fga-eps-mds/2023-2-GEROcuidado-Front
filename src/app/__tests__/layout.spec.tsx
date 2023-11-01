import React from 'react';
import { render } from '@testing-library/react-native';
import PrivatePagesLayout from '../private/pages/_layout'; 

describe('PrivatePagesLayout', () => {
  it('deve renderizar corretamente', () => {
    const { getByTestId } = render(<PrivatePagesLayout />);

    // Verifica se o componente Toast foi renderizado
    const toastComponent = getByTestId('ToastComponent'); 
    expect(toastComponent).toBeTruthy();

    // Verifica se o componente Stack foi renderizado
    const stackComponent = getByTestId('StackComponent'); 
    expect(stackComponent).toBeTruthy();
  });
});
