//Implementa a lógica do jogo da velha, incluindo alternância de jogadores, verificação de vitória e empate, e reinício do jogo.//

document.addEventListener("DOMContentLoaded", (event) => {
  const buttons = document.querySelectorAll('main input[type="button"]');
  const reiniciarButton = document.getElementById("reiniciar");
  const jogadorSpan = document.getElementById("jogador");
  let jogadorAtual = "X";

  const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function iniciarJogo() {
    console.log("Iniciando jogo...");
    buttons.forEach((button, index) => {
      button.value = "";
      button.disabled = false;
      button.dataset.index = index;
      button.addEventListener("click", handleClick, { once: true });
    });
    jogadorAtual = "X";
    jogadorSpan.textContent = jogadorAtual;
  }

  function handleClick(event) {
    const button = event.target;
    console.log(`Botão clicado: ${button}`);
    button.value = jogadorAtual;
    button.disabled = true;

    if (verificarVencedor()) {
      alert(`Jogador ${jogadorAtual} venceu!`);
      finalizarJogo();
    } else if (Array.from(buttons).every((button) => button.value !== "")) {
      alert("Empate!");
      finalizarJogo();
    } else {
      trocarJogador();
    }
  }

  function trocarJogador() {
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    jogadorSpan.textContent = jogadorAtual;
    console.log(`Jogador atual: ${jogadorAtual}`);
  }

  function verificarVencedor() {
    return combinacoesVencedoras.some((combinacao) => {
      return combinacao.every((index) => {
        return buttons[index].value === jogadorAtual;
      });
    });
  }

  function finalizarJogo() {
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }

  reiniciarButton.addEventListener("click", iniciarJogo);

  iniciarJogo();
});
