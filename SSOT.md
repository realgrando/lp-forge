# SSOT — Single Source of Truth: LP-Forge (v2)
**Motor Unificado de Criação e Ejeção de Landing Pages & Linktree (Bio) da Nivix**

---

## 1. Visão Geral e Propósito
O **LP-Forge (v2)** é uma plataforma interna de **Server-Driven UI e Page Building** projetada para que os designers da Nivix construam páginas profissionais com flexibilidade estética ilimitada, sem que os sites fiquem com layouts "retos, padronizados ou genéricos".

O sistema unifica a produção de dois tipos de ativos digitais:
1. **Landing Pages de Alta Conversão:** Ricas em seções, variações de layout (Split, Bento, Glass, Minimalista), animações fluidas, tipografia expressiva e micro-interações.
2. **Páginas de Bio / Linktree:** Experiências mobile-first de alto impacto visual, com suporte nativo a cards 3D vazados, glassmorphism, links dinâmicos e embeds sociais.

Ambos rodam sobre o **mesmo motor central de renderização e exportação**, mas com modos de exibição e bibliotecas de componentes dedicadas no Studio.

---

## 2. Princípios Fundamentais (Invioláveis)

1. **Zero Hospedagem de Clientes na VPS Central (KVM-1):**
   * A VPS Hostinger da Nivix **NUNCA** hospedará sites ou linktrees de clientes finais.
   * O LP-Forge é uma ferramenta de **Studio + Ejetor**: o entregável final é um pacote pronto (runtime estático/serverless com Next.js) hospedado na conta gratuita da Vercel ou na infraestrutura do próprio cliente.
2. **Desacoplamento Rigoroso do CRM (`nivix-os`):**
   * O LP-Forge é um repositório 100% independente. Ele não polui o código-fonte, tabelas ou pipelines do CRM operacional da Nivix.
   * Conexões futuras com o ecossistema Nivix serão feitas via API REST ou pelo portal corporativo `hub.nivix.company`.
3. **Poder Visual Ilimitado ao Designer (Anti-Monotonia):**
   * O sistema deve permitir ajustes finos profundos: desde o background e luz ambiente da seção até o raio de borda, padding, tipografia elemento a elemento e estilos de superfície (solid, glass, 3d, neon, bordered).
4. **Isolamento de Responsabilidade (A Lei das 3 Camadas):**
   * **Camada 1: Estrutura & Layout** (Paddings, largura do container, alinhamentos, ordenação). -> *Exclusivo do Designer.*
   * **Camada 2: Estilos & Ajuste Fino** (Cores, fontes, bordas, sombras, luz ambiente). -> *Exclusivo do Designer.*
   * **Camada 3: Conteúdo Puro** (Títulos, textos, imagens, links, cards). -> *Acessível tanto pelo Designer no Studio quanto pelo Cliente na rota `/admin` ejetada.*
5. **Nenhum Prop Drilling & Estado Imutável:**
   * O estado de edição do Studio é centralizado em uma Store **Zustand + Immer**, garantindo Undo/Redo instantâneo (`Ctrl+Z` / `Ctrl+Y`), histórico em memória e re-renderização cirúrgica.
6. **Plug-and-Play de Componentes (Open-Closed Principle):**
   * Adicionar um novo bloco ou card ao catálogo exige apenas criar seu arquivo de componente e schema Zod em `src/registry/`. O núcleo do editor **nunca** é alterado para registrar novos blocos.

---

## 3. O Modelo Mental Unificado: LP vs. Linktree (Bio)

Embora ambos compartilhem o mesmo motor de blocos e árvore de dados JSON, o Studio adapta a experiência visual ao objetivo do projeto:

| Característica | Modo Landing Page (LP) | Modo Bio / Linktree |
| :--- | :--- | :--- |
| **Canvas Viewport** | Tela cheia fluida com toggles para Desktop (100%), Tablet (768px) e Mobile (375px) | Mockup elegante de smartphone com bezel realista (centralizado, `max-w-md`) |
| **Biblioteca Padrão** | Heros, Features, Bento Grids, Prova Social, Preços, FAQs, Rodapés | Header de Perfil/Avatar, Social Icons, Link Cards 3D/Glass, Embeds, Vcard |
| **Flexibilidade Cruzada** | Total: o designer pode puxar um bloco de Linktree para dentro de uma LP se desejar | Total: o designer pode puxar um bloco de FAQ ou Depoimento para a Bio |
| **Objetivo do Layout** | Fluxo de conversão contínuo e storytelling vertical longo | Ação rápida, links visíveis, estética de cartão de visitas digital de luxo |

