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
const elemento = document.getElementById("apresentacao-inicio");

let i = 0;
let apagando = false;

function digitar() {
    if (!apagando) {
        elemento.textContent = texto.substring(0, i++);
        if (i > texto.length) {
            apagando = true;
            setTimeout(digitar, 5000); // pausa de 5s antes de apagar
            return;
        }
    } else {
        elemento.textContent = texto.substring(0, i--);
        if (i < 0) {
            apagando = false;
        }
    }
    setTimeout(digitar, 120); // velocidade da digitação
}

digitar();