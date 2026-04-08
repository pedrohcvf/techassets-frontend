import { useEffect, useState } from "react"
import { listarProdutos } from "../services/produtoService"
import { listarItens } from "../services/itemPatrimonioService"
import { listarColaboradores } from "../services/colaboradorService"
import { listarMovimentacoes } from "../services/movimentacaoService"
import { ProdutoResponse } from "../types/produto"
import { ItemPatrimonioResponse } from "../types/itemPatrimonio"
import { ColaboradorResponse } from "../types/colaborador"
import { MovimentacaoResponse } from "../types/movimentacao"

function DashboardPage() {

  const [produtos, setProdutos]           = useState<ProdutoResponse[]>([])
  const [itens, setItens]                 = useState<ItemPatrimonioResponse[]>([])
  const [colaboradores, setColaboradores] = useState<ColaboradorResponse[]>([])
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoResponse[]>([])
  const [loading, setLoading]             = useState(true)

  useEffect(() => {
    async function carregarDados() {
      try {
        const [p, i, c, m] = await Promise.all([
          listarProdutos(),
          listarItens(),
          listarColaboradores(),
          listarMovimentacoes(),
        ])
        setProdutos(p)
        setItens(i)
        setColaboradores(c)
        setMovimentacoes(m)
      } catch {
        // silencia erro — cards ficam com zero
      } finally {
        setLoading(false)
      }
    }
    carregarDados()
  }, [])

  // Métricas derivadas
  const totalProdutos       = produtos.length
  const abaixoMinimo        = produtos.filter(p => p.qtdeAtual < p.qtdeMinima).length
  const totalItens          = itens.length
  const colaboradoresAtivos = colaboradores.filter(c => c.ativo).length
  const ultimasMovs         = [...movimentacoes].reverse().slice(0, 5)
  const produtosCriticos    = produtos.filter(p => p.qtdeAtual < p.qtdeMinima)

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-white/30 text-sm"
           style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Carregando...
        </p>
      </div>
    )
  }

  return (
    <div className="p-8">

      {/* Cabeçalho */}
      <div className="mb-8">
        <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
           style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          // visão geral
        </p>
        <h1 className="text-2xl font-bold"
            style={{ fontFamily: 'Syne, sans-serif' }}>
          Dashboard
        </h1>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-4 gap-3 mb-8">

        <div className="bg-surface border border-border p-5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3"
             style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Produtos
          </p>
          <p className="text-3xl font-bold text-white"
             style={{ fontFamily: 'Syne, sans-serif' }}>
            {totalProdutos}
          </p>
          <p className="text-xs text-white/30 mt-2">cadastrados no sistema</p>
        </div>

        <div className="bg-surface border border-border p-5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3"
             style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Itens de Patrimônio
          </p>
          <p className="text-3xl font-bold text-white"
             style={{ fontFamily: 'Syne, sans-serif' }}>
            {totalItens}
          </p>
          <p className="text-xs text-white/30 mt-2">ativos no inventário</p>
        </div>

        <div className="bg-surface border border-border p-5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3"
             style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Colaboradores Ativos
          </p>
          <p className="text-3xl font-bold text-success"
             style={{ fontFamily: 'Syne, sans-serif' }}>
            {colaboradoresAtivos}
          </p>
          <p className="text-xs text-white/30 mt-2">
            de {colaboradores.length} cadastrados
          </p>
        </div>

        <div className={`bg-surface border p-5 ${abaixoMinimo > 0 ? 'border-danger/40' : 'border-border'}`}>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3"
             style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Estoque Crítico
          </p>
          <p className={`text-3xl font-bold ${abaixoMinimo > 0 ? 'text-danger' : 'text-white'}`}
             style={{ fontFamily: 'Syne, sans-serif' }}>
            {abaixoMinimo}
          </p>
          <p className="text-xs text-white/30 mt-2">
            {abaixoMinimo > 0 ? 'produtos abaixo do mínimo' : 'tudo dentro do esperado'}
          </p>
        </div>

      </div>

      {/* Grid inferior */}
      <div className="grid grid-cols-2 gap-4">

        {/* Últimas movimentações */}
        <div className="bg-surface border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-bold"
                style={{ fontFamily: 'Syne, sans-serif' }}>
              Últimas Movimentações
            </h2>
          </div>
          <div>
            {ultimasMovs.length === 0 ? (
              <p className="px-5 py-6 text-white/20 text-xs"
                 style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Nenhuma movimentação registrada.
              </p>
            ) : (
              ultimasMovs.map((mov, index) => (
                <div key={index}
                     className="flex items-center justify-between px-5 py-3 border-b border-border/50 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-white">{mov.nomeProduto}</p>
                    <p className="text-xs text-white/30 mt-0.5"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {new Date(mov.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className={`text-xs font-mono px-2 py-0.5 border ${
                    mov.tipo === 'ENTRADA'
                      ? 'text-success border-success/30 bg-success/10'
                      : 'text-danger border-danger/30 bg-danger/10'
                  }`}>
                    {mov.tipo === 'ENTRADA' ? 'Entrada' : 'Saída'} · {mov.quantidade}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Produtos abaixo do mínimo */}
        <div className="bg-surface border border-border">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-bold"
                style={{ fontFamily: 'Syne, sans-serif' }}>
              Estoque Abaixo do Mínimo
            </h2>
            {produtosCriticos.length > 0 && (
              <span className="text-xs font-mono px-2 py-0.5 border text-danger border-danger/30 bg-danger/10">
                {produtosCriticos.length} produtos
              </span>
            )}
          </div>
          <div>
            {produtosCriticos.length === 0 ? (
              <p className="px-5 py-6 text-white/20 text-xs"
                 style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Nenhum produto crítico no momento.
              </p>
            ) : (
              produtosCriticos.map(produto => (
                <div key={produto.id}
                     className="flex items-center justify-between px-5 py-3 border-b border-border/50 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-white">{produto.nome}</p>
                    <p className="text-xs text-white/30 mt-0.5"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {produto.categoria}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-danger"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {produto.qtdeAtual}
                    </p>
                    <p className="text-xs text-white/30"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      mín: {produto.qtdeMinima}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardPage