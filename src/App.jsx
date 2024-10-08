import { useEffect, useState, useRef } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const firstNewRecipeRef = useRef(null);
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
          if (newRecipes.length > 0) {
            firstNewRecipeRef.current = newRecipes[0].id;
          }
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

  useEffect(() => {
    if (firstNewRecipeRef.current) {
      const element = document.getElementById(firstNewRecipeRef.current);
      if (element) {
        element.focus();
      }
    }
  }, [recipes]);

  useEffect(() => {
    const toggleCheckbox = document.getElementById("dark-mode-toggle");
    const htmlElement = document.documentElement;

    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      htmlElement.setAttribute("data-theme", storedTheme);
      toggleCheckbox.checked = storedTheme === "dark";
    } else if (prefersDarkScheme) {
      toggleCheckbox.checked = true;
      htmlElement.setAttribute("data-theme", "dark");
    } else {
      toggleCheckbox.checked = false;
      htmlElement.setAttribute("data-theme", "light");
    }

    const handleToggleChange = () => {
      const newTheme = toggleCheckbox.checked ? "dark" : "light";
      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };

    toggleCheckbox.addEventListener("change", handleToggleChange);

    return () => {
      toggleCheckbox.removeEventListener("change", handleToggleChange);
    };
  }, []);

  const handleOpenNav = () => {
    document.getElementById("nav").classList.add("open");
  };

  const handleCloseNav = () => {
    document.getElementById("nav").classList.remove("open");
  };

  return (
    <>
      <a href="#main" id="skip-link">
        Skip to main content
      </a>
      <header>
        <NavLink to="/recipe-app/recipes">
          <i className="fa-solid fa-bowl-food"></i>Recipe Finder
        </NavLink>
        <div id="nav">
          <NavLink
            aria-label="favorites"
            id="favs"
            to="/recipe-app/favorites"
            onClick={() => handleCloseNav()}
          >
            <i className="fa-solid fa-heart"></i> Favs
          </NavLink>
          <label className="switch">
            <input
              type="checkbox"
              id="dark-mode-toggle"
              aria-label="toggle dark and light mode"
            />
            <span className="slider round">
              <i className="fa-solid fa-sun"></i>
              <i className="fa-solid fa-moon"></i>
            </span>
          </label>
          <button id="close-nav" onClick={() => handleCloseNav()}>
            <i className="fa-solid fa-square-xmark"></i>
          </button>
        </div>
        <button id="nav-btn" onClick={() => handleOpenNav()}>
          <i className="fa-solid fa-burger"></i>
        </button>
      </header>
      <main id="main">
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