---

## 4. Biblioteca Extensa de Componentes (Catálogo Unificado)

O novo motor suportará mais de **70 componentes visuais** organizados em 24 categorias:

### 4.1. Categorias de Landing Page (Herdadas e Aprimoradas do `lp-forge`):
1. **Header / Navbar:** Minimal, Floating Glass, Mega Menu, Centered Brand.
2. **Hero:** V1 Split, V2 Glass Spotlight, V3 Bento Showcase, V4 Lead Capture.
3. **Features:** Grid 3 Colunas, Bento Moderno, Accordion Interativo, Cards Flutuantes.
4. **Before / After:** Comparativo de Imagens com Slider, Comparador em Cards Duplos.
5. **Testimonials (Prova Social):** Carrossel Infinito, Masonry Grid, Quotes de Destaque.
6. **Pricing:** Tabelas de Preço Bento, Minimalista, Cartão em Destaque (Best Value).
7. **FAQ:** Accordion com Busca, Grid Duplo de Dúvidas, Cards Expansíveis.
8. **Trust Badges / Logos:** Logo Cloud Marquee, Selos de Segurança, Métricas em Destaque.
9. **Stats / Números:** Contadores Numéricos, Bento Stats, Métricas com Gráfico.
10. **About / Story:** Linha do Tempo, Grid Fundador + Manifesto, Split Imagem/História.
11. **Gallery / Portfolio:** Grid Dinâmico, Visualizador em Lightbox, Carrossel de Projetos.
12. **Process / Steps:** Linha de Etapas Numeradas, Cards de Fluxo Conectados.
13. **Contact / Location:** Formulário de Contato, Mapa Interativo Split, Cartão de Visitas.
14. **LeadGen:** Formulário Multi-Step, Modal de Captura, Lead Magnet com Download.
15. **CTA (Call to Action):** Faixa de Conversão, Card com Fundo Gradiente, Spotlight.
16. **Dividers:** Ondas SVG, Cortes Angulares, Gradientes e Glows de Separação.
17. **Team:** Grid de Membros, Cards Sociais, Destaque da Liderança.
18. **Menu / Catálogo:** Vitrine de Produtos, Grade de Itens com Preço.
19. **Narrative / Awards:** Premiações e Troféus, Certificações de Indústria.
20. **Split Content:** Módulos alternados de Imagem + Texto rico.
21. **Footer:** Multi-colunas Corporativo, Minimalista com Redes, Centralizado.

### 4.2. Categorias de Bio / Linktree (Herdadas do `nivix-bio`):
22. **Bio Header:** Avatar Circular com Borda Neon/Glow, Nome, Bio Curta, Badges Verificadas.
23. **Bio Social Grid:** Ícones sociais circulares/quadrados com contagem e links rápidos.
24. **Bio Links & Cards:**
    * **3D Glass Card:** Card com profundidade, luz ambiente e relevo translúcido.
    * **3D Floating Card:** Efeito de botão suspenso com sombra de deslocamento.
    * **Neon Glow Card:** Borda iluminada com pulso e hover reativo.
    * **Embedded Media Card:** Player de YouTube/Spotify embutido com pré-visualização.
    * **Lead Capture Card:** Campo rápido de e-mail/WhatsApp direto no Linktree.

---

## 5. Sistema de Customização Profunda (Do Macro ao Micro)

Para garantir que nenhum site ou linktree pareça um "template engessado", o designer tem controle absoluto em 3 níveis:

### 5.1. Nível 1: Seção & Layout Estrutural (Macro — `<SectionWrapper />`)
Organizado no Studio em 3 grupos visuais intuitivos com ícones (estilo Figma / Webflow):

