import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardRotina from '../components/CardRotina';
import { ECategoriaRotina } from '../interfaces/rotina.interface';

// Mockando o módulo do router para evitar erros
jest.mock('expo-router', () => ({
    router: {
        push: jest.fn(),
    },
}));

const mockItem = {
    id: 1,
    titulo: 'Exemplo de Título',
    descricao: 'Exemplo de descrição da rotina que é um pouco longa para o teste',
    categoria: ECategoriaRotina.EXERCICIOS,
    idPaciente: 1,
    dataHora: "20/11/2023",
};

describe('CardRotina component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<CardRotina item={mockItem} />);
        //const title = getByText('Exemplo de Título');
        //expect(title).toBeDefined();
    });

 
});
