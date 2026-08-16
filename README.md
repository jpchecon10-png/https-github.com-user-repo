# 🥖 Dr. Baguete

Landing page completa para uma baguetteria fictícia chamada **Dr. Baguete**: hero de destaque, tira de diagnóstico (números da casa), cardápio em abas ("receituário"), cartão de fidelidade interativo (simulação de carimbos), seção "por que a gente" e CTA final — tudo com pedido finalizado direto pelo WhatsApp.

É um site 100% estático e de arquivo único (HTML com CSS e JS embutidos, sem frameworks nem build), então basta abrir `index.html` no navegador ou publicar em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel etc).

## Estrutura

```
index.html   → página inteira: marcação, estilos e interações num único arquivo
```

## Como personalizar

1. **Número do WhatsApp** — troque `5500000000000` em todos os links `https://wa.me/...` espalhados pelo `index.html` (botão do header, hero, CTA final, footer e botão flutuante).
2. **Cardápio** — os itens ficam nos blocos `.rx-card` dentro de `#cardapio`, organizados em abas (`Clássicas`, `Receita Forte`, `Bebidas`, `Sobremesas`). É um cardápio de exemplo — troque nomes, descrições e preços pelos reais.
3. **Endereço/horário/redes** — edite a seção `<footer id="contato">`.
4. **Regras de fidelidade** — o texto e a lógica (3 compras = 15% off) estão na seção `#fidelidade`; a simulação de carimbos roda em JS no fim do arquivo.
5. **Cores** — todas as cores principais estão centralizadas em `:root` no topo do `<style>` (`--cream`, `--tomato`, `--basil`, `--crust` etc).

## Rodando localmente

Não precisa de instalação. Basta um servidor estático simples, por exemplo:

```bash
python3 -m http.server 8000
```

E acessar `http://localhost:8000`.