1. **Dimensões do Container:**
   * **Largura do Container (`containerWidth`):** Escalas matematicamente demarcadas para produzir diferença visual imediata no canvas de `1280px` e em telas reais:
     * `full` (**Total — 100%**): `w-full max-w-none` (sangria total de ponta a ponta).
     * `boxed` (**Padrão — 1024px**): `w-full max-w-5xl mx-auto`.
     * `narrow` (**Estreito — 768px**): `w-full max-w-3xl mx-auto`.
     * `mobile` (**Mobile — 448px**): `w-full max-w-md mx-auto`.
   * **Altura do Container (`minHeight`):** `auto` (Automática), `screen` (`100vh` Tela Cheia), `large` (`75vh`), `half` (`50vh`).
   * **Largura Máxima do Texto / Prosa (`contentMaxWidth`):** `narrow` (`640px` / `max-w-xl`), `medium` (`768px` / `max-w-2xl`), `wide` (`1024px` / `max-w-4xl`), `full` (`Total` / `w-full max-w-none`).
2. **Posição & Alinhamento (Flex Engine):**
   * **Posição Horizontal (`distribution`):**
     * `start` (**Esq**): Alinha a caixa de conteúdo e os elementos internos à esquerda (`mr-auto ml-0 items-start text-left justify-start`).
     * `center` (**Centro**): Centraliza a caixa de conteúdo e os elementos internos (`mx-auto items-center text-center justify-center`).
     * `end` (**Dir**): Alinha a caixa de conteúdo e os elementos internos à direita (`ml-auto mr-0 items-end text-right justify-end`).
     * `between` (**Entre**): Distribui elementos e barras nas extremidades opostas (`justify-between w-full`).
     * `around` (**Igual**): Distribui elementos com espaçamento igual ao redor (`justify-around w-full`).
   * **Posição Vertical dos Elementos (`alignItems`):**
     * `start` (**Topo**), `center` (**Centro**), `end` (**Base**), `stretch` (**Esticar** — distribui do topo à base ocupando `100%` da altura disponível).
   * **Espaçamento entre Elementos (`gap`):** Escala de 5 níveis (`none` = 0, `compact` = 16px, `normal` = 32px, `spacious` = 48px, `monumental` = 64px) que controla tanto o espaçamento vertical/horizontal principal quanto sub-grupos (botões, links, cards).
   * **Inverter Ordem dos Elementos (`reverse`):** Inverte a sequência horizontal (`flex-row-reverse`) ou a hierarquia estrutural dos blocos.
3. **Respiros & Margens (Paddings Independentes):**
   * **Afastamento Externo Vertical (`paddingY`):** Espaço fora do container (afasta uma seção da outra na página).
   * **Espessura Interna Vertical (`paddingInner`):** Altura/respiro interno dentro do container ou barra.
   * **Margem Lateral Horizontal (`paddingX`):** Distância das bordas laterais (`none` = `0px` colado na borda da tela, `compact`, `normal`, `spacious`).
4. **Fundo & Atmosfera Visual:**
   * **Cor Sólida & Motor de Gradiente:** Gradientes lineares (`to-b`, `to-t`, `to-r`, `to-br`) e `radial` com seletor de cor inicial e final.
   * **Padrões & Texturas de Fundo (`bgPattern`):** `grid` (malha com máscara radial suave), `dots` (matriz de pontos), `noise` (granulado sutil).
   * **Imagem de Fundo Global (`bgImage` + `bgOverlayOpacity`):** Imagem de fundo da seção com controle de opacidade da máscara escura (`0%` a `95%`).
   * **Luz Ambiente (`ambientGlow` + `glowColor`):** Ponto de luz difusa no fundo da seção.
   * **Divisores de Seção (`borderTop`, `borderBottom`, `borderGlow`):** Linhas divisórias superiores/inferiores com opção de brilho gradiente centralizado.

### 5.2. Nível 2: Componente & Superfície (Meso)
* **Estilo de Superfície (Cards & Blocos):**
  * `solid`: Fundo com tom de superfície limpo.
  * `glass`: Vidro translúcido com `backdrop-blur` ajustável.
  * `bordered`: Contorno fino com transparência de alta precisão.
  * `3d_floating`: Relevo tridimensional com sombras multicamadas.
  * `neon`: Borda com brilho reativo.
* **Border Radius:** `none` (0px), `sm` (8px), `md` (16px), `lg` (24px), `full` (9999px).
* **Bordas & Sombras:** Espessura (`0px`, `1px`, `2px`), cor de contorno customizável (`borderColor`) e cor de superfície customizável (`customSurface`).

