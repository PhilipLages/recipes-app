import React from 'react';

function SearchBar() {
  return (
    <section>
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          id="ingredient"
          name="ingredient"
          // value={ ingredient }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          id="name"
          name="name"
          // value={ name }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="letter">
        Ingredient
        <input
          type="radio"
          id="letter"
          name="letter"
          // value={ letter }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">
        Search btn
      </button>
    </section>

  );
}

export default SearchBar;
