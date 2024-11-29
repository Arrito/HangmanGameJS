import { WORDS, KEYBOARD_LETTERS } from "./const";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo-text");

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

export const startGame = () => {
  logoH1.classList.add("logo-textSM");

  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceholderHTML();

  gameDiv.innerHTML += `<p id='tries' class='mt-2'>TRIES LEFT: <span id='tries-left' class='font-medium text-red-600'>10</span></p>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    console.log(event.target.id);
  });

  //  gameDiv.innerHTML += createKeyboard( )

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);

  gameDiv.appendChild(keyboardDiv);
};
