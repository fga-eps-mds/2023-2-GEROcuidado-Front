import { IIdoso, IIdosoParams } from "./idoso.interface";

export enum ECategoriaRotina {
    MEDICAMENTO = "Medicamentos",
    ALIMENTACAO = "Alimentação",
    EXERCICIOS = "Exercícios",
    GERAL = "Geral",
}

export interface IRotinaBody {
    titulo: string;
    idPaciente: number;
    categoria?: ECategoriaRotina | null;
    descricao?: string;
    dataHora: Date | string;
    dias: number[];
}

export interface IRotina extends IRotinaBody {
    id: number;
}

export interface IRotinaFilter {
    idPaciente?: number;
}

export interface IRotinaIdoso extends IRotina, IIdosoParams {
    dataHoraIdoso: string;
    descricaoIdoso: string;
}