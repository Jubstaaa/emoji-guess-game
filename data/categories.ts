import { Category, CategoryId } from "../types/game";

export const categories: Category[] = [
  {
    id: "movies" as CategoryId,
    name: "Blockbuster Movies",
    description: "Guess iconic movies from their emoji clues",
    icon: "🎬",
    slug: "movies",
  },
  {
    id: "series" as CategoryId,
    name: "TV Series",
    description: "Test your TV series knowledge with emoji puzzles",
    icon: "📺",
    slug: "series",
  },
  {
    id: "books" as CategoryId,
    name: "Classic Books",
    description: "Decode famous books from emoji combinations",
    icon: "📚",
    slug: "books",
  },
  {
    id: "games" as CategoryId,
    name: "Video Games",
    description: "Challenge yourself with video game emoji riddles",
    icon: "🎮",
    slug: "games",
  },
  {
    id: "anime" as CategoryId,
    name: "Anime & Manga",
    description: "Discover anime and manga titles through emojis",
    icon: "✨",
    slug: "anime",
  },
  {
    id: "songs" as CategoryId,
    name: "Popular Songs",
    description: "Guess hit songs from their emoji representations",
    icon: "🎵",
    slug: "songs",
  },
];
