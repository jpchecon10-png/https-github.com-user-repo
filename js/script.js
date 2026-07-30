/* ============================================================
   MEGA PIZZA — app.js
   ============================================================ */

/* ---------- CONFIG ---------- */
// TODO: troque pelo número real da pizzaria no formato 55DDDNUMERO (sem espaços/símbolos)
const WHATSAPP_NUMBER = '5500000000000';
const STORE_NAME = 'Mega Pizza';

/* ---------- SCATTER POINTS (posições reutilizadas para toppings) ---------- */
const PT = [
  { x: 22, y: 26 }, { x: 50, y: 15 }, { x: 77, y: 24 },
  { x: 84, y: 52 }, { x: 70, y: 76 }, { x: 44, y: 84 },
  { x: 18, y: 70 }, { x: 13, y: 46 }, { x: 37, y: 48 },
  { x: 61, y: 44 }, { x: 50, y: 62 }
];

function topping(idx, w, h, color, opts = {}) {
  const p = PT[idx % PT.length];
  const rot = opts.rot ?? (idx * 37) % 360;
  const radius = opts.radius || '50%';
  return `<span class="topping ${opts.shadow === false ? '' : 'topping-shadow'}" style="
    left:${p.x}%; top:${p.y}%; width:${w}px; height:${h}px;
    transform:translate(-50%,-50%) rotate(${rot}deg);
    background:${color}; border-radius:${radius};
  "></span>`;
}

function flecks(color, count, seedOffset = 0) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const p = PT[(i + seedOffset) % PT.length];
    const jx = (i * 13) % 10 - 5;
    const jy = (i * 7) % 10 - 5;
    out += `<span class="topping" style="
      left:${p.x + jx}%; top:${p.y + jy}%; width:4px; height:4px;
      transform:translate(-50%,-50%); background:${color}; border-radius:50%; opacity:.8;
    "></span>`;
  }
  return out;
}

