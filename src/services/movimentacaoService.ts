import axios from "axios";
import {MovimentacaoRequest , MovimentacaoResponse} from  "../types/movimentacao";

const API_URL = "http://localhost:8080/movimentacoes";

// LISTAR TODOS AS MOVIMENTACOES
export const listarMovimentacoes = async (): Promise<MovimentacaoResponse[]> => {
    const response = await axios.get(API_URL);
    return response.data;
}

// LISTAR POR PRODUTO
export const listarPorProduto = async (produtoId: number): Promise<MovimentacaoResponse[]> => {
    const response = await axios.get(`${API_URL}/${produtoId}/produto`)
    return response.data;
}

// REGISTRAR MOVIMENTACAO
export const registrarMovimentacao = async(movimentacao: MovimentacaoRequest): Promise<MovimentacaoResponse> => {
    const response = await axios.post(API_URL, movimentacao);
    return response.data;
}