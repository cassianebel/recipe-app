// FavoritesPage.jsx
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h1>Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div id="recipes">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              degrees={Math.floor(Math.random() * 11) - 5}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
