import { useEffect, useState } from 'react';

import { getFavoriteKey, type FavoriteItem } from '../types/favorite';

const STORAGE_KEY = 'travel-explorer-favorites';
const UPDATE_EVENT = 'travel-explorer-favorites-updated';

function readFavorites(): FavoriteItem[] {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsed: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((favorite): favorite is FavoriteItem => {
      if (!favorite || typeof favorite !== 'object') {
        return false;
      }

      const candidate = favorite as {
        type?: unknown;
        item?: { id?: unknown } | null;
      };

      if (
        !['country', 'city', 'attraction'].includes(String(candidate.type)) ||
        !candidate.item ||
        typeof candidate.item !== 'object'
      ) {
        return false;
      }

      return typeof candidate.item.id === 'string';
    });
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(readFavorites);

  useEffect(() => {
    function syncFavorites() {
      setFavorites(readFavorites());
    }

    window.addEventListener(UPDATE_EVENT, syncFavorites);
    window.addEventListener('storage', syncFavorites);

    return () => {
      window.removeEventListener(UPDATE_EVENT, syncFavorites);
      window.removeEventListener('storage', syncFavorites);
    };
  }, []);

  function updateFavorites(updater: (currentFavorites: FavoriteItem[]) => FavoriteItem[]) {
    const updatedFavorites = updater(readFavorites());

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Could not save favorites to localStorage.', error);
    }

    setFavorites(updatedFavorites);
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }

  function isFavorite(favorite: FavoriteItem): boolean {
    const key = getFavoriteKey(favorite);

    return favorites.some((saved) => getFavoriteKey(saved) === key);
  }

  function toggleFavorite(favorite: FavoriteItem) {
    const key = getFavoriteKey(favorite);

    updateFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some((saved) => getFavoriteKey(saved) === key);

      if (alreadySaved) {
        return currentFavorites.filter((saved) => getFavoriteKey(saved) !== key);
      }

      return [...currentFavorites, favorite];
    });
  }

  function removeFavorite(favorite: FavoriteItem) {
    const key = getFavoriteKey(favorite);

    updateFavorites((currentFavorites) => currentFavorites.filter((saved) => getFavoriteKey(saved) !== key));
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  };
}
