import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context';
import '../styles/categories.css';

export default function Category({ category }) {
  const { filterByCategory } = useContext(RecipesContext);
  return (
    <div className="form-check form-switch category">
      <input
        className="form-check-input"
        type="checkbox"
        id={ category }
        data-testid={ `${category}-category-filter` }
        value={ category }
        onClick={ filterByCategory }
      />
      <label
        className="form-check-label"
        htmlFor={ category }
      >
        {category}
      </label>
    </div>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
};
