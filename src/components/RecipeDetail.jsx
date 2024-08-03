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
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`,
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
          <ul className="diets">
            {recipe.diets.map((diet) => (
              <li key={diet}>{diet}</li>
            ))}
          </ul>
          <img src={recipe.image} alt={recipe.title} />
          <p className="image-credit">
            Image &copy;{" "}
            <a href={recipe.sourceUrl} target="_blank">
              {recipe.creditsText}
            </a>
          </p>
          <div
            className="summary"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(recipe.summary),
            }}
          />
          <h2>Ingredients</h2>
          <ul className="ingredients">
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h2>Instructions</h2>
          <ol className="instructions">
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
          <p className="source">
            This recipe sourced from{" "}
            <a href={recipe.sourceUrl} target="_blank">
              {recipe.sourceName}
            </a>
          </p>
        </div>
      ) : (
        <div className="recipe-page">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
