# LP-Forge v2

Motor moderno, desacoplado e de alta performance para criação e customização de Landing Pages profissionais.

## 🚀 Arquitetura v2

O LP-Forge v2 foi completamente reconstruído sobre **Next.js 16 (App Router)**, **React 19**, **TypeScript** e **Tailwind CSS**, operando com um sistema desacoplado de renderização dinâmica em **4 camadas**:

1. **Camada 1 — Container da Seção (Pai):**
   - Controle de largura máxima (`full`, `boxed`, `narrow`, `mobile`).
   - Altura de escala vertical (`auto`, `100vh`, `75%`, `50%`).
   - Posicionamento Horizontal X do componente no pai (`start` / esquerda, `center` / centro, `end` / direita).
   - Posicionamento Vertical Y no pai (`start`, `center`, `end`, `stretch`).
   - Respiros externos verticais (`paddingY`) e margens laterais (`paddingX`).
   - Fixação no topo (`sticky header`).

2. **Camada 2 — Container do Componente (Filho):**
   - Largura do componente (`full` 100%, `auto` / cápsula que abraça o conteúdo, `boxed`, `narrow`).
   - Espessura interna vertical (`paddingInner`).
   - Acabamentos de superfície (`glass`, `solid`, `bordered`, `3d_floating`, `neon`).
   - Borda (`borderRadius`, `borderWidth`, `borderColor`).
   - Superfície customizada (`customSurface`) e Luz Ambiente (`ambientGlow`).

3. **Camada 3 — Elementos Internos (Flex & Fluxo):**
   - Direção (`col`, `row`, `responsive` — vertical no mobile e horizontal no desktop).
   - Inversão de ordem (`reverse`).
   - Distribuição principal (`start`, `center`, `end`, `between`, `around`).
   - Alinhamento transversal (`start`, `center`, `end`, `stretch`).
   - Espaçamento (`gap`: `none`, `compact`, `normal`, `spacious`, `monumental`).

4. **Camada 4 — Tipografia Cirúrgica & Ações Inteligentes:**
   - `<EditableText />`: controle individual por elemento textual com escala de tamanhos, todos os pesos (`font-light` a `font-black`), transformação de caixa (`camelCase`, `UPPERCASE`, `lowercase`, `custom`), limites de largura (`prose`) e destaques (`highlights`).
   - `<SmartButton />`: botões de alta conversão com tamanhos, variantes visuais, ícones dinâmicos (`Lucide`) e âncoras navegáveis suaves.
   - Opcionalidade de 100% dos sub-elementos (`optionalKey` e `hiddenElements`).

---

## 🛠️ Tecnologias

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS, Lucide React
- **Estado:** Zustand com histórico completo (Undo / Redo)
- **Tipagem & Schemas:** TypeScript + Zod

---

## 📦 Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.
