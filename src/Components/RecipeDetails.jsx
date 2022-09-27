import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetails({ match: { params: { id } } }) {
  const getApiEAT = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    console.log(response);
    const data = await response.json();
    return data;
  };
  getApiEAT();

  const getApiDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  };
  getApiDrink();

  return (
    <div>
      <h1>Recipe Details</h1>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
