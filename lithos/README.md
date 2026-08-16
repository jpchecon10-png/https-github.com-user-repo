# Lithos — Hero Section

Full-screen, dark-themed hero section for a geology brand ("Lithos"), built with **React 18 + TypeScript + Vite + Tailwind CSS** and **lucide-react**.

The signature feature is a cursor-following spotlight (`src/components/RevealLayer.tsx`) that reveals a second background image through a soft circular canvas-generated mask over a base image (`src/components/Hero.tsx`).

## Estrutura

```
src/components/Hero.tsx        → seção hero completa: nav fixa, mouse tracking suavizado (RAF/lerp), textos, CTA
src/components/RevealLayer.tsx → camada de revelação: canvas oculto gera a máscara radial que segue o cursor
src/index.css                  → fontes (Inter / Playfair Display), diretivas Tailwind, keyframes de entrada
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

## Observação sobre as imagens

`BG_IMAGE_1` e `BG_IMAGE_2` (em `Hero.tsx`) apontam para URLs externas (`images.higgs.ai`). Em redes com proxy restritivo elas podem não carregar — troque pelas suas próprias imagens se necessário.
