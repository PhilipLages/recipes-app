import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import RecipesContext from '.';
import useStorage from '../Hooks';
import requestAPI, { getDrinks, getMeals } from '../Services';

export default function RecipesProvider({ children }) {
  const [search, setSearch] = useState({ searchText: '', radioInputs: '' });
  const [email, setEmail] = useStorage('user', { email: '' });
  const [recipes, setRecipes] = useState({});
  const [mealsToken, setMealsToken] = useStorage('mealsToken', 1);
  const [drinksToken, setDrinksToken] = useStorage('drinksToken', 1);

  const history = useHistory();

  const handleChange = (({ target: { name, value } }) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  });

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

  const context = {
    search,
    handleChange,
    handleSubmit,
    recipes,
    email,
    setEmail,
    mealsToken,
    setMealsToken,
    drinksToken,
    setDrinksToken,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
