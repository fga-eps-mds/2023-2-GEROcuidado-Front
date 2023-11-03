import { IUser } from "./user.interface";

export enum ECategoriaPublicacao {
  SAUDE = "Saúde",
  ALIMENTACAO = "Alimentação",
  EXERCICIOS = "Exercícios",
  GERAL = "Geral",
}

export interface IPublicacaoBody {
  idUsuario: number;
  titulo: string;
  descricao: string;
  dataHora: Date | string;
  categoria: ECategoriaPublicacao;
  contagemReportes: number;
}

export interface IPublicacao extends IPublicacaoBody {
  id: number;
  usuario?: IUser;
}

export interface IPublicacaoFilter {
  titulo?: string;
}

export interface IOrder {
  column: string;
  dir: "DESC" | "ASC";
}
