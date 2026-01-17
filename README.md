# Bruno Tools - Central de Ferramentas

Central para exibir e acessar suas ferramentas desenvolvidas.

## 📁 Estrutura

```
tools-hub/
├── index.html        # Página principal (HTML)
├── styles.css        # Estilos visuais
├── js/
│   ├── particles.js  # Efeito Particle Network
│   └── main.js       # Lógica de carregamento dos projetos
├── projects.json     # Configuração dos projetos (edite este arquivo!)
└── README.md         # Este arquivo
```

## 🚀 Como adicionar/remover projetos

Edite o arquivo `projects.json`. Cada projeto tem 3 campos:

```json
[
  {
    "id": "identificador-unico",
    "nome": "Nome da Ferramenta",
    "descricao": "Breve descrição do que a ferramenta faz",
    "link": "/caminho-da-ferramenta"
  }
]
```

### Exemplo prático

```json
[
  {
    "id": "calculadora-impostos",
    "nome": "Calculadora de Impostos",
    "descricao": "Ferramenta para cálculo automático de CBS/IBS conforme a reforma tributária",
    "link": "/calculadora"
  },
  {
    "id": "gerador-xml",
    "nome": "Gerador XML NFS-e",
    "descricao": "Gera arquivos XML no padrão Nacional para Notas Fiscais de Serviço",
    "link": "/nfse-generator"
  }
]
```

### Campos

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `id` | Não | Identificador único (opcional, para uso futuro) |
| `nome` | Sim | Nome exibido no card |
| `descricao` | Sim | Descrição curta da ferramenta |
| `link` | Sim | URL para acessar a ferramenta |

### Tipos de link

- **Rota interna:** `/minha-ferramenta` → vai para `seusite.com/minha-ferramenta`
- **Link externo:** `https://outra-url.com/ferramenta` → abre o site externo

## 🌐 Deploy

### Vercel

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Selecione o repositório `tools-hub`
4. Clique em "Deploy"
5. Pronto! Seu site estará em `seu-projeto.vercel.app`

### Netlify

1. Crie uma conta em [netlify.com](https://netlify.com)
2. Clique em "Add new site" → "Import an existing project"
3. Conecte seu GitHub e selecione o repositório
4. Clique em "Deploy site"
5. Pronto! Seu site estará em `seu-projeto.netlify.app`

### Domínio personalizado

Ambas as plataformas permitem configurar um domínio próprio gratuitamente nas configurações do projeto.

## 🎨 Personalização

### Cores

No `index.html`, procure por `:root` e altere as variáveis CSS:

```css
:root {
  --accent: #00d4aa;           /* Cor de destaque principal */
  --accent-secondary: #7c3aed; /* Cor de destaque secundária */
  --bg-primary: #0a0a0f;       /* Fundo principal */
  /* ... outras variáveis */
}
```

### Textos

No `index.html`, procure pelos textos no `<header>`:

- `bruno.tools` - Nome do site
- `Central de Ferramentas` - Título principal
- `@BrunoOnRails` - Seu username

## 📝 Licença

Uso livre. Faça o que quiser com o código!
