import React from 'react';
import { render } from '@testing-library/react-native';
import LinkButton from '../components/LinkButton';

describe('LinkButton', () => {
  it('deve renderizar corretamente', () => {
    const { getByText, getByTestId } = render(
      <LinkButton title="Teste" href="/test" />
    );

    // Verifica se o componente foi renderizado corretamente
    const button = getByTestId('link-button');
    const buttonText = getByText('Teste');

    expect(button).toBeDefined();
    expect(buttonText).toBeDefined();
  });

  it('deve usar a cor de fundo personalizada', () => {
    const backgroundColor = 'red';
    const { getByTestId } = render(
      <LinkButton title="Teste" href="/test" backgroundColor={backgroundColor} />
    );

    const button = getByTestId('link-button');

    // Verifica se o estilo de fundo personalizado foi aplicado corretamente
    const style = button.props.style;
    expect(style).toEqual(expect.objectContaining({ backgroundColor }));
  });
});
