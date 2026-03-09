const STORAGE_KEY = "fwr_favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function isFavorited(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function saveFavorite(slug: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(slug)) {
    favorites.push(slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(slug: string): void {
  const favorites = getFavorites().filter((s) => s !== slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(slug: string): boolean {
  if (isFavorited(slug)) {
    removeFavorite(slug);
    return false;
  }
  saveFavorite(slug);
  return true;
}
