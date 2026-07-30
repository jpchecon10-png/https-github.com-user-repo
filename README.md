# 🍕 Mega Pizza

Site (landing page) completo para uma pizzaria fictícia chamada **Mega Pizza**: hero de destaque, diferenciais, banner de promoção, cardápio gigante (pizzas salgadas, doces e bebidas) com carrinho de compras, depoimentos de clientes e seção de contato — tudo com pedido finalizado direto pelo WhatsApp.

É um site 100% estático (HTML + CSS + JS puro, sem frameworks nem build), então basta abrir `index.html` no navegador ou publicar em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel etc).

## Estrutura

```
index.html      → estrutura da página
css/style.css   → todo o visual (cores, layout, responsividade, animações)
js/script.js    → dados do cardápio, carrinho, abas, depoimentos, interações
```

## Como personalizar

1. **Número do WhatsApp** — em `js/script.js`, troque a constante no topo do arquivo:
   ```js
   const WHATSAPP_NUMBER = '5500000000000'; // formato: 55 + DDD + número, só dígitos
   ```
2. **Endereço, telefone, horário** — edite a seção `#contato` em `index.html`.
3. **Cardápio** — todo o cardápio (pizzas e bebidas) vem do array `MENU` em `js/script.js`. Adicione, remova ou edite itens (nome, descrição, preço, sabor/arte, tags e selo).
4. **Fotos reais** — as pizzas e bebidas usam ilustrações 100% em CSS (nenhuma imagem externa, então nada quebra e carrega instantâneo). Se você tiver fotos reais dos produtos, é só trocar o conteúdo de `.card-top` por uma tag `<img>` apontando para o arquivo da foto — a função `artFor(item)` em `js/script.js` é o único lugar que precisa mudar.
5. **Cores** — todas as cores principais estão centralizadas em `:root` no topo de `css/style.css` (`--red`, `--orange`, `--gold`, `--cream` etc).

## Rodando localmente

Não precisa de instalação. Basta um servidor estático simples, por exemplo:

```bash
python3 -m http.server 8000
```

E acessar `http://localhost:8000`.
