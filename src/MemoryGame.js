import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import game from "./game/game";

export default function MemoryGame() {
  const [gamerOver, setGameOver] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(game.create_cards_from_techs());
  }, []);

  function restart() {
    game.clear_cards();
    setCards(game.create_cards_from_techs());
    setGameOver(false);
  }

  function handleFlip(card) {
    game.flipCard(
      card.id,
      () => {
        //GameOverCallBack
        setGameOver(true);
      },
      () => {
        //NoMatchCallBack
        setCards([...game.cards]);
      }
    );
    setCards([...game.cards]);
  }

  return (
    <div>
      <GameBoard handleFlip={handleFlip} cards={cards} />
      <GameOver show={gamerOver} handleRestart={restart} />
    </div>
  );
}
