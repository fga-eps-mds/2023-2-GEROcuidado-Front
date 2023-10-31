export enum ECategoriaPublicacao {
  SAUDE = 'Saúde',
  ALIMENTACAO = 'Alimentação',
  EXERCICIOS = 'Exercícios',
  GERAL = 'Geral',
}

export interface IPublicacaoBody {

    idUsuario: number;
    titulo: string;
    descricao: string;
    dataHora: Date;
    categoria: ECategoriaPublicacao;
    contagemReportes: number;
  
}

export interface IPublicacao extends IPublicacaoBody {
  id: number;
}
