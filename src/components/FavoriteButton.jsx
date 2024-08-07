import PropTypes from "prop-types";

const FavoriteButton = ({ isFavorite, handleFavorite }) => {
  return (
    <button className="favorite" onClick={handleFavorite}>
      {isFavorite ? (
        <i className="fa-solid fa-heart"></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </button>
  );
};

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  handleFavorite: PropTypes.func.isRequired,
};

export default FavoriteButton;
