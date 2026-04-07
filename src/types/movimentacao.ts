export interface MovimentacaoRequest{
    produtoId: number;
    tipo: string;
    quantidade: number;
}

export interface MovimentacaoResponse{
    produtoId: number;
    nomeProduto: string;
    tipo: string;
    quantidade: number;
    data: Date;
    observacao: string;
}