### 5.3. Nível 3: Opcionalidade Global, Botões, Ícones & Micro-Detalhes (Micro)
* **Opcionalidade Universal (`hiddenElements`):**
  * **NENHUM elemento interno de uma seção é obrigatório.** Todo sub-elemento (badge, título, subtítulo, botão primário, botão secundário, card visual, lista de diferenciais, rodapé do bloco) possui uma chave de visibilidade controlável por switch (`Ativo / Oculto`) na barra lateral, sem apagar o conteúdo salvo.
* **Micro-Customização de Botões (`<SmartButton />` & `ButtonConfig`):**
  * Cada botão dentro de qualquer seção é um sub-sistema completo e independente que permite configurar:
    * `enabled`: Ligar ou desligar o botão individualmente (ex: deixar apenas 1 botão no Hero em vez de 2).
    * `text` e `url`: Rótulo e link de destino.
    * `variant`: `solid`, `outline`, `glass`, `3d`, `ghost`.
    * `iconName` e `iconPosition`: Seletor visual de ícone (`ArrowRight`, `Sparkles`, `Whatsapp`, `Play`, `Flame`, `Zap`, `Check`, `Download`, `Calendar`, `ExternalLink`, `None`, etc.) + posição (`left` ou `right`).
    * `radius` e `size`: Arredondamento (`none`, `sm`, `md`, `lg`, `full`) e dimensão própria com presença horizontal generosa (`sm`: `px-6 min-w-[110px]`, `md`: `px-8..10 min-w-[150px]`, `lg`: `px-10..14 min-w-[190px]`, `xl`: `px-12..20 min-w-[230px]`).
    * `fullWidth`: Opção de esticar o botão para ocupar 100% da largura horizontal do seu container.
* **Controle por Elemento de Texto & Badge:**
  * O designer pode ajustar individualmente o título, o subtítulo, badges e textos de apoio de qualquer bloco (incluindo cor do texto, cor de fundo da badge, ícone da badge).
* **Tipografia Riquíssima:**
  * **Família de Fontes:** Google Fonts de elite integradas com preview em tempo real (ex: *Syne, Space Grotesk, Playfair Display, Bebas Neue, Poppins, Inter, Montserrat, Outfit, Cormorant Garamond, Fraunces*).
  * **Tamanho do Texto:** Escalas semânticas de `micro` até `monumental` (`text-7xl md:text-[10rem]`).
  * **Peso da Fonte:** De `light` (300) a `black` (900).
  * **Transformação:** `uppercase`, `capitalize`, `normal-case` e rastreamento de letras (`tracking-widest`, `tracking-tighter`).

---

## 6. Sistema Completo de Gestão de Templates

O Studio possui um motor de persistência e clonagem de designs que suporta dois tipos de modelos:

### 6.1. Tipos de Templates
1. **Templates de Página Inteira (Full-Page Templates):**
   * O layout completo da Landing Page ou do Linktree, incluindo paleta global, todas as seções e dados de exemplo.
2. **Pacotes de Seções (Section Packs / Wireframes Prontos):**
   * Combinações pré-fabricadas de 2 a 4 seções que funcionam bem juntas (ex: *"Pack Lançamento SaaS" = Hero Split + Logo Cloud + Bento Grid*; *"Pack Linktree Creator" = Bio Header + Socials + 4 Cards 3D*).

### 6.2. Operações do Designer (CRUD Completo de Templates)
* **Criar Template a partir do Projeto Atual:** Com 1 clique, o designer salva a página atual como um novo template.
* **Salvar / Atualizar:** Sobrescrever um template existente com melhorias visuais.
* **Renomear e Categorizar:** Mudar nome, descrição, tags e categoria do template.
* **Duplicar:** Criar uma variação a partir de um template existente sem alterar o original.
* **Excluir:** Remover templates obsoletos do catálogo.
* **Preview Visual:** Miniaturas e dados de visualização para seleção rápida na biblioteca de templates.

---

## 7. O Contrato de Dados Central (AST / JSON Schema)

O estado inteiro de uma página ou linktree é serializado no formato `SiteDocument`:

