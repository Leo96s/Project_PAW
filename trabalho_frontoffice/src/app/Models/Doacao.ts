export interface PecaRoupa {
    tipo: string;
    qualidade: string;
    quantidade: number;
    pontos: number;
  }

export class Doacao{
    constructor(
        public _id?: string,
        public images?: String[],
        public nif?: string,
        public pecaRoupa?: PecaRoupa[],
        public nomeEntidade?: string,
        public estadoDoacao?: string, // ex: 'recebido', 'entregue', 'extraviado'
        public totalPontos?: number,
        public dataDoacao?:  Date,
    ){} 
}