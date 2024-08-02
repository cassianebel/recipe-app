import { useEffect } from "react";
import "./App.css";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?diet=vegan&apiKey=${apiKey}`
      );
      const data = await response.json();
      console.log(data);
      displayRecipes(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  function displayRecipes(recipes) {
    const recipesDiv = document.getElementById("recipes");
    recipesDiv.innerHTML = "";

    recipes.forEach((recipe) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");

      const image = document.createElement("img");
      image.src = recipe.image;
      recipeDiv.appendChild(image);

      const title = document.createElement("h2");
      title.textContent = recipe.title;
      recipeDiv.appendChild(title);

      recipesDiv.appendChild(recipeDiv);

      let degrees = Math.floor(Math.random() * 11) - 5;
      if (degrees === 0) degrees = 1;
      recipeDiv.style.transform = `rotate(${degrees}deg)`;
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id="recipes"></div>
    </>
  );
}

export default App;
