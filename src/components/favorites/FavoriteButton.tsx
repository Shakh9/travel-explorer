import { useFavorites } from '../../hooks/useFavorites';
import type { FavoriteItem } from '../../types/favorite';
import './favorite-button.css';

interface FavoriteButtonProps {
  favorite: FavoriteItem;
}

export default function FavoriteButton({ favorite }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(favorite);
  const itemName = 'name' in favorite.item ? favorite.item.name : favorite.item.title;

  return (
    <button
      className={`favorite-button${saved ? ' favorite-button--active' : ''}`}
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${itemName} from favorites` : `Add ${itemName} to favorites`}
      onClick={() => toggleFavorite(favorite)}
    >
      <span aria-hidden="true">{saved ? '♥' : '♡'}</span>
      <span>{saved ? 'Saved' : 'Save'}</span>
    </button>
  );
}
