"use client";

import { useEffect, useState } from "react";
import { gameItems } from "../data/gameItems";
import { Category, CategoryId, GameState } from "../types/game";
import Game from "./Game";
import { motion } from "framer-motion";
import Link from "next/link";

interface GamePageProps {
  category: Category;
}

export default function GamePage({ category }: GamePageProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isAllWordsUsed, setIsAllWordsUsed] = useState(false);

  useEffect(() => {
    startGame(category.id);
  }, [category]);

  const startGame = (categoryId: CategoryId) => {
    const categoryItems = gameItems.filter(
      (item) => item.categoryId === categoryId
    );
    const usedItems = JSON.parse(
      localStorage.getItem(`usedItems_${categoryId}`) || "[]"
    );
    const remainingItems = categoryItems.filter(
      (item) => !usedItems.includes(item.id)
    );

    if (remainingItems.length === 0) {
      setIsAllWordsUsed(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingItems.length);
    const selectedItem = remainingItems[randomIndex];

    setGameState({
      currentItem: selectedItem,
      isGameOver: false,
    });
  };

  const makeGuess = (guess: string): boolean => {
    if (!gameState?.currentItem) return false;

    const isCorrect =
      guess.toLowerCase() === gameState.currentItem.name.toLowerCase();
    if (isCorrect) {
      const categoryId = gameState.currentItem.categoryId;
      const usedItems = JSON.parse(
        localStorage.getItem(`usedItems_${categoryId}`) || "[]"
      );
      usedItems.push(gameState.currentItem.id);
      localStorage.setItem(
        `usedItems_${categoryId}`,
        JSON.stringify(usedItems)
      );
      window.dispatchEvent(new Event("storage"));
    }
    return isCorrect;
  };

  const resetCategory = () => {
    if (!category) return;
    localStorage.removeItem(`usedItems_${category.id}`);
    window.dispatchEvent(new Event("storage"));
    setIsAllWordsUsed(false);
    startGame(category.id);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Category not found
          </h2>
          <Link href="/" className="mt-4 inline-block">
            <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              Select Category
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (isAllWordsUsed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            All Words Completed! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            You&apos;ve guessed all the words in this category. New words coming
            soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetCategory}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Reset Words
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Select Category
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <Game
      category={category}
      gameState={gameState!}
      startGame={() => startGame(category.id)}
      makeGuess={makeGuess}
    />
  );
}