```typescript
export interface SectionLayout {
  paddingY: "none" | "compact" | "normal" | "spacious";
  paddingInner?: "none" | "compact" | "normal" | "spacious";
  paddingX?: "none" | "compact" | "normal" | "spacious";
  containerWidth: "full" | "boxed" | "narrow" | "mobile";
  distribution?: "start" | "center" | "end" | "between" | "around";
  gap?: "none" | "compact" | "normal" | "spacious" | "monumental";
  alignItems?: "start" | "center" | "end" | "stretch";
  minHeight?: "auto" | "screen" | "large" | "half";
  contentMaxWidth?: "narrow" | "medium" | "wide" | "full";
  reverse?: boolean;
  hidden?: boolean;
}

export interface SectionStyles {
  customBg?: string;
  customText?: string;
  customAccent?: string;
  customSurface?: string;
  ambientGlow?: boolean;
  glowColor?: string;
  borderRadius?: "none" | "sm" | "md" | "lg" | "full";
  borderWidth?: "0" | "1" | "2";
  borderColor?: string;
  surfaceVariant?: "solid" | "glass" | "bordered" | "3d_floating" | "neon";
  bgPattern?: "none" | "grid" | "dots" | "noise";
  bgGradientEnabled?: boolean;
  bgGradientFrom?: string;
  bgGradientTo?: string;
  bgGradientDirection?: "to-b" | "to-t" | "to-r" | "to-br" | "radial";
  bgImage?: string;
  bgOverlayOpacity?: number;
  borderTop?: boolean;
  borderBottom?: boolean;
  borderGlow?: boolean;
  hiddenElements?: Record<string, boolean>;
  typographyOverrides?: Record<string, TypographyOverride>;
}
```

---

## 8. Arquitetura do Component Registry & Padrão Ouro de Engenharia de Componentes

Cada seção do catálogo é registrada em `src/registry/sections/` usando `createSection`.
Os componentes **`HeaderClassic.tsx`** (`src/registry/sections/header/HeaderClassic.tsx`) e **`HeroImpactCenter.tsx`** (`src/registry/sections/hero/HeroImpactCenter.tsx`) são as **Referências Ouro (Golden Templates)** do sistema.

### 8.1. Arquitetura de 2 Camadas DOM no `<SectionWrapper />` (Inviolável)
Para impedir que classes do Tailwind (`max-w-*` e `mx-auto`) entrem em colisão no `tailwind-merge` (`cn()`), o `<SectionWrapper />` separa estritamente a caixa externa da caixa de leitura:

1. **Camada 0 (`<section>`):**
   * Ocupa `100%` da tela, aplica `PADDING_OUTER_MAP[effectivePaddingY]` (Afastamento Externo), `MIN_HEIGHT_MAP[layout.minHeight]` e `VERTICAL_JUSTIFY_MAP[layout.alignItems]` (`justify-start`, `justify-center`, `justify-end`, `justify-between`).
2. **Camada 1 (`<div data-layer="container">` — Palco do Container):**
   * Controla **exclusivamente** a `containerWidth` (`full` = 100%, `boxed` = 1024px, `narrow` = 768px, `mobile` = 448px), `PADDING_INNER_MAP[layout.paddingInner]` (Espessura Interna) e `PADDING_X_MAP[effectivePaddingX]` (Margem Lateral).
   * **PROIBIDO** aplicar `CONTENT_MAX_WIDTH_MAP` nesta `<div>`, pois duas classes `max-w-*` no mesmo nó fazem o `tailwind-merge` sobrescrever a largura do container.
   * No modo Editor quando selecionada (`isEditor && isSelected`), exibe uma guia pontilhada sutil (`outline-1 outline-dashed outline-[#F4B400]/35`) para demarcar visualmente o limite exato entre Afastamento Externo e Espessura Interna.
3. **Camada 2 (`<div data-layer="content-box">` — Caixa de Prosa/Conteúdo):**
   * Filha direta da Camada 1. Aplica `CONTENT_MAX_WIDTH_MAP[layout.contentMaxWidth || "full"]` (`narrow` = `max-w-xl`, `medium` = `max-w-2xl`, `wide` = `max-w-4xl`, `full` = `w-full max-w-none`).
   * Posiciona a si mesma horizontalmente dentro da Camada 1 conforme `layout.distribution`:
     * `start` (**Esq**) $\rightarrow$ `mr-auto ml-0` (vai para o canto esquerdo real do container/página).
     * `end` (**Dir**) $\rightarrow$ `ml-auto mr-0` (vai para o canto direito real do container/página).
     * `center` / `between` / `around` $\rightarrow$ `mx-auto`.

