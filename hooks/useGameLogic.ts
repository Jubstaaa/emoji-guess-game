import { useState, useEffect } from "react";
import { GameState } from "../types/game";
import toast from "react-hot-toast";

export const useGameLogic = (
  gameState: GameState | null,
  makeGuess: (guess: string) => boolean,
  startGame: () => void
) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [localGameState, setLocalGameState] = useState<GameState | null>(null);

  useEffect(() => {
    if (gameState) {
      setLocalGameState(gameState);
      setIsTransitioning(false);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState && !gameState.currentItem) {
      startGame();
    }
  }, [gameState, startGame]);

  const handleGuess = (guess: string) => {
    const isCorrect = makeGuess(guess);
    if (isCorrect) {
      setLocalGameState(null);
      setIsTransitioning(true);

      toast.success("Congratulations! Correct guess!", {
        icon: "🎉",
        duration: 1000,
        id: "success-toast",
      });

      startGame();
    } else {
      toast.dismiss();
      toast.error("Wrong guess, try again!", {
        icon: "🤔",
        id: "error-toast",
      });
    }
    return isCorrect;
  };

  return {
    isTransitioning,
    localGameState,
    handleGuess,
  };
};
