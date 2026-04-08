import React, { useState, useEffect } from 'react'
import { ProdutoRequest, ProdutoResponse } from '../types/produto'
import { cadastrarProduto, listarProdutos, atualizarProduto, deletarProduto } from '../services/produtoService'

function ProdutosPage() {

  const [produtos, setProdutos]       = useState<ProdutoResponse[]>([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]               = useState<string | null>(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [produtoEditando, setProdutoEditando] = useState<ProdutoResponse | null>(null)
  const [produtoDeletando, setProdutoDeletando] = useState<ProdutoResponse | null>(null)
  const [form, setForm]               = useState<ProdutoRequest>({
    nome: '',
    descricao: '',
    categoria: '',
    qtdeMinima: 0,
    unidadeMedida: ''
  })

  {/* CARREGAR PRODUTOS NA TELA */}
  async function carregar() {
    setLoading(true)
    setError(null)
    try {
      const data = await listarProdutos()
      setProdutos(data)
    } catch {
      setError('Não foi possivel conectar-se ao backend.')
    } finally {
      setLoading(false)
    }
  }

  {/* CADASTRAR PRODUTO */}
  async function handleCadastrar(e: React.FormEvent) {
    e.preventDefault()
    try {
      await cadastrarProduto(form)
      setModalAberto(false)
      setForm({ nome: '', descricao: '', categoria: '', qtdeMinima: 0, unidadeMedida: '' })
      carregar()
    } catch {
      alert('Não foi possível cadastrar o produto.')
    }
  }

  {/* ATUALIZAR PRODUTO */}
  async function handleAtualizar(e: React.FormEvent) {
    e.preventDefault()
    if (!produtoEditando) return

    try {
      await atualizarProduto(produtoEditando.id, form)
      setProdutoEditando(null)
      setForm({ nome: '', descricao: '', categoria: '', qtdeMinima: 0, unidadeMedida: '' })
      carregar()
    } catch {
      alert('Não foi possível atualizar o produto.')
    }
  }

  {/* DELETAR PRODUTO */}
  async function handleDeletar() {
    if (!produtoDeletando) return
    try {
      await deletarProduto(produtoDeletando.id)
      setProdutoDeletando(null)
      carregar()
    } catch {
      alert('Não foi possível deletar o produto.')
    }
  }

  {/* ALTERAR PRODUTO */}
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'qtdeMinima' ? Number(value) : value
    }))
  }

  useEffect(() => {
    carregar()
  }, [])

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
          Produtos
        </h1>
      </div>
      <button
        onClick={() => setModalAberto(true)}
        className="bg-primary text-black text-sm font-bold px-4 py-2 hover:brightness-110 transition-all"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        + Novo Produto
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
              {['Nome', 'Categoria', 'Qtd Atual', 'Qtd Mínima', 'Unidade', 'Ações'].map(col => (
                <th key={col}
                    className="text-left px-4 py-3 text-white/30 text-xs uppercase tracking-widest"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {produtos.length === 0 ? (
              <tr>
                <td colSpan={6}
                    className="px-4 py-8 text-center text-white/20 text-sm"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Nenhum produto cadastrado.
                </td>
              </tr>
            ) : (
              produtos.map(produto => (
                <tr key={produto.id}
                    className="border-b border-border/50 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium">{produto.nome}</td>
                  <td className="px-4 py-3 text-sm text-white/50">{produto.categoria}</td>
                  <td className="px-4 py-3 text-sm text-white/50"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {produto.qtdeAtual}
                  </td>
                  <td className="px-4 py-3 text-sm text-white/50"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {produto.qtdeMinima}
                  </td>
                  <td className="px-4 py-3 text-sm text-white/50">{produto.unidadeMedida}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setProdutoEditando(produto)
                          setForm({
                            nome: produto.nome,
                            descricao: produto.descricao,
                            categoria: produto.categoria,
                            qtdeMinima: produto.qtdeMinima,
                            unidadeMedida: produto.unidadeMedida
                          })
                        }}
                        className="text-xs text-white/30 hover:text-primary transition-colors"
                      >
                        editar
                      </button>
                      <button
                        onClick={() => setProdutoDeletando(produto)}
                        className="text-xs text-white/30 hover:text-danger transition-colors"
                      >
                        remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )}

    {/* Modal de cadastro */}
    {modalAberto && (
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        onClick={() => setModalAberto(false)}
      >
        <div
          className="bg-surface border border-border w-full max-w-md p-6"
          onClick={e => e.stopPropagation()}
        >
          <div className="mb-5">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
               style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              // novo registro
            </p>
            <h2 className="text-lg font-bold"
                style={{ fontFamily: 'Syne, sans-serif' }}>
              Cadastrar Produto
            </h2>
          </div>
          <form onSubmit={handleCadastrar} className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                     style={{ fontFamily: 'JetBrains Mono, monospace' }}>Nome</label>
              <input name="nome" value={form.nome} onChange={handleChange}
                placeholder="ex: Cabo de Rede Cat6"
                className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                     style={{ fontFamily: 'JetBrains Mono, monospace' }}>Descrição</label>
              <input name="descricao" value={form.descricao} onChange={handleChange}
                placeholder="Descrição opcional"
                className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>Categoria</label>
                <input name="categoria" value={form.categoria} onChange={handleChange}
                  placeholder="ex: Periférico"
                  className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>Unidade</label>
                <input name="unidadeMedida" value={form.unidadeMedida} onChange={handleChange}
                  placeholder="ex: un, m, cx"
                  className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                     style={{ fontFamily: 'JetBrains Mono, monospace' }}>Qtd. Mínima</label>
              <input name="qtdeMinima" type="number" min={0} value={form.qtdeMinima}
                onChange={handleChange}
                className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
            </div>
            <div className="flex gap-2 mt-2">
              <button type="submit"
                className="flex-1 bg-primary text-black font-bold text-sm py-2 hover:brightness-110 transition-all"
                style={{ fontFamily: 'Syne, sans-serif' }}>
                Cadastrar
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

    {/* Modal de editar */}
    {produtoEditando && (
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        onClick={() => setProdutoEditando(null)}
      >
        <div
          className="bg-surface border border-border w-full max-w-md p-6"
          onClick={e => e.stopPropagation()}
        >
          <div className="mb-5">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
               style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              // editar registro
            </p>
            <h2 className="text-lg font-bold"
                style={{ fontFamily: 'Syne, sans-serif' }}>
              Editar Produto
            </h2>
          </div>
          <form onSubmit={handleAtualizar} className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                     style={{ fontFamily: 'JetBrains Mono, monospace' }}>Nome</label>
              <input name="nome" value={form.nome} onChange={handleChange}
                className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                     style={{ fontFamily: 'JetBrains Mono, monospace' }}>Descrição</label>
              <input name="descricao" value={form.descricao} onChange={handleChange}
                className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>Categoria</label>
                <input name="categoria" value={form.categoria} onChange={handleChange}
                  className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                       style={{ fontFamily: 'JetBrains Mono, monospace' }}>Unidade</label>
                <input name="unidadeMedida" value={form.unidadeMedida} onChange={handleChange}
                  className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                     style={{ fontFamily: 'JetBrains Mono, monospace' }}>Qtd. Mínima</label>
              <input name="qtdeMinima" type="number" min={0} value={form.qtdeMinima}
                onChange={handleChange}
                className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
            </div>
            <div className="flex gap-2 mt-2">
              <button type="submit"
                className="flex-1 bg-primary text-black font-bold text-sm py-2 hover:brightness-110 transition-all"
                style={{ fontFamily: 'Syne, sans-serif' }}>
                Salvar
              </button>
              <button type="button" onClick={() => setProdutoEditando(null)}
                className="px-4 border border-border text-white/40 text-sm hover:text-white hover:border-white/30 transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Modal de confirmação de delete */}
    {produtoDeletando && (
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        onClick={() => setProdutoDeletando(null)}
      >
        <div
          className="bg-surface border border-border w-full max-w-sm p-6"
          onClick={e => e.stopPropagation()}
        >
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
             style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            // confirmar ação
          </p>
          <h2 className="text-lg font-bold mb-2"
              style={{ fontFamily: 'Syne, sans-serif' }}>
            Remover Produto
          </h2>
          <p className="text-sm text-white/50 mb-6">
            Tem certeza que deseja remover <span className="text-white font-medium">{produtoDeletando.nome}</span>? Essa ação não pode ser desfeita.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDeletar}
              className="flex-1 bg-danger text-white font-bold text-sm py-2 hover:brightness-110 transition-all"
              style={{ fontFamily: 'Syne, sans-serif' }}>
              Remover
            </button>
            <button
              onClick={() => setProdutoDeletando(null)}
              className="px-4 border border-border text-white/40 text-sm hover:text-white hover:border-white/30 transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )}

  </div>
  )
}

export default ProdutosPage