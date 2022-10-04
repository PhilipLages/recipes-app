import React, { useContext } from 'react';
import RecipesContext from '../Context';
import checkData from '../helpers';
import { searchDrinksAPI, searchMealsAPI } from '../Services';
import '../styles/searchBar.css';

function SearchBar() {
  const {
    setMeals,
    setDrinks,
    handleChange,
    history,
    search: { searchText, radioInputs },
  } = useContext(RecipesContext);

  const handleSubmit = async () => {
    const { location: { pathname }, push } = history;
    const rest = [pathname, setMeals, setDrinks];

    if (pathname.includes('meals')) {
      const { meals: data } = await searchMealsAPI(searchText, radioInputs);
      checkData(data, push, ...rest);
    } if (pathname.includes('drinks')) {
      const { drinks: data } = await searchDrinksAPI(searchText, radioInputs);
      checkData(data, push, ...rest);
    }
  };

  return (
    <section className="search-bar-container">
      <input
        className="form-control"
        type="text"
        name="searchText"
        value={ searchText }
        onChange={ handleChange }
        data-testid="search-input"
        placeholder="Write something"
      />
      <section className="search-radios">
        <label className="form-check-label" htmlFor="ingredient">
          <input
            className="form-check-input"
            type="radio"
            id="ingredient"
            name="radioInputs"
            value="ingredient"
            onChange={ handleChange }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label
          className="form-check-label"
          htmlFor="name"
        >
          <input
            className="form-check-input"
            type="radio"
            id="name"
            name="radioInputs"
            value="name"
            onChange={ handleChange }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label
          className="form-check-label"
          htmlFor="letter"
        >
          <input
            className="form-check-input"
            type="radio"
            id="letter"
            name="radioInputs"
            value="first-letter"
            onChange={ handleChange }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </section>
      <button
        className="btn"
        type="button"
        onClick={ handleSubmit }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </section>

  );
}

export default SearchBar;
