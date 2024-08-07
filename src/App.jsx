import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchRecipes = async (offset) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?diet=vegan&apiKey=${apiKey}&offset=${offset}`,
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        // Ensure no duplicate recipes are added
        setRecipes((prevRecipes) => {
          const newRecipes = data.results.filter(
            (newRecipe) =>
              !prevRecipes.some((prevRecipe) => prevRecipe.id === newRecipe.id),
          );
          return [...prevRecipes, ...newRecipes];
        });
      } else {
        if (offset === 0) {
          setError("No recipes found.");
        } else {
          setError("No more recipes found.");
        }
      }
    } catch (err) {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  useEffect(() => {
    fetchRecipes(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <>
      <main>
        <Routes>
          <Route
            path="/recipe-app/"
            element={<Navigate to="/recipe-app/recipes" />}
          />
          <Route
            path="/recipe-app/recipes"
            element={
              <RecipeList
                recipes={recipes}
                fetchRecipes={fetchRecipes}
                loading={loading}
                handleNextPage={handleNextPage}
                error={error}
              />
            }
          />
          <Route path="/recipe-app/favorites" element={<FavoritesPage />} />
          <Route path="/recipe-app/recipes/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