### 8.2. As 8 Regras Obrigatórias para Adaptação de Todos os Componentes (`src/registry/sections/`)

Todo componente adaptado para o motor v2 **DEVE** obedecer rigorosamente a este checklist para que 100% das configurações globais conversem entre si sem conflitos:

1. **Zero Travas Internas de Largura (`max-w-*` e `mx-auto` Hardcoded Proibidos):**
   * **Problema que evita:** Se um componente tiver `max-w-4xl`, `max-w-2xl` ou `mx-auto` fixos em seus wrappers internos ou nos `<EditableText />` de subtítulo/descrição, ele ficará preso no centro e ignorará mudanças em `Largura do Container` e `Largura Máxima do Texto`.
   * **Padrão obrigatório:** O wrapper raiz do componente e seus textos (`headline`, `subtitle`, `description`) devem usar `w-full`. Em `defaultData.layout`, `contentMaxWidth` deve iniciar como `"full"`.
2. **Suporte Completo às 5 Posições Horizontais (`layout.distribution`):**
   * Todo componente deve derivar:
     * `isStart = layout?.distribution === "start"` $\rightarrow$ `items-start text-left justify-start`
     * `isEnd = layout?.distribution === "end"` $\rightarrow$ `items-end text-right justify-end`
     * `isBetween = layout?.distribution === "between"` $\rightarrow$ `justify-between w-full` (espalha botões, métricas, cabeçalhos ou colunas nas extremidades)
     * `isAround = layout?.distribution === "around"` $\rightarrow$ `justify-around w-full`
     * `isCenter` (padrão `"center"`) $\rightarrow$ `items-center text-center justify-center`
   * Todos os sub-blocos (badges, títulos, parágrafos, fileiras de botões CTA, barras de métricas, indicadores) devem obedecer a esse alinhamento.
3. **Suporte Completo às 4 Posições Verticais (`layout.alignItems`):**
   * `start` (**Topo**), `center` (**Centro**), `end` (**Base**) e `stretch` (**Esticar**).
   * Quando `layout?.alignItems === "stretch"`, os wrappers internos do componente devem receber `flex-1 h-full justify-between` para esticar os elementos do topo à base da seção.
   * Em layouts horizontais (Headers, Splits de 2 colunas, barras), `alignItems` deve ser repassado tanto para a fileira principal quanto para sub-grupos internos (nunca deixar `items-center` hardcoded bloqueando `items-start` ou `items-end`).
4. **Espaçamento Dinâmico via `layout.gap` (Proibido `space-y-*` Fixo):**
   * Substituir qualquer `space-y-*` ou `gap-*` estático por mapas reativos a `layout?.gap || "normal"` (`none`, `compact`, `normal`, `spacious`, `monumental`).
   * Conectar `layout.gap` em múltiplos níveis do componente:
     * Gap principal entre elementos/colunas da seção (`gapClasses`).
     * Gap entre botões de ação (`buttonGapClasses`).
     * Gap entre cards/métricas/links (`statsGapClasses` / `gridGapClasses`).
5. **Inversão de Ordem com Sentido de Design (`layout.reverse`):**
   * Quando `Boolean(layout?.reverse)` estiver ativo:
     * Em fileiras horizontais (botões CTA, métricas, links de menu, colunas Split Imagem/Texto): aplicar `flex-row-reverse` (ou `lg:flex-row-reverse`) e inverter arrays quando aplicável.
     * Em seções verticais (como Heros): além de inverter os botões e métricas horizontalmente, inverter a hierarquia de forma útil ao design (ex: mover a barra de métricas/prova social para o topo antes da headline — padrão *Authority Hook*).
6. **Consumo Integral de Superfície, Bordas e Radius (`styles`):**
   * Todo card, item de métrica, cápsula ou superfície interna deve aplicar `getSurfaceClasses(surfaceStyle)` (`solid`, `glass`, `bordered`, `3d_floating`, `neon`) e `getRadiusClass(radiusPreset)` (`none`, `sm`, `md`, `lg`, `full`).
   * Respeitar sempre `styles.customSurface`, `styles.borderColor` e `styles.borderWidth` (`0`, `1`, `2`) via `style={{ ... }}`.
