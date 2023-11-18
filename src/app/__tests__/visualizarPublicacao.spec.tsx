import React from 'react';
import { render } from '@testing-library/react-native';
import VisualizarPublicacao from '../private/pages/visualizarPublicacao';

describe('Visualizar publicacao', () => {
  it('Rendeziza sem quebrar', () => {
    render(<VisualizarPublicacao />);
  });

});