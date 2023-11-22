import React from 'react';
import { render } from '@testing-library/react-native';
import VisualizarPublicacao from '../private/pages/visualizarPublicacao';

describe('Visualizar publicacao', () => {
  it('Rendeziza sem quebrar', () => {
    render(<VisualizarPublicacao />);
  });
  it('displays actions correctly for admin', () => {
    const { getByText } = render(<VisualizarPublicacao />, {
      initialState: {
        usuario: {
          id: 1,
          admin: true,
        },
      },
    });

    expect(getByText('Apagar')).toBeTruthy();
  });
})
