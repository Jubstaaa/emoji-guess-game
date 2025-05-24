"use client";

import React from "react";
import { motion } from "framer-motion";
import { Category, GameState } from "../types/game";
import Link from "next/link";
import Loading from "./Loading";
import EmojiCards from "./EmojiCards";
import LetterInput from "./LetterInput";
import { useGameForm } from "../hooks/useGameForm";
import { useGameLogic } from "../hooks/useGameLogic";

interface GameProps {
  category: Category;
  gameState: GameState;
  startGame: () => void;
  makeGuess: (guess: string) => boolean;
}

export default function Game({
  category,
  gameState,
  startGame,
  makeGuess,
}: GameProps) {
  const { isTransitioning, localGameState, handleGuess } = useGameLogic(
    gameState,
    makeGuess,
    startGame
  );

  const {
    fields,
    words,
    register,
    firstInputRef,
    handleInputChange,
    handleKeyDown,
    setValue,
  } = useGameForm(localGameState, async (guess: string) => {
    return handleGuess(guess);
  });

  if (!gameState) {
    return <></>;
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 max-w-4xl w-full"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div className="text-gray-700">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {category.description}
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={startGame}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors font-medium shadow-sm text-sm sm:text-base"
            >
              Skip
            </button>
            <Link href="/" className="flex-1 sm:flex-none">
              <button className="w-full px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg sm:rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-colors font-medium shadow-sm text-sm sm:text-base">
                Select Category
              </button>
            </Link>
          </div>
        </div>

        {!isTransitioning && localGameState?.currentItem && (
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <EmojiCards emojis={localGameState.currentItem.emojis} />

            <form className="space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-center justify-center gap-x-[2rem] xs:gap-x-[2.25rem] sm:gap-x-10 md:gap-x-12 gap-y-3 sm:gap-y-4 md:gap-y-6">
                {fields.map((field, groupIndex) => (
                  <div
                    key={field.id}
                    className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-3"
                  >
                    {field.letters.map((_, letterIndex) => {
                      const globalIndex =
                        words
                          .slice(0, groupIndex)
                          .reduce((acc, curr) => acc + curr.letters.length, 0) +
                        letterIndex;
                      const isFirstInput =
                        groupIndex === 0 && letterIndex === 0;

                      return (
                        <LetterInput
                          key={letterIndex}
                          register={register}
                          groupIndex={groupIndex}
                          letterIndex={letterIndex}
                          value={words[groupIndex].letters[letterIndex] || ""}
                          onChange={(value) =>
                            handleInputChange(
                              groupIndex,
                              letterIndex,
                              value,
                              (value) =>
                                setValue(
                                  `words.${groupIndex}.letters.${letterIndex}`,
                                  value
                                )
                            )
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, groupIndex, letterIndex)
                          }
                          isFirstInput={isFirstInput}
                          inputRef={firstInputRef}
                          disabled={gameState.isGameOver || isTransitioning}
                          globalIndex={globalIndex}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </form>
          </div>
        )}

        {isTransitioning && <Loading />}
      </motion.div>
    </div>
  );
}
