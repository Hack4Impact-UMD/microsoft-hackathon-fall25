import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { RecipeCategory } from "../types";

export interface FavoriteRecipe {
  id: string;
  caption: string;
  src: string;
  category: RecipeCategory;
}

interface FavoritesContextValue {
  favorites: Record<string, FavoriteRecipe>;
  favoriteList: FavoriteRecipe[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (recipe: FavoriteRecipe) => void;
  addFavorite: (recipe: FavoriteRecipe) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Record<string, FavoriteRecipe>>({});

  const addFavorite = useCallback((recipe: FavoriteRecipe) => {
    setFavorites((prev) => {
      if (prev[recipe.id]) {
        return prev;
      }

      return { ...prev, [recipe.id]: recipe };
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      if (!prev[id]) {
        return prev;
      }

      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((recipe: FavoriteRecipe) => {
    setFavorites((prev) => {
      if (prev[recipe.id]) {
        const next = { ...prev };
        delete next[recipe.id];
        return next;
      }

      return { ...prev, [recipe.id]: recipe };
    });
  }, []);

  const value = useMemo((): FavoritesContextValue => {
    const favoriteList = Object.values(favorites);

    return {
      favorites,
      favoriteList,
      isFavorite: (id: string) => Boolean(favorites[id]),
      toggleFavorite,
      addFavorite,
      removeFavorite,
    };
  }, [favorites, toggleFavorite, addFavorite, removeFavorite]);

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}

