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
          <div className="image-summary">
            <div className="image-container">
              <img src={recipe.image} alt={recipe.title} />
              <p className="image-credit">
                Image &copy;{" "}
                <a href={recipe.sourceUrl} target="_blank">
                  {recipe.creditsText}
                </a>
              </p>
            </div>

            <div
              className="summary"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(recipe.summary),
              }}
            />
          </div>
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
            <div className="instructions">
              <h2>
                <span>Instructions </span>
                <span className="minutes">{recipe.readyInMinutes} minutes</span>
              </h2>
              <ol className="instructions">
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            </div>
          </div>
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
