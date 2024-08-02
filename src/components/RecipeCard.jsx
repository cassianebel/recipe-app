import PropTypes from "prop-types";

const RecipeCard = ({ title, image, degrees }) => {
  return (
    <div className="recipe" style={{ transform: "rotate(" + degrees + "deg)" }}>
      <img src={image} />
      <h2>{title}</h2>
    </div>
  );
};

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  degrees: PropTypes.number.isRequired,
};

export default RecipeCard;
