import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="bg-surface flex items-center gap-6 px-8 py-4 border-b border-border">
            <span className="text-primary font-bold text-xl mr-8" style={{ fontFamily: 'Syne, sans-serif' }}>TechAssets</span>
            <Link to="/produtos" className="text-white hover:text-primary transition-colors">Produtos</Link>
            <Link to="/movimentacoes" className="text-white hover:text-primary transition-colors">Movimentações</Link>
            <Link to="/itens" className="text-white hover:text-primary transition-colors">Itens</Link>
            <Link to="/colaboradores" className="text-white hover:text-primary transition-colors">Colaboradores</Link>
        </nav>
    )
}

export default Navbar