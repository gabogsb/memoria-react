import React from "react";

export default function GameOver(props) {
  return props.show ? (
    <div id='gameOver'>
      <div>Parabens, voce completou o jogo</div>
      <button id='restart' onClick={props.handleRestart}>
        Restart
      </button>
    </div>
  ) : (
    <></>
  );
}
