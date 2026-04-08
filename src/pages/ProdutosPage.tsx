import { useState, useEffect } from 'react'
import { ProdutoResponse } from '../types/produto'
import { listarProdutos } from '../services/produtoService'


function ProdutosPage(){
    
    const [produtos, setProdutos] = useState<ProdutoResponse[]>([])
    
    useEffect(() => {
        listarProdutos().then(data => setProdutos(data))
    }, [])

    return (
    <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>
        <table className="w-full border-collapse">
        <thead>
            <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nome</th>
            <th className="border p-2 text-left">Categoria</th>
            <th className="border p-2 text-left">Qtd Atual</th>
            <th className="border p-2 text-left">Qtd Mínima</th>
            <th className="border p-2 text-left">Unidade</th>
            </tr>
        </thead>
        <tbody>
            {produtos.map(produto => (
            <tr key={produto.id}>
                <td className="border p-2">{produto.nome}</td>
                <td className="border p-2">{produto.categoria}</td>
                <td className="border p-2">{produto.qtdeAtual}</td>
                <td className="border p-2">{produto.qtdeMinima}</td>
                <td className="border p-2">{produto.unidadeMedida}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    )
}

export default ProdutosPage