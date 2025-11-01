import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Keyword {
  id: string;
  text: string;
  createdAt: string;
}

interface FavoriteArticle {
  articleId: string;
  savedAt: string;
}

interface FavoritesContextType {
  keywords: Keyword[];
  favoriteArticles: FavoriteArticle[];
  addKeyword: (text: string) => void;
  removeKeyword: (id: string) => void;
  toggleFavorite: (articleId: string) => void;
  isFavorite: (articleId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const KEYWORDS_STORAGE_KEY = "truthseeker_keywords";
const FAVORITES_STORAGE_KEY = "truthseeker_favorites";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [favoriteArticles, setFavoriteArticles] = useState<FavoriteArticle[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedKeywords = localStorage.getItem(KEYWORDS_STORAGE_KEY);
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    
    if (savedKeywords) {
      setKeywords(JSON.parse(savedKeywords));
    }
    if (savedFavorites) {
      setFavoriteArticles(JSON.parse(savedFavorites));
    }
  }, []);

  // Save keywords to localStorage
  useEffect(() => {
    localStorage.setItem(KEYWORDS_STORAGE_KEY, JSON.stringify(keywords));
  }, [keywords]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteArticles));
  }, [favoriteArticles]);

  const addKeyword = (text: string) => {
    const newKeyword: Keyword = {
      id: `kw-${Date.now()}`,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setKeywords(prev => [...prev, newKeyword]);
  };

  const removeKeyword = (id: string) => {
    setKeywords(prev => prev.filter(kw => kw.id !== id));
  };

  const toggleFavorite = (articleId: string) => {
    setFavoriteArticles(prev => {
      const exists = prev.find(f => f.articleId === articleId);
      if (exists) {
        return prev.filter(f => f.articleId !== articleId);
      } else {
        return [...prev, { articleId, savedAt: new Date().toISOString() }];
      }
    });
  };

  const isFavorite = (articleId: string) => {
    return favoriteArticles.some(f => f.articleId === articleId);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        keywords, 
        favoriteArticles, 
        addKeyword, 
        removeKeyword, 
        toggleFavorite, 
        isFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

