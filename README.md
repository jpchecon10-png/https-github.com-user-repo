# ✨ Dr. Dieison Dahmer | Odontologia Estética

Site institucional de alto padrão para a clínica **Dr. Dieison Dahmer | Odontologia Estética**, em Foz do Iguaçu - PR. Design minimalista e sofisticado (marfim, dourado e verde escuro), com hero de impacto, seção sobre o profissional, tratamentos, diferenciais, casos clínicos, avaliações de pacientes e contato com agendamento direto pelo WhatsApp.

É um site 100% estático (HTML + CSS + JS puro, sem frameworks nem build), então basta abrir `index.html` no navegador ou publicar em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel etc).

## Estrutura

```
index.html      → estrutura da página (hero, sobre, tratamentos, diferenciais, transformações, avaliações, contato)
css/style.css   → identidade visual, layout, responsividade e animações
js/script.js    → header dinâmico, menu mobile, animações de rolagem, botão voltar ao topo
```

## Como personalizar

1. **Número do WhatsApp** — o número `(45) 99148-1461` aparece em `index.html` nos links `https://wa.me/5545991481461` (botão hero, seção de contato e botão flutuante). Substitua pelo número real no formato `55 + DDD + número`, só dígitos.
2. **Endereço e mapa** — edite a seção `#contato` em `index.html`; o mapa incorporado usa o endereço via Google Maps embed (`src` do `<iframe>`).
3. **Instagram** — links `@drdieisondahmer` estão na seção Sobre, Contato e Rodapé.
4. **Fotos reais** — os espaços de foto do profissional (`.sobre-photo`) e dos casos de antes/depois (`.case-compare`) usam blocos ilustrativos em CSS. Basta substituir por tags `<img>` reais quando as fotos estiverem disponíveis.
5. **Cores** — toda a paleta (marfim, bege, dourado, verde escuro) está centralizada em `:root` no topo de `css/style.css`.

## SEO

- **Title:** Dr. Dieison Dahmer | Odontologia Estética em Foz do Iguaçu
- **Description:** Clínica de odontologia estética em Foz do Iguaçu especializada em lentes de contato dental, facetas, implantes e tratamentos personalizados.
- Dados estruturados (`schema.org/Dentist`) incluídos no `<head>` para melhorar a indexação local.

## Rodando localmente

Não precisa de instalação. Basta um servidor estático simples, por exemplo:

```bash
python3 -m http.server 8000
```

E acessar `http://localhost:8000`.
