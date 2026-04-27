# 🖥️ TechAssets — Frontend

> Interface web para gerenciamento de patrimônio e estoque de startups de tecnologia, consumindo a [TechAssets API](https://github.com/pedrohcvf/techassets-backend).

---

## 📌 Sobre o Projeto

O **TechAssets Frontend** é a interface do sistema TechAssets, desenvolvida com React e TypeScript. Permite que equipes de startups de TI visualizem e gerenciem produtos, patrimônio, colaboradores e movimentações de estoque de forma centralizada.

---

## ✨ Funcionalidades

- 📊 **Dashboard** — Métricas em tempo real (produtos, patrimônio, colaboradores, estoque crítico)
- 📦 **Módulo Estoque** — Listagem, cadastro, edição e remoção de produtos
- 🔄 **Movimentações** — Registro de entradas e saídas com histórico completo
- 🖥️ **Módulo Patrimônio** — Controle de itens físicos com status e responsável
- 👥 **Colaboradores** — Gestão de colaboradores ativos
- ⚠️ Alerta visual de produtos abaixo do estoque mínimo

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| React 18 | Biblioteca principal de UI |
| TypeScript | Tipagem estática |
| Vite | Bundler e dev server |
| TanStack Query | Gerenciamento de estado e cache de requisições |
| Axios | Cliente HTTP para consumo da API |

---

## 📁 Estrutura do Projeto
src/
├── components/       # Componentes reutilizáveis (Navbar, Sidebar)
├── pages/            # Páginas da aplicação
│   ├── DashboardPage.tsx
│   ├── ProdutosPage.tsx
│   ├── MovimentacoesPage.tsx
│   ├── ItemPatrimonioPage.tsx
│   └── ColaboradoresPage.tsx
├── services/         # Chamadas à API REST
├── types/            # Tipagens TypeScript
└── App.tsx---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 18 ou superior
- [TechAssets Backend](https://github.com/pedrohcvf/techassets-backend) rodando em `localhost:8080`

### Passo a passo

**1️⃣ Clone o repositório**
```bash
git clone https://github.com/pedrohcvf/techassets-frontend.git
cd techassets-frontend
```

**2️⃣ Instale as dependências**
```bash
npm install
```

**3️⃣ Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

**4️⃣ Acesse no navegador**
http://localhost:5173> 
⚠️ Certifique-se de que o backend está rodando antes de iniciar o frontend.

---

## 🔗 Repositório do Backend

Este frontend consome a API do [TechAssets Backend](https://github.com/pedrohcvf/techassets-backend) — desenvolvida com Java 17 e Spring Boot 3.

---

## 👤 Autor

**Pedro Carvalho**

[![GitHub](https://img.shields.io/badge/GitHub-pedrohcvf-181717?style=flat&logo=github)](https://github.com/pedrohcvf)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-pcarvalhof-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/pcarvalhof)
