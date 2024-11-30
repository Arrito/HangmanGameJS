import { WORDS, KEYBOARD_LETTERS } from "./const";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo-text");

let triesLeft;
let winCount;

const createPlaceholderHTML = () => {
  const word = sessionStorage.getItem("word");

  const wordArray = Array.from(word);
  const placeholderHTML = wordArray.reduce(
    (acc, curr, i) => acc + `<h1 id='letter_${i}' class='letter'> _ </h1>`,
    ""
  );
  return `<div id='placeholders' class='placeholders-wrapper'>${placeholderHTML}</div>`;
};

const createKeyboard = () => {
  const keyboartd = document.createElement("div");
  keyboartd.classList.add("keyboard");
  keyboartd.id = "keyboard";

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
    return (
      acc +
      `<button id='${curr}' class='button-primary keyboard-button '>${curr}</button>`
    );
  }, "");
  keyboartd.innerHTML = keyboardHTML;
  return keyboartd;
};

const createHangmanImg = () => {
  const image = document.createElement("img");
  image.classList.add("hangman-image");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.id = "hangman-image";
  return image;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  let inputLetter = letter.toLowerCase();
  if (!word.includes(inputLetter)) {
    const triesCounter = document.getElementById("tries-left");
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.getElementById("hangman-image");
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      finishGame("lose");
    }
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount += 1;
        if (winCount === word.length) {
          finishGame("win");
          return;
        }
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;

  logoH1.classList.add("logo-textSM");

  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceholderHTML();

  gameDiv.innerHTML += `<p id='tries' class='mt-2'>TRIES LEFT: <span id='tries-left' class='font-medium text-red-600'>${triesLeft}</span></p>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toUpperCase() === "BUTTON") {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);
  gameDiv.appendChild(keyboardDiv);

  gameDiv.insertAdjacentHTML(
    "beforeend",
    '<button id="quit" class="button-secondary px-2 py-1 mt-4">Quit</button>'
  );
  document.getElementById("quit").onclick = () => {
    const isSure = confirm("Are you sure you want to quit and lose progress?");
    isSure ? finishGame("quit") : null;
  };
};

export const finishGame = (status) => {
  document.getElementById("placeholders").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.getElementById("hangman-image").src = "images/hg-win.png";
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header win">YOU WON</h2>';
  } else if (status === "lose") {
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header lose">YOU LOST</h2>';
  } else if (status === "quit") {
    logoH1.classList.remove("logo-textSM");
    document.getElementById("hangman-image").remove();
   
  }
  document.getElementById(
    "game"
  ).innerHTML += `<h4>The word was: <span class="result-word">${word}</span></h4><button id='play-again' class="button-primary px-5 py-2 mt-5">PLAY AGAIN</button>`;
  document.getElementById("play-again").onclick = startGame;
  document.getElementById("quit").remove();
};
