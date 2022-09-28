import React from 'react';
import PropTypes from 'prop-types';
import RecipeInProgressCard from '../Components/RecipeInProgressCard';

function RecipeInProgress({ match: { params: { id } } }) {
  console.log(id);
  return (
    <RecipeInProgressCard />
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