7. **Delegação Limpa em Headers (`section.type.startsWith("header.")`):**
   * Para Headers, o `<SectionWrapper />` aplica apenas `CONTAINER_WIDTH_MAP` no container externo (sem `PADDING_INNER_MAP` ou `PADDING_X_MAP` duplicados), e o próprio componente de Header aplica `paddingInner` (espessura vertical da barra), `paddingX` (margem lateral interna) e `contentMaxWidth` + `contentBoxPositionClass` (`mr-auto ml-0` | `mx-auto` | `ml-auto mr-0`) diretamente dentro da tag `<header>`.
8. **Preservação Integral do `defaultData.layout` na Store (`useStudioStore.ts`):**
   * Ao instanciar qualquer seção (`buildSectionInstance` / `addSection`), a Store deve clonar todas as propriedades de `def.defaultData.layout` (`...deepClone(def.defaultData.layout || {})`), garantindo que nenhum preset padrão da seção seja perdido.

---

## 9. Arquitetura de Ejeção e Entrega Automatizada (GitHub Template Repo + Vercel Free)

Como a Nivix **não** hospeda sites de clientes na sua VPS Hostinger (`KVM-1`), toda entrega opera no modelo **Git-Driven Standalone Runtime**:

1. **O Repositório Template Oficial no GitHub (`nivix-site-runtime-template`):**
   * No GitHub da empresa existe um repositório marcado como *Template Repository* contendo apenas o motor enxuto de renderização (`DynamicRenderer`, os 65 componentes de seção em `src/registry/sections/`, a rota pública `/` que lê `src/data/site-config.json` e a rota protegida `/admin`).
   * Ele **não** carrega o editor pesado do Studio (`useStudioStore`, `@dnd-kit`, barras laterais de criação), apenas o motor de leitura do JSON AST e a área `/admin` do cliente.
2. **Automação 1-Click de Criação de Repositório + Deploy Vercel (Marco 5):**
   * Quando o designer finaliza a LP ou Bio no `lp-forge-v2` e clica em **"Publicar Projeto do Cliente"**:
     1. O backend do Studio (`/api/publish`) chama a **GitHub REST API (`POST /repos/{org}/nivix-site-runtime-template/generate`)** criando automaticamente um repositório novo na organização com o slug do cliente (ex: `cliente-drywall-prime`).
     2. Em seguida, faz o commit automático do `src/data/site-config.json` gerado no Studio para dentro desse novo repositório via GitHub Contents API (`PUT /repos/{org}/{repo}/contents/src/data/site-config.json`).
     3. Chama a **Vercel REST API (`POST /v10/projects`)** vinculando o repositório recém-criado e injetando as variáveis de ambiente (`ADMIN_PASSWORD`, `GITHUB_TOKEN`, `GITHUB_REPO`), subindo o site do cliente no ar automaticamente com URL pronta.
3. **Como a Área `/admin` do Cliente Funciona a Custo Zero (Git-Based CMS):**
   * O cliente acessa `seusite.com/admin` e entra com a sua senha (`ADMIN_PASSWORD`).
   * A interface do `/admin` lê os metadados (`fields`) de cada seção presente no `site-config.json` e renderiza **exclusivamente os campos da Camada 3 (`content`)**: textos, títulos, links de botões, imagens e itens de listas. O cliente **não** tem acesso a `layout` (containers/paddings) nem a `styles` (cores estruturais, fontes ou superfícies), garantindo que jamais quebre o design.
   * Ao clicar em **"Salvar Alterações"** no `/admin`, a rota `/api/admin/save` do projeto do cliente faz um commit direto do `site-config.json` atualizado no próprio repositório GitHub via API. A Vercel detecta o commit e atualiza o site em segundos — **zero banco de dados externo, zero custo mensal e 100% autônomo**.

---

## 10. Histórico de Decisões Arquiteturais (ADRs)