/* ---------- PIZZA ART RECIPES ---------- */
const RECIPES = {
  pepperoni: (cheese = '#ffcf5c') => `
    ${[0,1,2,3,4,5,6].map(i => topping(i, 30, 30, 'radial-gradient(circle at 35% 30%, #c8433a, #8f1f1a 78%)')).join('')}
    ${topping(8, 26, 26, 'radial-gradient(circle at 35% 30%, #c8433a, #8f1f1a 78%)')}
    ${flecks('#3d6b2a', 10, 2)}
  `,
  catupiry: () => `
    ${[0,2,4,6,8].map(i => topping(i, 40, 30, '#fbf6e8', { radius: '60% 40% 55% 45%/50% 60% 40% 50%', shadow:false })).join('')}
    ${[1,3,5,7].map(i => topping(i, 22, 22, 'radial-gradient(circle at 35% 30%, #f4f0e2, #d8cdb0)')).join('')}
    ${flecks('#3d6b2a', 8, 1)}
  `,
  'frango-catupiry': () => `
    ${[0,2,4,9].map(i => topping(i, 34, 22, 'linear-gradient(120deg,#e6b87f,#c98f52)', { radius:'40% 60% 55% 45%/45% 55% 45% 55%' })).join('')}
    ${[1,3,5].map(i => topping(i, 30, 24, '#fbf6e8', { radius: '55% 45% 60% 40%/50% 55% 45% 50%', shadow:false })).join('')}
    ${topping(6, 16, 16, 'radial-gradient(circle at 35% 30%, #f6e07a, #d9b93f)')}
    ${flecks('#3d6b2a', 10, 3)}
  `,
  calabresa: () => `
    ${[0,1,2,3,4,5,6,8].map(i => topping(i, 26, 20, 'linear-gradient(135deg,#a8382a,#6e1f16)', { radius:'45% 55% 50% 50%/60% 40% 60% 40%' })).join('')}
    ${[1,5].map(i => topping(i, 22, 22, 'transparent', { radius:'50%', shadow:false, rot:0 })).join('')}
    ${flecks('#3d6b2a', 8, 4)}
  `,
  'quatro-queijos': () => `
    ${topping(0, 46, 34, 'radial-gradient(circle at 35% 30%, #fff7dd, #f0dca0)', { radius:'55% 45% 60% 40%/50% 60% 40% 50%', shadow:false })}
    ${topping(3, 40, 30, 'radial-gradient(circle at 35% 30%, #f7e79a, #dcb84c)', { radius:'50%', shadow:false })}
    ${topping(6, 38, 30, '#fbf6e8', { radius:'55% 45% 55% 45%/50% 55% 45% 50%', shadow:false })}
    ${topping(9, 30, 24, 'radial-gradient(circle at 35% 30%, #f2e2c0, #d8b979)', { radius:'50%', shadow:false })}
    ${flecks('#5b6f8f', 10, 5)}
  `,
  margherita: () => `
    ${[0,2,5,7].map(i => topping(i, 34, 34, 'radial-gradient(circle at 35% 30%, #e6584a, #a8241c)')).join('')}
    ${[1,4,8].map(i => topping(i, 26, 14, 'linear-gradient(120deg,#3d7a2e,#265019)', { radius:'10% 90% 10% 90%/60% 60% 40% 40%' })).join('')}
    ${flecks('#fdfaf1', 12, 6)}
  `,
  portuguesa: () => `
    ${[0,3,6].map(i => topping(i, 24, 18, 'radial-gradient(circle at 35% 30%, #f0c98a,#c99a54)', { radius:'50%' })).join('')}
    ${[1,4].map(i => topping(i, 22, 22, 'radial-gradient(circle at 40% 30%, #fff7dd 20%, #f3d888 45%, #e8a83c 46%)')).join('')}
    ${[2,7].map(i => topping(i, 20, 20, 'transparent', { radius:'50%', shadow:false })).join('')}
    ${[5,9].map(i => topping(i, 12, 12, '#3d7a2e')).join('')}
    ${flecks('#3d6b2a', 8, 7)}
  `,
  'bacon-cheddar': () => `
    ${[0,2,4,6,8,9].map(i => topping(i, 30, 12, 'linear-gradient(100deg,#c8493a,#8a2c20 45%,#e6a86b 46%,#c8493a)', { radius:'20%' })).join('')}
    ${[1,5].map(i => topping(i, 26, 26, 'radial-gradient(circle at 35% 30%,#ffb347,#e8871f)')).join('')}
    ${flecks('#3d6b2a', 6, 8)}
  `,
  'chocolate-morango': () => `
    ${[0,2,4,6,8].map(i => topping(i, 32, 26, 'radial-gradient(circle at 35% 25%, #e6534a, #a81f22)', { radius:'50% 50% 50% 50%/60% 60% 40% 40%' })).join('')}
    ${[1,3,5].map(i => topping(i, 3, 20, 'linear-gradient(#fff,#fff0e0)', { radius:'40%', rot:(idx=>idx*47)(i) })).join('')}
    ${flecks('#fff', 14, 9)}
  `,
  'banana-canela': () => `
    ${[0,1,2,3,4,5,6].map(i => topping(i, 34, 20, 'radial-gradient(circle at 35% 30%, #fdf0b0, #e8d27a)', { radius:'50%' })).join('')}
    ${flecks('#a5722f', 16, 10)}
  `,
  prestigio: () => `
    ${[0,2,4,6,8].map(i => topping(i, 30, 24, 'radial-gradient(circle at 35% 25%, #6b4226, #3a220f)', { radius:'55% 45% 60% 40%/50% 60% 40% 50%' })).join('')}
    ${flecks('#fff', 22, 11)}
  `,
  'romeu-julieta': () => `
    ${[0,2,4,6,8,9].map(i => topping(i, 22, 22, 'linear-gradient(135deg,#c8543a,#8f2f1c)', { radius:'22%' })).join('')}
    ${flecks('#fbf6e8', 10, 12)}
  `
};

