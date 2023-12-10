export enum ECategoriaRotina {
  MEDICAMENTO = "Medicamentos",
  ALIMENTACAO = "Alimentação",
  EXERCICIOS = "Exercícios",
  GERAL = "Geral",
}

export interface IRotinaBody {
  titulo: string;
  idIdoso: number;
  categoria?: ECategoriaRotina | null;
  descricao?: string;
  dataHoraConcluidos: string[];
  dataHora: Date | string;
  dias: EDiasSemana[];
}

export interface IRotina extends IRotinaBody {
  id: number;
}

export interface IRotinaFilter {
  idIdoso?: number;
  dataHora?: string;
}

export enum EDiasSemana {
  Domingo = 0,
  Segunda = 1,
  Terca = 2,
  Quarta = 3,
  Quinta = 4,
  Sexta = 5,
  Sabado = 6,
}

export interface IOrder {
  column: string;
  dir: "ASC";
}
