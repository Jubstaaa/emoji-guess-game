export type CategoryId =
  | "movies"
  | "series"
  | "books"
  | "games"
  | "anime"
  | "songs";

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface GameItem {
  id: string;
  categoryId: CategoryId;
  name: string;
  emojis: string[];
}

export interface GameState {
  currentItem: GameItem | null;
  isGameOver: boolean;
}