function pizzaArt(flavor, cheese) {
  const fn = RECIPES[flavor] || RECIPES.pepperoni;
  return `<div class="pizza-art" data-flavor="${flavor}" style="--pz-cheese:${cheese}">${fn(cheese)}</div>`;
}

function drinkArt(type, color, cap, isBottle, isWater) {
  const cls = `drink-art ${isBottle ? 'bottle' : ''} ${isWater ? 'water' : ''}`;
  return `<div class="${cls}" style="--dk-color:${color};--cap-color:${cap || '#eee'}">
    ${isBottle ? '<span class="neck"></span><span class="cap"></span>' : ''}
    <span class="can"><span class="shine"></span></span>
    <span class="label">${type}</span>
  </div>`;
}

/* ---------- MENU DATA ---------- */
const MENU = [
  // ---- SALGADAS ----
  { id: 'p1', cat: 'salgada', name: 'Pepperoni Supreme', desc: 'Molho de tomate especial, muçarela generosa e fatias fartas de pepperoni.', price: 54.9, tags: ['Picante leve','Clássica'], badge: 'hot', flavor: 'pepperoni', cheese: '#ffcf5c' },
  { id: 'p2', cat: 'salgada', name: 'Catupiry Clássica', desc: 'Muçarela derretida coberta com muito catupiry original, cremoso do jeito que você ama.', price: 52.9, tags: ['Cremosa'], badge: 'hot', flavor: 'catupiry', cheese: '#ffd873' },
  { id: 'p3', cat: 'salgada', name: 'Frango com Catupiry', desc: 'Frango desfiado temperado, catupiry cremoso e milho, a queridinha do Brasil inteiro.', price: 56.9, tags: ['Mais pedida'], badge: 'hot', flavor: 'frango-catupiry', cheese: '#ffd06a' },
  { id: 'p4', cat: 'salgada', name: 'Calabresa Especial', desc: 'Calabresa fatiada, cebola roxa e azeitonas — sabor que não erra nunca.', price: 49.9, tags: ['Tradicional'], flavor: 'calabresa', cheese: '#ffcf5c' },
  { id: 'p5', cat: 'salgada', name: 'Quatro Queijos', desc: 'Muçarela, provolone, parmesão e catupiry em uma combinação irresistível.', price: 58.9, tags: ['Para quem ama queijo'], flavor: 'quatro-queijos', cheese: '#fff0c2' },
  { id: 'p6', cat: 'salgada', name: 'Margherita Fresca', desc: 'Muçarela de búfala, tomate fresco, manjericão e um fio de azeite extra virgem.', price: 51.9, tags: ['Vegetariana'], badge: 'new', flavor: 'margherita', cheese: '#fff6e0' },
  { id: 'p7', cat: 'salgada', name: 'Portuguesa Gigante', desc: 'Presunto, ovo, cebola, azeitona, ervilha e muçarela — completa do jeito certo.', price: 55.9, tags: ['Completa'], flavor: 'portuguesa', cheese: '#ffcf5c' },
  { id: 'p8', cat: 'salgada', name: 'Bacon com Cheddar', desc: 'Bacon crocante, molho cheddar cremoso e muçarela derretida na medida.', price: 57.9, tags: ['Defumada'], badge: 'new', flavor: 'bacon-cheddar', cheese: '#ffd873' },

  // ---- DOCES ----
  { id: 'd1', cat: 'doce', name: 'Chocolate com Morango', desc: 'Camada generosa de chocolate ao leite, morangos fresquinhos e raspas de chocolate branco.', price: 46.9, tags: ['Doce'], badge: 'hot', flavor: 'chocolate-morango', cheese: '#7a4a2c' },
  { id: 'd2', cat: 'doce', name: 'Banana com Canela', desc: 'Banana caramelizada, leite condensado e um toque generoso de canela.', price: 42.9, tags: ['Doce'], flavor: 'banana-canela', cheese: '#fdf3d8' },
  { id: 'd3', cat: 'doce', name: 'Prestígio', desc: 'Chocolate cremoso coberto com muito coco ralado, igualzinho ao docinho.', price: 44.9, tags: ['Doce'], badge: 'new', flavor: 'prestigio', cheese: '#6b4226' },
  { id: 'd4', cat: 'doce', name: 'Romeu e Julieta', desc: 'Muçarela derretida com generosos cubos de goiabada — o clássico casal brasileiro.', price: 43.9, tags: ['Doce'], flavor: 'romeu-julieta', cheese: '#fff6e0' },

  // ---- BEBIDAS ----
  { id: 'b1', cat: 'bebida', name: 'Coca-Cola 2L', desc: 'Bem gelada, para acompanhar sua pizza mega do jeito certo.', price: 14.9, art: () => drinkArt('COCA‑COLA', '#c62828', '#c62828', true), badge: null },
  { id: 'b2', cat: 'bebida', name: 'Guaraná Antarctica 2L', desc: 'O refri mais brasileiro, gelado e borbulhante.', price: 13.9, art: () => drinkArt('GUARANÁ', '#7cb342', '#7cb342', true) },
  { id: 'b3', cat: 'bebida', name: 'Fanta Laranja 2L', desc: 'Doce, cítrico e refrescante para equilibrar o sabor da pizza.', price: 13.9, art: () => drinkArt('FANTA', '#f57c00', '#f57c00', true) },
  { id: 'b4', cat: 'bebida', name: 'Coca-Cola Lata', desc: 'A lata gelada clássica, individual.', price: 6.9, art: () => drinkArt('COCA‑COLA', '#c62828', '#c62828', false) },
  { id: 'b5', cat: 'bebida', name: 'Sprite Lata', desc: 'Refrescância de limão em lata individual bem gelada.', price: 6.9, art: () => drinkArt('SPRITE', '#2e7d32', '#2e7d32', false) },
  { id: 'b6', cat: 'bebida', name: 'Água Mineral 500ml', desc: 'Água gelada sem gás para acompanhar seu pedido.', price: 4.5, art: () => drinkArt('ÁGUA', '#4fa8d8', '#4fa8d8', false, true) },
];

