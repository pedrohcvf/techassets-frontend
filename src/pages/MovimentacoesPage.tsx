import { useEffect, useState } from "react";
import { MovimentacaoResponse } from "../types/movimentacao";
import { listarMovimentacoes } from "../services/movimentacaoService";


function MovimentacoesPage(){

    const [movimentacao, setMovimentacao] = useState<MovimentacaoResponse[]>([])
    
    useEffect(() => {
        listarMovimentacoes().then(data => setMovimentacao(data))
    }, [])
    
    return(
          <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Movimentações</h1>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Produto</th>
          <th className="border p-2 text-left">Tipo</th>
          <th className="border p-2 text-left">Quantidade</th>
          <th className="border p-2 text-left">Data</th>
        </tr>
      </thead>
      <tbody>
        {movimentacao.map((mov, index) => (
          <tr key={index}>
            <td className="border p-2">{mov.nomeProduto}</td>
            <td className="border p-2">{mov.tipo}</td>
            <td className="border p-2">{mov.quantidade}</td>
            <td className="border p-2">{new Date(mov.data).toLocaleDateString('pt-BR')}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    )
}
    


export default MovimentacoesPage