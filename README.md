# 🌿 Farmácia Avena

## 📖 Sobre o Projeto

A **Farmácia Avena** é uma aplicação web moderna desenvolvida com Next.js 15, especializada em remédios naturais e fitoterapia. O projeto oferece uma interface elegante e responsiva para consulta de remédios, suas propriedades medicinais, métodos de preparo e contraindicações.

### 🎯 Objetivo
Democratizar o acesso ao conhecimento sobre plantas medicinais e remédios naturais, proporcionando informações confiáveis sobre fitoterapia de forma acessível e moderna.

## ✨ Funcionalidades Principais

### 🏠 **Página Inicial**
- Carousel interativo com banners promocionais
- Modal com questionário de saúde em inglês
- Seção de categorias de remédios
- Design responsivo e moderno

### 💊 **Catálogo de Remédios**
- Lista completa de remédios naturais
- Sistema de paginação avançado (5, 10, 20, 50 itens por página)
- Cards informativos com design atrativo
- Busca e navegação intuitiva

### 📋 **Detalhes do Remédio**
- **Efeitos**: Propriedades medicinais detalhadas
- **Modo de Preparo**: Instruções passo a passo
- **Contraindicações**: Avisos e cuidados importantes
- Interface limpa e focada na informação

### 📱 **Recursos Adicionais**
- Botão "Voltar ao Topo" animado
- Footer completo com newsletter e redes sociais
- Sistema de notificações toast
- Navegação otimizada entre páginas

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **Next.js 15.5.2** - Framework React com App Router
- **React 19.1.0** - Biblioteca para interfaces
- **Ant Design 5.27.3** - Componentes UI modernos
- **CSS Modules** - Estilização modular e responsiva

### **Requisições HTTP**
- **Axios 1.12.2** - Cliente HTTP para API
- **React Toastify 11.0.5** - Notificações elegantes

### **Qualidade de Código**
- **ESLint 9** - Linting e padronização
- **Fontes Montserrat** - Tipografia profissional

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
- Node.js 18.0 ou superior
- npm ou yarn
- Backend API rodando na porta 4000

### **1. Clonar o Repositório**
```bash
git clone https://github.com/souzabweatriz/Farmacia-Avena.git
cd Farmacia-Avena
```

### **2. Instalar Dependências**
```bash
npm install
```

### **3. Configurar Variáveis de Ambiente**
Crie um arquivo \`.env.local\` na raiz do projeto com as seguintes variáveis:

```bash
# API Principal - Endpoint para remédios
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# API de Categorias - Endpoint específico para categorias
CATEGORIA_API_URL=http://localhost:4000/api/categoria/
```

### **4. Executar em Desenvolvimento**
```bash
npm run dev
```

O projeto estará disponível em: \`http://localhost:3000\`


## 📁 Estrutura do Projeto

\`\`\`
Farmacia-Avena/
├── src/
│   ├── app/                    # Pages (App Router)
│   │   ├── about/             # Página Sobre
│   │   ├── contact/           # Página Contato
│   │   ├── products/          # Catálogo de Produtos
│   │   │   └── [id]/          # Detalhes do Produto
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.js          # Layout principal
│   │   └── page.jsx           # Página inicial
│   └── components/            # Componentes reutilizáveis
│       ├── BackTop/           # Botão voltar ao topo
│       ├── BuyCard/           # Card de compra
│       ├── Card/              # Card de produto
│       ├── Footer/            # Rodapé
│       ├── Header/            # Cabeçalho
│       └── SectionNeed/       # Seção de categorias
├── public/                    # Arquivos estáticos
│   ├── fonts/                 # Fontes Montserrat
│   ├── icons/                 # Ícones e favicon
│   └── images/                # Imagens e logo
├── .env.local                 # Variáveis de ambiente
├── next.config.mjs            # Configuração Next.js
├── package.json               # Dependências
└── README.md                  # Documentação
\`\`\`

## 🌐 API Endpoints

### **Remédios**
- **GET** \`/api/remedios\` - Lista todos os remédios
- **GET** \`/api/remedios/:id\` - Detalhes de um remédio específico

### **Categorias**
- **GET** \`/api/categoria\` - Lista todas as categorias

### **Exemplo de Resposta - Remédio**
\`\`\`json
{
  "id": 1,
  "nome_remedio": "Camomila",
  "efeito_remedio": "Calmante natural, alivia ansiedade e insônia",
  "modo_preparo": "Coloque 1 colher de sopa em água fervente, deixe por 5 minutos",
  "contraindicacoes": "Gestantes e pessoas alérgicas a plantas da família Asteraceae"
}
\`\`\`

## 🎨 Design e UX

### **Paleta de Cores**
- **Verde Principal**: #4D8C63 (tema farmácia natural)
- **Verde Secundário**: #68d391 (gradientes e hover)
- **Fundo**: Gradientes sutis em tons de verde
- **Texto**: #333 (legibilidade otimizada)

### **Responsividade**
- **Desktop**: 1200px+ (layout completo)
- **Tablet**: 768px-1199px (adaptação intermediária)
- **Mobile**: 320px-767px (layout otimizado)

### **Acessibilidade**
- Aria-labels em componentes interativos
- Contraste adequado para leitura
- Navegação por teclado otimizada

## 🚀 Performance

### **Otimizações Implementadas**
- **Image Optimization**: Uso do componente \`next/image\`
- **Priority Loading**: Logo com carregamento prioritário
- **Code Splitting**: Divisão automática do código
- **CSS Modules**: Estilos otimizados e modulares

## 🤝 Como Contribuir

1. **Fork** o repositório
2. Crie uma **branch** para sua feature (\`git checkout -b feature/nova-funcionalidade\`)
3. **Commit** suas mudanças (\`git commit -m 'Adiciona nova funcionalidade'\`)
4. **Push** para a branch (\`git push origin feature/nova-funcionalidade\`)
5. Abra um **Pull Request**

## 📝 Scripts Disponíveis

\`\`\`bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
\`\`\`

## 🐛 Troubleshooting

### **Problemas Comuns**

**Erro 404 ao acessar produtos**
- Verifique se o backend está rodando na porta 4000
- Confirme as variáveis de ambiente no \`.env.local\`

**Imagens não carregam**
- Verifique se as imagens estão na pasta \`public/images/\`
- Confirme a configuração do \`next.config.mjs\`

**Erro de CORS**
- Configure o backend para aceitar requisições do frontend
- Verifique as URLs nas variáveis de ambiente

## 📊 Status do Projeto

- ✅ **Frontend**: Completo e funcional
- ✅ **Responsividade**: Implementada
- ✅ **API Integration**: Funcionando
- ✅ **UX/UI**: Design moderno
- 🔄 **Backend**: Dependência externa

## 📞 Contato

**Desenvolvido por**: Beatriz Souza  
**Email**: [@ana.b.oliveira56@aluno.senai.br](https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox)  
**GitHub**: [@souzabweatriz](https://github.com/souzabweatriz)


⭐ **Se este projeto foi útil, considere dar uma estrela no GitHub!**

🌿 **Farmácia Avena - Sua saúde natural em boas mãos**
