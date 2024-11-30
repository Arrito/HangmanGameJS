import "../css/style.css";
import { startGame } from "./game";
import { darkModeHandle } from "./utils";

darkModeHandle();

const clickStartGame = document.getElementById("startGame");
clickStartGame.addEventListener("click", startGame);