* **ADR 001 — Repositório Separado:** O LP-Forge v2 é isolado do `nivix-os` para evitar poluição do CRM e acoplamento precoce de código.
* **ADR 002 — Engine Própria vs Lib Externa:** Optou-se por construir uma engine própria com **Zustand + Immer + Zod** em vez de adotar `@measured/puck` ou `@craftjs/core`. A engine própria garante controle absoluto do JSON AST, suporte nativo aos cards 3D do Bio, Undo/Redo instantâneo e facilidade de manutenção.
* **ADR 003 — Separação Estrita Designer vs. Cliente:** A chave `content` do bloco é isolada de `layout` e `styles`. No runtime do cliente, a rota `/admin` apenas renderiza formulários baseados em `fields` (`content`), impedindo que o cliente quebre paddings, cores ou a grade do site.
* **ADR 004 — Invólucro Universal de Seções (`<SectionWrapper />`) e Padronização Nativa Total:** Todos os **65 componentes e variações** do catálogo são escritos 100% no padrão nativo `.tsx` (`createSection`), sem adaptadores legados ou containers hardcoded. Paddings, larguras (`Boxed/Full/Narrow/Mobile`), superfícies (`Solid/Glass/Bordered/3D/Neon`), raios de borda, luz ambiente e opcionalidade global funcionam de forma idêntica em 100% dos blocos.
* **ADR 005 — Gestão Completa de Templates e Section Packs:** O Studio suporta CRUD completo de templates inteiros e combos de seções (`Section Packs`) salvos em JSON (`localStorage` + `/api/templates`), com clonagem, edição inline, importação/exportação e exclusão.
* **ADR 006 — Deploy via GitHub Template Repo + Git-CMS:** Em vez de depender de banco de dados para cada cliente ou upload manual de arquivos, o deploy instancia um repositório a partir de um *GitHub Template Repo* oficial com o motor de renderização e usa a própria API do GitHub como persistência gratuita para o `/admin` do cliente na Vercel.

---

## 11. Status dos Marcos de Implementação (Roadmap)

- [x] **Marco 1: Fundação do Projeto & Motor de Estado (Core Engine)**
  - Inicialização limpa com Next.js 16.2.6 (App Router + Turbopack), React 19, TypeScript, Tailwind v4, Zustand, Immer e Zod.
  - Tipagem do AST completo em `src/types/site.ts`.
  - Store reativa com histórico imutável (Undo/Redo) em `src/store/useStudioStore.ts`.
  - Componentes nucleares: `<SectionWrapper />`, `<EditableText />`, `<DynamicIcon />`, `<SmartButton />` e `<DynamicRenderer />`.
- [x] **Marco 2: O Studio Visual Completo & Micro-Customização Profunda**
  - Regra Global de Opcionalidade implementada (`hiddenElements` + switches individuais para ocultar qualquer badge, título, subtítulo, botão, card ou lista sem perder os dados).
  - Sistema `<SmartButton />` e `<ButtonFieldEditor />`: ativação individual por botão, escolha de ícones, posição do ícone (esq/dir), 5 variantes (`solid`, `outline`, `glass`, `3d`, `ghost`), tamanho, radius e 3 seletores de cores exclusivas por botão (fundo, texto e borda).
  - `<ArrayFieldEditor />`, `<SortableLayerList />` (`@dnd-kit`) e `<ThemeGlobalDrawer />`.
- [x] **Marco 3: Conversão 100% Nativa da Grande Biblioteca (65 Componentes e Variações LP + Bio)**
  - Todas as 60 variações do `lp-forge` original + blocos v2 e Bio/Linktree 3D convertidas para `.tsx` nativos em `src/registry/sections/` (5 Headers, 4 Heros, 5 Sobre/Split, 4 Features/Grids, 3 Cardápios/Serviços, 3 Processos, 3 Stats, 2 Antes/Depois, 3 Narrativa/Timeline/Prêmios, 6 Galeria/Portfólio/Hotspots/Reels, 5 Depoimentos incluindo Google Reviews e Vídeo, 3 Prova Social/Logos/Selos, 4 Equipe, 4 Preços, 3 FAQ, 2 LeadGen/StepForm, 5 Contato/Localização, 3 CTA/Divisores, 4 Footers e 4 Bio 3D).
- [x] **Marco 4: Sistema Completo de Gestão de Templates & Section Packs (CRUD)**
  - `<TemplateManagerDrawer />` e persistência em `/api/templates` + `localStorage`.
  - Salvar novo template, sobrescrever template ativo, renomear/editar metadados inline, duplicar, excluir, começar em branco, importar/exportar `.json` e gerenciar Combos de Seções (`Section Packs`).
- [ ] **Fase Atual: Polimento Geral, Ajustes Finos de Design, UX e Novas Funcionalidades do Studio**
- [ ] **Marco 5: Motor de Exportação Automatizado (GitHub Template Repo + Vercel Deploy + Rota `/admin`)**


