import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteButton from "./FavoriteButton";

const RecipeCard = ({ title, image, degrees, id }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === id));
  }, [id]);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      const newFavorite = { title, image, degrees, id };
      favorites.push(newFavorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <NavLink
      id={id}
      to={`/recipe-app/recipes/${id}`}
      className="recipe"
      style={{ transform: "rotate(" + degrees + "deg)" }}
    >
      <div>
        <img src={image} alt="" />
        <h2>
          {title}
          <FavoriteButton
            isFavorite={isFavorite}
            handleFavorite={handleFavoriteClick}
          />
        </h2>
      </div>
    </NavLink>
  );
};

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  degrees: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeCard;