const BADGES = { hot: '🔥 Mais pedida', new: '🆕 Novidade', spicy: '🌶️ Picante' };
const BADGE_CLASS = { hot: 'badge-hot', new: 'badge-new', spicy: 'badge-spicy' };

function fmtPrice(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function artFor(item) {
  return item.art ? item.art() : pizzaArt(item.flavor, item.cheese);
}

/* ---------- RENDER MENU ---------- */
const menuGrid = document.getElementById('menuGrid');

function renderMenu(filter = 'todos') {
  menuGrid.innerHTML = MENU.map(item => {
    const hide = filter !== 'todos' && item.cat !== filter ? 'hide' : '';
    return `
    <article class="menu-card ${hide}" data-cat="${item.cat}">
      ${item.badge ? `<div class="card-badges"><span class="badge ${BADGE_CLASS[item.badge]}">${BADGES[item.badge]}</span></div>` : ''}
      <div class="card-top">${artFor(item)}</div>
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        ${item.tags ? `<div class="card-tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
        <div class="card-footer">
          <div class="card-price"><small>a partir de</small>${fmtPrice(item.price)}</div>
          <button class="add-btn" data-id="${item.id}" aria-label="Adicionar ${item.name}">+</button>
        </div>
      </div>
    </article>`;
  }).join('');
}
renderMenu();

/* ---------- TABS ---------- */
document.getElementById('menuTabs').addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenu(btn.dataset.filter);
});

document.querySelectorAll('[data-filter-link]').forEach(link => {
  link.addEventListener('click', e => {
    const filter = link.dataset.filterLink;
    const tabBtn = document.querySelector(`.tab-btn[data-filter="${filter}"]`);
    if (tabBtn) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      renderMenu(filter);
    }
  });
});

/* ============================================================
   CART
   ============================================================ */
let cart = JSON.parse(localStorage.getItem('megapizza_cart') || '[]');

function saveCart() { localStorage.setItem('megapizza_cart', JSON.stringify(cart)); }

function addToCart(id) {
  const item = MENU.find(m => m.id === id);
  if (!item) return;
  const line = cart.find(c => c.id === id);
  if (line) line.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  renderCart();
  showToast(`${item.name} adicionado ao carrinho! 🍕`);
}

function updateQty(id, delta) {
  const line = cart.find(c => c.id === id);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
}

function removeLine(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
}

const cartItemsEl = document.getElementById('cartItems');
const cartEmptyEl = document.getElementById('cartEmpty');
const cartFooterEl = document.getElementById('cartFooter');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');

function renderCart() {
  const lines = cart.map(c => ({ ...c, item: MENU.find(m => m.id === c.id) })).filter(c => c.item);

  cartItemsEl.querySelectorAll('.cart-line').forEach(el => el.remove());

  if (lines.length === 0) {
    cartEmptyEl.style.display = 'block';
    cartFooterEl.classList.remove('show');
  } else {
    cartEmptyEl.style.display = 'none';
    cartFooterEl.classList.add('show');
    lines.forEach(({ id, qty, item }) => {
      const el = document.createElement('div');
      el.className = 'cart-line';
      el.innerHTML = `
        <div class="mini-art">${artFor(item)}</div>
        <div class="cart-line-info">
          <h4>${item.name}</h4>
          <span>${fmtPrice(item.price * qty)}</span>
        </div>
        <div class="qty-control">
          <button data-act="minus" data-id="${id}">−</button>
          <span>${qty}</span>
          <button data-act="plus" data-id="${id}">+</button>
        </div>
        <button class="remove-line" data-act="remove" data-id="${id}" aria-label="Remover">🗑</button>
      `;
      cartItemsEl.appendChild(el);
    });
  }

  const total = lines.reduce((sum, l) => sum + l.item.price * l.qty, 0);
  cartTotalEl.textContent = fmtPrice(total);

  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  cartCountEl.textContent = count;
  cartCountEl.style.display = count > 0 ? 'flex' : 'none';

  const msg = buildWhatsAppMessage(lines, total);
  checkoutBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function buildWhatsAppMessage(lines, total) {
  if (lines.length === 0) {
    return `Olá! Vim pelo site da ${STORE_NAME} e gostaria de fazer um pedido. 🍕`;
  }
  let msg = `Olá! Vim pelo site da ${STORE_NAME} e quero fazer o seguinte pedido:\n\n`;
  lines.forEach(({ qty, item }) => {
    msg += `• ${qty}x ${item.name} — ${fmtPrice(item.price * qty)}\n`;
  });
  msg += `\n*Total: ${fmtPrice(total)}*\n\nAguardo confirmação, obrigado(a)!`;
  return msg;
}

cartItemsEl.addEventListener('click', e => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const { act, id } = btn.dataset;
  if (act === 'plus') updateQty(id, 1);
  if (act === 'minus') updateQty(id, -1);
  if (act === 'remove') removeLine(id);
});

menuGrid.addEventListener('click', e => {
  const btn = e.target.closest('.add-btn');
  if (!btn) return;
  btn.classList.remove('pop');
  void btn.offsetWidth;
  btn.classList.add('pop');
  addToCart(btn.dataset.id);
});

/* ---------- CART DRAWER TOGGLE ---------- */
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');

function openCart() {
  cartDrawer.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

/* ---------- WHATSAPP LINKS (general) ---------- */
const generalWhatsMsg = encodeURIComponent(`Olá! Vim pelo site da ${STORE_NAME} e gostaria de fazer um pedido. 🍕`);
['heroWhats', 'floatWhats', 'contatoWhats'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${generalWhatsMsg}`;
});

/* ---------- TOAST ---------- */
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(text) {
  toastEl.textContent = text;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
}

/* ---------- HEADER / NAV ---------- */
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 500);
});

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.classList.toggle('active');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

