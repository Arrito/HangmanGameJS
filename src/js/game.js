import { WORDS, KEYBOARD_LETTERS } from "./const";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo-text");

let triesLeft;

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
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

export const startGame = () => {
  triesLeft = 10;

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

  //  gameDiv.innerHTML += createKeyboard( )

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);

  gameDiv.appendChild(keyboardDiv);
};
