import React, { useEffect, useState } from "react"
import { MovimentacaoRequest, MovimentacaoResponse } from "../types/movimentacao"
import { listarMovimentacoes, registrarMovimentacao } from "../services/movimentacaoService"
import { listarProdutos } from "../services/produtoService"
import { ProdutoResponse } from "../types/produto"

function MovimentacoesPage() {

  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoResponse[]>([])
  const [produtos, setProdutos]           = useState<ProdutoResponse[]>([])
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState<string | null>(null)
  const [modalAberto, setModalAberto]     = useState(false)
  const [form, setForm]                   = useState<MovimentacaoRequest>({
    produtoId: 0,
    tipo: '',
    quantidade: 1,
  })

  /* CARREGAR MOVIMENTAÇÕES */
  async function carregarMovimentacoes() {
    setLoading(true)
    setError(null)
    try {
      const data = await listarMovimentacoes()
      setMovimentacoes(data)
    } catch {
      setError('Não foi possível carregar as movimentações.')
    } finally {
      setLoading(false)
    }
  }

  /* CARREGAR PRODUTOS PARA O SELECT */
  async function carregarProdutos() {
    try {
      const data = await listarProdutos()
      setProdutos(data)
    } catch {
      setError('Não foi possível carregar os produtos.')
    }
  }

  /* REGISTRAR MOVIMENTAÇÃO */
  async function handleRegistrar(e: React.FormEvent) {
    e.preventDefault()
    try {
      await registrarMovimentacao(form)
      setModalAberto(false)
      setForm({ produtoId: 0, tipo: '', quantidade: 1 })
      carregarMovimentacoes()
    } catch {
      alert('Não foi possível registrar a movimentação.')
    }
  }

  /* ATUALIZAR FORM */
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'produtoId' || name === 'quantidade' ? Number(value) : value
    }))
  }

  useEffect(() => {
    carregarMovimentacoes()
    carregarProdutos()
  }, [])

  /* BADGE DE TIPO */
  function TipoBadge({ tipo }: { tipo: string }) {
    const styles: Record<string, string> = {
      ENTRADA: 'text-success border-success/30 bg-success/10',
      SAIDA:   'text-danger border-danger/30 bg-danger/10',
    }
    const labels: Record<string, string> = {
      ENTRADA: 'Entrada',
      SAIDA:   'Saída',
    }
    return (
      <span className={`text-xs font-mono px-2 py-0.5 border ${styles[tipo] ?? 'text-white/30 border-white/10 bg-white/5'}`}>
        {labels[tipo] ?? tipo}
      </span>
    )
  }

  return (
    <div className="p-8">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
             style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            // módulo estoque
          </p>
          <h1 className="text-2xl font-bold"
              style={{ fontFamily: 'Syne, sans-serif' }}>
            Movimentações
          </h1>
        </div>
        <button
          onClick={() => setModalAberto(true)}
          className="bg-primary text-black text-sm font-bold px-4 py-2 hover:brightness-110 transition-all"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          + Registrar
        </button>
      </div>

      {/* Loading e erro */}
      {loading && (
        <p className="text-white/30 text-sm"
           style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Carregando...
        </p>
      )}
      {error && (
        <p className="text-danger text-sm border border-danger/30 bg-danger/10 px-4 py-2">
          {error}
        </p>
      )}

      {/* Tabela */}
      {!loading && !error && (
        <div className="border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Produto', 'Tipo', 'Quantidade', 'Data', 'Observação'].map(col => (
                  <th key={col}
                      className="text-left px-4 py-3 text-white/30 text-xs uppercase tracking-widest"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movimentacoes.length === 0 ? (
                <tr>
                  <td colSpan={5}
                      className="px-4 py-8 text-center text-white/20 text-sm"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Nenhuma movimentação registrada.
                  </td>
                </tr>
              ) : (
                movimentacoes.map((mov, index) => (
                  <tr key={index}
                      className="border-b border-border/50 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{mov.nomeProduto}</td>
                    <td className="px-4 py-3">
                      <TipoBadge tipo={mov.tipo} />
                    </td>
                    <td className="px-4 py-3 text-sm text-white/50"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {mov.quantidade}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/50"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {new Date(mov.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/50">
                      {mov.observacao || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de registrar */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
             onClick={() => setModalAberto(false)}>
          <div className="bg-surface border border-border w-full max-w-md p-6"
               onClick={e => e.stopPropagation()}>
            <div className="mb-5">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
                 style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                // novo registro
              </p>
              <h2 className="text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                Registrar Movimentação
              </h2>
            </div>
            <form onSubmit={handleRegistrar} className="flex flex-col gap-3">

              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>Produto</label>
                <select name="produtoId" value={form.produtoId} onChange={handleChange}
                  className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors">
                  <option value={0}>Selecione...</option>
                  {produtos.map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>Tipo</label>
                <select name="tipo" value={form.tipo} onChange={handleChange}
                  className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors">
                  <option value="">Selecione...</option>
                  <option value="ENTRADA">Entrada</option>
                  <option value="SAIDA">Saída</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>Quantidade</label>
                <input name="quantidade" type="number" min={1} value={form.quantidade}
                  onChange={handleChange}
                  className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
              </div>

              <div className="flex gap-2 mt-2">
                <button type="submit"
                  className="flex-1 bg-primary text-black font-bold text-sm py-2 hover:brightness-110 transition-all"
                  style={{ fontFamily: 'Syne, sans-serif' }}>
                  Registrar
                </button>
                <button type="button" onClick={() => setModalAberto(false)}
                  className="px-4 border border-border text-white/40 text-sm hover:text-white hover:border-white/30 transition-colors">
                  Cancelar
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default MovimentacoesPage