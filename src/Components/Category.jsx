import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context';

export default function Category({ category }) {
  const { filterByCategory } = useContext(RecipesContext);
  return (
    <label htmlFor={ category }>
      <input
        type="checkbox"
        id={ category }
        data-testid={ `${category}-category-filter` }
        value={ category }
        onClick={ filterByCategory }
      />
      {category}
    </label>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
};
