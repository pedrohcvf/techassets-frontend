import axios from "axios";
import { ProdutoRequest, ProdutoResponse } from "../types/produto";

const API_URL = "http://localhost:8080/produtos";

// LISTAR TODOS OS PRODUTOS
export const listarProdutos = async (): Promise<ProdutoResponse[]> => {
    const response = await axios.get(API_URL);
    return response.data
}

// LISTAR PRODUTO POR ID
export const buscarProdutoPorId = async(id: number): Promise<ProdutoResponse> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

// CADASTRAR PRODUTO
export const cadastrarProduto = async (produto: ProdutoRequest): Promise<ProdutoResponse> =>{
const response = await axios.post(API_URL, produto);
    return response.data;
}

// ATUALIZAR PRODUTO
export const atualizarProduto = async (id: number, produto: ProdutoRequest): Promise<ProdutoResponse[]> => {
    const response = await axios.put(`${API_URL}/${id}`, produto);
    return response.data;
}

// DELETAR PRODUTO
export const deletarProduto = async (id: number): Promise<void> => {
    const response = await axios.delete(`${API_URL}/${id}`)
}