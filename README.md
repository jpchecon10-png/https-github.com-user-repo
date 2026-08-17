# 🫐 Fronteira do Açaí

Landing page completa para a **Fronteira do Açaí**, sorveteria/açaiteria com buffet self-service e delivery em Foz do Iguaçu (PR): hero de destaque, seção "como funciona o buffet", cardápio em abas (açaí/copos, sorvetes, coberturas, bebidas) com carrinho persistente, diferenciais, chamada para avaliação no Google e contato com mapa — tudo com pedido finalizado direto pelo WhatsApp.

É um site 100% estático e de arquivo único (HTML com CSS e JS embutidos, sem frameworks nem build), então basta abrir `index.html` no navegador ou publicar em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel etc).

## Estrutura

```
index.html   → página inteira: marcação, estilos e interações num único arquivo
```

## Como personalizar

1. **Número do WhatsApp** — troque `5545998485949` em todos os links `https://wa.me/...` espalhados pelo `index.html` (header, hero, botão flutuante, footer e checkout do carrinho) e na constante `WHATSAPP_NUMBER` no script.
2. **Cardápio** — os itens ficam nos blocos `.menu-item` dentro de `#cardapio`, organizados em abas (`Açaí & Copos`, `Sorvetes`, `Coberturas & Adicionais`, `Bebidas`). Os preços e sabores são exemplos — troque pelos valores e sabores reais do dia.
3. **Endereço/horário/redes** — edite a seção `<footer id="contato">`, incluindo o link do Instagram e o embed do Google Maps (o `src` do `iframe` usa o endereço em texto, sem precisar de chave de API).
4. **Horário de funcionamento** — hoje está como "Segunda-feira — Fechado" e "Terça a domingo — 14:00 às 22:00" com base na informação parcial disponível ("Fechado · Abre ter. às 14:00"); ajuste para o horário real completo da loja.
5. **Cores** — todas as cores principais estão centralizadas em `:root` no topo do `<style>` (`--acai`, `--pink`, `--gold`, `--cream` etc).

## Rodando localmente

Não precisa de instalação. Basta um servidor estático simples, por exemplo:

```bash
python3 -m http.server 8000
```

E acessar `http://localhost:8000`.
