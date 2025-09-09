document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const imagens = document.querySelectorAll('.slides img');
  const anteriorBtn = document.querySelector('.anterior');
  const proximoBtn = document.querySelector('.proximo');

  let indice = 0;
  const intervaloTempo = 3000; // 3000ms = 3 segundos
  let timer = null;

  function mostrarSlide() {
    slides.style.transform = `translateX(${-indice * 100}%)`;
  }

  function proximoSlide() {
    indice = (indice + 1) % imagens.length;
    mostrarSlide();
  }

  function anteriorSlide() {
    indice = (indice - 1 + imagens.length) % imagens.length;
    mostrarSlide();
  }

  function iniciarAuto() {
    clearInterval(timer);
    timer = setInterval(proximoSlide, intervaloTempo);
  }

  // eventos dos botões (reseta o intervalo para melhorar UX)
  proximoBtn.addEventListener('click', () => {
    proximoSlide();
    iniciarAuto();
  });

  anteriorBtn.addEventListener('click', () => {
    anteriorSlide();
    iniciarAuto();
  });

  // pausa ao passar o mouse (opcional)
  const container = document.querySelector('.carrossel');
  container.addEventListener('mouseenter', () => clearInterval(timer));
  container.addEventListener('mouseleave', iniciarAuto);

  // inicializa
  mostrarSlide();
  iniciarAuto();
});





const texto = "O QUE VOCÊ PROCURA?";
const elemento = document.getElementById("apresentacao-promocoes");

let i = 0;
let animando = false;

// Função de digitação
function digitar() {
    if (i <= texto.length) {
        elemento.textContent = texto.substring(0, i++);
        setTimeout(digitar, 120); // velocidade da digitação
    } else {
        animando = false; // libera para rodar de novo quando sair/voltar
    }
}

// Observer para detectar quando o elemento aparece na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animando) {
            animando = true;
            i = 0;
            elemento.textContent = ""; // limpa antes de começar
            digitar();
        }
    });
}, { threshold: 0.6 }); // ativa quando ~60% do elemento estiver visível

observer.observe(elemento);





// ===== Abertura/fechamento do carrinho =====
const btnAbrirCarrinho = document.getElementById('abrir-carrinho');
const overlayCarrinho  = document.getElementById('cart-overlay');
const btnFecharCarrinho= document.getElementById('fechar-carrinho');

function abrirCarrinho() {
  overlayCarrinho.classList.add('is-open');
  overlayCarrinho.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // trava scroll do fundo
}

function fecharCarrinho() {
  overlayCarrinho.classList.remove('is-open');
  overlayCarrinho.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // libera scroll
}

btnAbrirCarrinho.addEventListener('click', abrirCarrinho);
btnFecharCarrinho.addEventListener('click', fecharCarrinho);

// Fechar clicando fora do painel
overlayCarrinho.addEventListener('click', (e) => {
  if (e.target === overlayCarrinho) fecharCarrinho();
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlayCarrinho.classList.contains('is-open')) {
    fecharCarrinho();
  }
});





// ===== Navegação lateral =====
const cartItems = document.querySelector(".cart-items");
document.querySelector(".cart-nav.left").addEventListener("click", () => {
  cartItems.scrollBy({ left: -270, behavior: "smooth" });
});
document.querySelector(".cart-nav.right").addEventListener("click", () => {
  cartItems.scrollBy({ left: 270, behavior: "smooth" });
});

// ===== Quantidade =====
document.querySelectorAll(".cart-card").forEach(card => {
  const minus = card.querySelector(".quantity button:first-child");
  const plus = card.querySelector(".quantity button:last-child");
  const qtySpan = card.querySelector(".quantity span");

  let qty = 1;

  minus.addEventListener("click", () => {
    if (qty > 1) {
      qty--;
      qtySpan.textContent = qty;
    }
  });

  plus.addEventListener("click", () => {
    qty++;
    qtySpan.textContent = qty;
  });
});