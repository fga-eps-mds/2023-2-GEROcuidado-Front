import { IUser } from "./user.interface";

export enum ECategoriaPublicacao {
  SAUDE = "Saúde",
  ALIMENTACAO = "Alimentação",
  EXERCICIOS = "Exercícios",
  GERAL = "Geral",
}

export enum ECategoriaPesquisa {
  SAUDE = "Saúde",
  ALIMENTACAO = "Alimentação",
  EXERCICIOS = "Exercícios",
  GERAL = "Geral",
  TODAS = "Todas",
}

export interface IPublicacaoBody {
  idUsuario: number;
  titulo: string;
  descricao: string;
  dataHora: Date | string;
  categoria: ECategoriaPublicacao;
}

export interface IPublicacao extends IPublicacaoBody {
  id: number;
  usuario?: IUser;
  idUsuarioReporte: number[];
  categoria: ECategoriaPublicacao;
}

export interface IPublicacaoParams extends IPublicacaoBody, IUser {
  id: number;
  usuario?: IUser;
  idUsuarioReporte: string;
}

export interface IPublicacaoUsuario extends IPublicacao, IUser { }

export interface IPublicacaoFilter {
  titulo?: string;
  isReported?: boolean;
  categoria?: ECategoriaPesquisa;
}

export interface IOrder {
  column: string;
  dir: "DESC" | "ASC";
}
