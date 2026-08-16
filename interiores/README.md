# Alma Interiores

Landing page completa para um estúdio fictício de design de interiores, **Alma Interiores**: hero com estatísticas, seção sobre, serviços, portfólio com filtros por categoria, processo de trabalho em 4 etapas, depoimentos e formulário de contato que finaliza o pedido direto pelo WhatsApp.

É um site 100% estático e de arquivo único (HTML com CSS e JS embutidos, sem frameworks nem build), então basta abrir `index.html` no navegador ou publicar em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel etc).

## Estrutura

```
index.html   → página inteira: marcação, estilos e interações num único arquivo
```

## Como personalizar

1. **WhatsApp** — troque `5500000000000` na constante `WHATS_NUMBER` no `<script>` do `index.html`.
2. **Portfólio** — os itens ficam em `.p-item` dentro de `#portfolioGrid`, com `data-cat` (`residencial`, `comercial`, `cozinha`) usado pelos filtros. Troque os gradientes de `.p-art` por fotos reais dos projetos quando disponíveis.
3. **Endereço/horário/redes** — edite o `<footer>`.
4. **Cores** — todas as cores principais estão centralizadas em `:root` no topo do `<style>` (`--cream`, `--terracotta`, `--olive`, `--gold`, `--charcoal`).
5. **Depoimentos e serviços** — textos diretamente nas seções `#depoimentos` e `#servicos`.

## Rodando localmente

Não precisa de instalação. Basta um servidor estático simples, por exemplo:

```bash
python3 -m http.server 8000
```

E acessar `http://localhost:8000`.
