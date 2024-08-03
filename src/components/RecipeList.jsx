import RecipeCard from "./RecipeCard";
import PropTypes from "prop-types";

const RecipeList = ({ recipes, handleNextPage, loading, error }) => {
  return (
    <>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <div id="recipes">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
                degrees={Math.floor(Math.random() * 11) - 5}
              />
            ))}
          </div>

          <button
            className="load-more"
            onClick={handleNextPage}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Recipes"}
          </button>
        </>
      )}
    </>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default RecipeList;
