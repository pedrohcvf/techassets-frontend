import { NavLink } from "react-router-dom"

interface NavItem {
  label: string
  path: string
  icon: string
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: "⬡" },
  { label: "Produtos",      path: "/produtos",      icon: "▦" },
  { label: "Itens",         path: "/itens",         icon: "◈" },
  { label: "Colaboradores", path: "/colaboradores", icon: "◉" },
  { label: "Movimentações", path: "/movimentacoes", icon: "⇄" },
]

function Sidebar() {
  return (
    <aside className="w-52 min-h-screen bg-surface border-r border-border flex flex-col fixed top-0 left-0">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <span className="font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
          Tech<span className="text-primary">Assets</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 text-sm transition-colors border-l-2 ` +
              (isActive
                ? "text-primary border-primary bg-primary/5"
                : "text-white/40 border-transparent hover:text-white")
            }
          >
            <span className="text-base w-4 text-center">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-black text-xs font-bold"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            PC
          </div>
          <div>
            <p className="text-xs font-medium text-white">Pedro Carvalho</p>
            <p className="text-white/30 text-[9px] uppercase tracking-wider"
               style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Admin
            </p>
          </div>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar