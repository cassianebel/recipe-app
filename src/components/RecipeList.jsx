import RecipeCard from "./RecipeCard";
import PropTypes from "prop-types";

const RecipeList = ({ recipes }) => {
  return (
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
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RecipeList;