/* ---------- BACK TO TOP ---------- */
document.getElementById('backTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- REVEAL ON SCROLL ---------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ---------- COUNTERS ---------- */
const counters = document.querySelectorAll('.counter');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const decimal = el.dataset.decimal;
    const finalVal = decimal ? parseFloat(`${target}.${decimal}`) : target;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = finalVal * eased;
      el.textContent = decimal ? val.toFixed(1) : Math.floor(val).toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = decimal ? finalVal.toFixed(1) : finalVal.toLocaleString('pt-BR');
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterIO.observe(el));

/* ============================================================
   TESTEMUNHOS
   ============================================================ */
const TESTIMONIALS = [
  { name: 'Juliana Alves', role: 'Cliente fiel', text: 'A pizza de frango com catupiry é simplesmente perfeita! Tamanho gigante e chega sempre quentinha.', stars: 5 },
  { name: 'Rafael Souza', role: 'Cliente há 2 anos', text: 'Melhor pepperoni da cidade, sem dúvidas. Entrega super rápida e atendimento nota 10.', stars: 5 },
  { name: 'Camila Torres', role: 'Cliente nova', text: 'A pizza doce de chocolate com morango é de outro mundo. Virou tradição de sexta-feira aqui em casa!', stars: 5 },
  { name: 'Diego Martins', role: 'Cliente fiel', text: 'Peço toda semana o combo família. Vale cada centavo, pizza enorme e muito saborosa.', stars: 4 },
];

