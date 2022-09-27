import React, { useContext } from 'react';
import RecipesContext from '../Context';
import requestAPIBySearch, { getDrinks, getMeals } from '../Services';

function SearchBar() {
  const {
    setMeals,
    setDrinks,
    handleChange,
    history,
    search: { searchText, radioInputs },
  } = useContext(RecipesContext);

  const handleSubmit = async () => {
    let api;
    if (history.location.pathname === '/meals') {
      api = getMeals;

      const { meals: data } = await requestAPIBySearch(api, searchText, radioInputs);

      if (data.length === 1) {
        history.push(`/meals/${data[0].idMeal}`);
      }
      setMeals(data);
    } else if (history.location.pathname === '/drinks') {
      api = getDrinks;

      const { drinks: data } = await requestAPIBySearch(api, searchText, radioInputs);

      setDrinks(data);
      if (data.length === 1) {
        history.push(`/drinks/${data[0].idDrink}`);
      }
    }
  };

  return (
    <section>
      <input
        type="text"
        name="searchText"
        value={ searchText }
        onChange={ handleChange }
        data-testid="search-input"
      />
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
