import React from 'react';
import { render } from '@testing-library/react-native';
import EditarPublicacao from '../private/pages/editarPublicacao';

describe('<EditarPublicacao />', () => {
  it('renders without crashing', () => {
    render(<EditarPublicacao />);
  });

});