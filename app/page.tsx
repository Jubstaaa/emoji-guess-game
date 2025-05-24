"use client";

import { categories } from "../data/categories";
import { gameItems } from "../data/gameItems";
import { CategoryId } from "../types/game";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CategoryStats {
  total: number;
  remaining: number;
}

export default function Home() {
  const [stats, setStats] = useState<Record<CategoryId, CategoryStats>>(
    {} as Record<CategoryId, CategoryStats>
  );

  useEffect(() => {
    const loadStats = () => {
      const newStats = {} as Record<CategoryId, CategoryStats>;
      categories.forEach((category) => {
        const categoryItems = gameItems.filter(
          (item) => item.categoryId === category.id
        );
        const usedItems = JSON.parse(
          localStorage.getItem(`usedItems_${category.id}`) || "[]"
        );
        newStats[category.id] = {
          total: categoryItems.length,
          remaining: categoryItems.length - usedItems.length,
        };
      });
      setStats(newStats);
    };

    loadStats();
    window.addEventListener("storage", loadStats);
    return () => window.removeEventListener("storage", loadStats);
  }, []);

  const getCategoryStats = (categoryId: CategoryId): CategoryStats => {
    return stats[categoryId] || { total: 0, remaining: 0 };
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-center mb-6 sm:mb-8 md:mb-12 px-2"
      >
        <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto px-2">
          Test your knowledge! Guess movies, TV series, video games, anime, and
          more from emoji clues. How many can you solve?
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-2">
        {categories.map((category, index) => {
          const stats = getCategoryStats(category.id);
          return (
            <motion.div
              key={category.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Link
                href={`/${category.slug}`}
                className="block bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <span className="text-2xl sm:text-3xl md:text-4xl bg-gradient-to-br from-indigo-100 to-purple-100 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-sm">
                      {category.icon}
                    </span>
                    <div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {category.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5 sm:mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg sm:rounded-xl">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    <span>Unsolved</span>
                    <span className="bg-white/80 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg shadow-sm">
                      {stats.remaining} / {stats.total}
                    </span>
                  </div>
                  <div className="w-full bg-white/80 rounded-full h-2 sm:h-2.5 shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(stats.remaining / stats.total) * 100}%`,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 sm:h-2.5 rounded-full"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
