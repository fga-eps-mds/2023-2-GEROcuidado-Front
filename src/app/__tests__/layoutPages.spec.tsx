import React from 'react';
import { render } from '@testing-library/react-native';
import PublicLayout from '../public/_layout';
import PrivateLayout from '../private/pages/_layout';

// Mock expo-router
jest.mock('expo-router', () => ({
  Stack: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Layouts', () => {
  it('renders PublicLayout correctly', () => {
    const { toJSON } = render(<PublicLayout />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders PrivateLayout correctly', () => {
    const { toJSON } = render(<PrivateLayout />);
    expect(toJSON()).toMatchSnapshot();
  });
});