export interface ProdutoRequest{
    nome: string;
    descricao: string;
    categoria: string;
    qtdeMinima: number;
    unidadeMedida: string;
}

export interface ProdutoResponse{
    id: number;
    nome: string;
    descricao: string;
    categoria: string;
    qtdeAtual: number;
    qtdeMinima: number;
    unidadeMedida: string;
}