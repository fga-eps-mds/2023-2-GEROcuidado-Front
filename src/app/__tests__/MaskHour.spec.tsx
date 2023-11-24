import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MaskInput from '../components/MaskHour';

describe('MaskInput component', () => {

    it('handles empty input correctly', () => {
        const inputMaskChange = jest.fn();
        const { getByDisplayValue } = render(
            <MaskInput inputMaskChange={inputMaskChange} />
        );
    });


    it('masks correctly', () => {
        const mockInputMaskChange = jest.fn();
        const { getByTestId } = render(<MaskInput inputMaskChange={mockInputMaskChange} />);
        const input = getByTestId('mask-input');

        fireEvent.changeText(input, '1234');
        expect(mockInputMaskChange).toHaveBeenCalledWith('12:34');
    })

    it('masks correctly', () => {
        const mockInputMaskChange = jest.fn();
        const { getByTestId } = render(<MaskInput inputMaskChange={mockInputMaskChange} />);
        const input = getByTestId('mask-input');

        fireEvent.changeText(input, '31');
        expect(mockInputMaskChange).toHaveBeenCalledWith('');
    })

    it('masks correctly', () => {
        const mockInputMaskChange = jest.fn();
        const { getByTestId } = render(<MaskInput inputMaskChange={mockInputMaskChange} />);
        const input = getByTestId('mask-input');

        fireEvent.changeText(input, '12:78');
        expect(mockInputMaskChange).toHaveBeenCalledWith('12');
    })

    it('masks correctly', () => {
        const mockInputMaskChange = jest.fn();
        const { getByTestId } = render(<MaskInput inputMaskChange={mockInputMaskChange} />);
        const input = getByTestId('mask-input');

        fireEvent.changeText(input, '9');
        expect(mockInputMaskChange).toHaveBeenCalledWith('9');
    })
});
