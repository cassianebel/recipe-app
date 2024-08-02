import { useEffect, useState } from "react";
import "./App.css";
import RecipeCard from "./components/RecipeCard";

function App() {
  const [recipes, setRecipes] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?diet=vegan&apiKey=${apiKey}`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id="recipes">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            degrees={Math.floor(Math.random() * 11) - 5}
          />
        ))}
      </div>
    </>
  );
}

export default App;
