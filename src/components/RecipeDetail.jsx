import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import DOMPurify from "dompurify";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchRecipe = async (id) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`,
      );
      const data = await response.json();
      console.log(data);
      setRecipe(data);
      // Check if the recipe is already in favorites
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(favorites.some((fav) => fav.id === data.id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipe(id);
    window.scrollTo(0, 0);
  }, [id]);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <>
      {recipe ? (
        <div className="recipe-page">
          <h1>
            {recipe.title}{" "}
            <FavoriteButton
              isFavorite={isFavorite}
              handleFavorite={handleFavoriteClick}
            />
          </h1>
          <ul className="diets" aria-label="follows these diet restrictions">
            {recipe.diets.map((diet) => (
              <li key={diet}>{diet}</li>
            ))}
          </ul>
          <div className="image-container">
            <img src={recipe.image} alt={recipe.title} />
            <p className="image-credit">image &copy; {recipe.creditsText}</p>
          </div>
          <div
            className="summary"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(recipe.summary),
            }}
          />
          <div className="ingredients-instructions">
            <div className="ingredients-container">
              <h2 className="ingredients-heading">
                <span>Ingredients </span>
                <span className="servings">serves {recipe.servings}</span>
              </h2>
              <ul className="ingredients-list">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            </div>
            <div className="instructions-container">
              <h2>
                <span>Instructions </span>
                <span className="minutes">{recipe.readyInMinutes} minutes</span>
              </h2>
              <ol>
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            </div>
          </div>
          <p className="source">
            This recipe sourced from{" "}
            <a href={recipe.sourceUrl}>{recipe.sourceName}</a>
          </p>
        </div>
      ) : (
        <div className="recipe-page">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
