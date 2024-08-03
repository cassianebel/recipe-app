import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const RecipeCard = ({ title, image, degrees, id }) => {
  return (
    <NavLink to={`/recipes/${id}`}>
      <div
        className="recipe"
        style={{ transform: "rotate(" + degrees + "deg)" }}
      >
        <img src={image} />
        <h2>{title}</h2>
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
