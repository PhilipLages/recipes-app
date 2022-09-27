import React, { useContext } from 'react';
import RecipesContext from '../Context';
import requestAPI, { getDrinks, getMeals } from '../Services';

function SearchBar() {
  const { handleChange, history } = useContext(RecipesContext);

  const handleSubmit = async () => {
    console.log(history.location.pathname);
    let api;
    if (history.location.pathname === '/meals') {
      api = getMeals;
    } else if (history.location.pathname === '/drinks') {
      api = getDrinks;
    }
    const data = await requestAPI(api, search.searchText, search.radioInputs);
    setRecipes(data);
  };
  return (
    <section>
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          id="ingredient"
          name="radioInputs"
          value="ingredient"
          onChange={ handleChange }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          id="name"
          name="radioInputs"
          value="name"
          onChange={ handleChange }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="letter">
        First Letter
        <input
          type="radio"
          id="letter"
          name="radioInputs"
          value="first-letter"
          onChange={ handleChange }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="button" onClick={ handleSubmit } data-testid="exec-search-btn">
        Search
      </button>
    </section>

  );
}

export default SearchBar;
