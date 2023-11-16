import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ListarIdosos from '../private/pages/listarIdosos';


test('renders ListarIdosos component', () => {
  const { getByText } = render(<ListarIdosos />);
  const headerElement = getByText(/De quem está cuidando agora?/i);
  expect(headerElement).toBeTruthy();
});