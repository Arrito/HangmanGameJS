import { WORDS, KEYBOARD_LETTERS } from "./const";

const gameDiv  = document.getElementById('game')

const createPlaceholderHTML = () => {
    const word = sessionStorage.getItem('word')

    const wordArray = Array.from(word)
    const placeholderHTML= wordArray.reduce((acc, curr,i)=> acc +`<h1 id='letter_${i}' class='letter'> _ </h1>`,'')
    return `<div id='placeholders' class='placeholders-wrapper'>${placeholderHTML}</div>`  
}

export const startGame = () => {
  const randomIndex = Math.floor( Math.random() * WORDS.length)
  const wordToGuess = WORDS[randomIndex]
  sessionStorage.setItem('word',wordToGuess)


 gameDiv.innerHTML = createPlaceholderHTML()

}

