import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import RecipesContext from '.';
import useStorage from '../Hooks';

export default function RecipesProvider({ children }) {
  const [search, setSearch] = useState({ searchText: '', radioInputs: '' });
  const [email, setEmail] = useStorage('user', { email: '' });
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});
  const [mealsToken, setMealsToken] = useStorage('mealsToken', 1);
  const [drinksToken, setDrinksToken] = useStorage('drinksToken', 1);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const handleChange = (({ target: { name, value } }) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  });

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      setMeals(result);
      setLoading(false);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      setDrinks(result);
      setLoading(false);
    };
    fetchApi();
  }, []);

  const context = {
    search,
    handleChange,
    email,
    setEmail,
    mealsToken,
    setMealsToken,
    drinksToken,
    setDrinksToken,
    loading,
    drinks,
    meals,
    history,
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
