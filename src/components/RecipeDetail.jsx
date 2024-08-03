import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchRecipe = async (id) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`
      );
      const data = await response.json();
      console.log(data);
      setRecipe(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipe(id);
  }, []);

  return (
    <>
      {recipe ? (
        <div className="recipe-page">
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} />
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(recipe.summary),
            }}
          />
          <h2>Ingredients</h2>
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h2>Instructions</h2>
          <ol>
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default RecipeDetail;
