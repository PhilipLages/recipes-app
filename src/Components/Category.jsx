import React from 'react';
import PropTypes from 'prop-types';

export default function Category({ category }) {
  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
    >
      {category}
    </button>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
};
