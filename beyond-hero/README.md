# Beyond Hero

Landing page de página única ("Beyond Hero"): hero em tela cheia com o título "BEYOND" empilhado em camadas de cor, personagem 3D sobreposto e colunas de palavras nas laterais que reagem ao scroll, seguido de uma faixa de marquee infinita. Construído com **React + Vite + TypeScript + Tailwind CSS**.

## Estrutura

```
src/components/Hero.tsx    → seção hero (120vh): título "BEYOND" em 4 camadas, personagem, colunas de palavras animadas por scroll
src/components/Marquee.tsx → faixa branca com texto rolando infinitamente
src/index.css               → fonte Bamboly Demo (@font-face), Tailwind, keyframes do marquee
```

## Rodando localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Observação sobre as imagens/fontes

A imagem do personagem e a fonte "Bamboly Demo" apontam para URLs externas (`images.higgs.ai` e `db.onlinewebfonts.com`). Em redes com proxy restritivo elas podem não carregar.