const testiTrack = document.getElementById('testiTrack');
const testiDots = document.getElementById('testiDots');
let testiIndex = 0;

function renderTestimonials() {
  testiTrack.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testi-card ${i === 0 ? 'active' : ''}">
      <div class="testi-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p class="testi-quote">"${t.text}"</p>
      <div class="testi-person">
        <div class="testi-avatar">${t.name.split(' ').map(n => n[0]).join('')}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
  testiDots.innerHTML = TESTIMONIALS.map((_, i) => `<span class="${i === 0 ? 'active' : ''}" data-i="${i}"></span>`).join('');
}
renderTestimonials();

function goToTesti(i) {
  const cards = testiTrack.querySelectorAll('.testi-card');
  const dots = testiDots.querySelectorAll('span');
  cards[testiIndex].classList.remove('active');
  dots[testiIndex].classList.remove('active');
  testiIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
  cards[testiIndex].classList.add('active');
  dots[testiIndex].classList.add('active');
}

document.getElementById('testiPrev').addEventListener('click', () => goToTesti(testiIndex - 1));
document.getElementById('testiNext').addEventListener('click', () => goToTesti(testiIndex + 1));
testiDots.addEventListener('click', e => {
  if (e.target.dataset.i !== undefined) goToTesti(parseInt(e.target.dataset.i));
});
setInterval(() => goToTesti(testiIndex + 1), 6000);

/* ---------- CONTACT FORM (demo) ---------- */
document.getElementById('contatoForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast('Mensagem enviada! Em breve entraremos em contato. 🍕');
  e.target.reset();
});

/* ---------- FOOTER YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- HERO & PROMO ART ---------- */
const heroPlate = document.getElementById('heroPlate');
if (heroPlate) heroPlate.innerHTML = pizzaArt('pepperoni', '#ffcf5c');

const promoVisual = document.getElementById('promoVisual');
if (promoVisual) {
  promoVisual.innerHTML = `
    <div class="pizza-art pizza-lg promo-pizza-1" style="--pz-cheese:#ffd06a">${RECIPES['frango-catupiry']()}</div>
    <div class="pizza-art pizza-md promo-pizza-2" style="--pz-cheese:#7a4a2c">${RECIPES['chocolate-morango']()}</div>
    ${drinkArt('COCA‑COLA', '#c62828', '#c62828', true).replace('class="drink-art', 'class="drink-art drink-lg promo-drink')}
  `;
}

/* ---------- INIT ---------- */
renderCart();
window.addEventListener('load', () => {
  document.getElementById('loader').classList.add('hide');
});
