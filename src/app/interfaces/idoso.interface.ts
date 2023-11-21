export enum ETipoSanguineo {
  A_POSITIVO = "A+",
  A_NEGATIVO = "A-",
  B_POSITIVO = "B+",
  B_NEGATIVO = "B-",
  AB_POSITIVO = "AB+",
  AB_NEGATIVO = "AB-",
  O_POSITIVO = "O+",
  O_NEGATIVO = "O-",
}

export interface IIdosoBody {
  nome: string;
  dataNascimento: Date | string;
  idUsuario: number;
  foto?: string;
  tipoSanguineo?: ETipoSanguineo | null;
  telefoneResponsavel: string;
  descricao?: string;
  dataHora: Date | string;
}

export interface IIdoso extends IIdosoBody {
  id: number;
}

export interface IIdosoFilter {
  nome?: string;
  idUsuario?: number;
}

export interface IOrder {
  column: string;
  dir: "DESC" | "ASC";
}
