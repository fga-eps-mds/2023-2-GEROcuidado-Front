import React from "react";
import { render } from '@testing-library/react-native';
import CustomButton from "../components/CustomButton";

describe('CustomButton', () => {
    it('renderiza corretamente', () => {
        const { toJSON } = render(<CustomButton title="teste" callbackFn={jest.fn()}/>);
        expect(toJSON())
    })
})