import React from "react";
import { render } from '@testing-library/react-native';
import Home from "..";

describe('Home', () => {
    it('renderiza corretamente', () => {
        const { toJSON } = render(<Home />);
        expect(toJSON()).toMatchSnapshot();
    })
    
})