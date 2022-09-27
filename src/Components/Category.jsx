import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context';

export default function Category({ category }) {
  const { filterByCategory } = useContext(RecipesContext);
  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
      value={ category }
      onClick={ ({ target }) => filterByCategory(target.value) }
    >
      {category}
    </button>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
};
