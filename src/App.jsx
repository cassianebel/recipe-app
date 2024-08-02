import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import RecipeList from "./components/RecipeList";

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
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" />} />
        <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
      </Routes>
    </>
  );
}

export default App;
