import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '.';
import useStorage from '../Hooks';
import requestAPI from '../Services';

export default function RecipesProvider({ children }) {
  const [search, setSearch] = useState({ searchText: '', radioInputs: '' });
  const [email, setEmail] = useStorage('user', { email: '' });
  const [recipes, setRecipes] = useState({});
  const [mealsToken, setMealsToken] = useStorage('mealsToken', 1);
  const [drinksToken, setDrinksToken] = useStorage('drinksToken', 1);

  console.log(recipes);

  const handleChange = (({ target: { name, value } }) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  });

  const handleSubmit = async () => {
    const data = await requestAPI(search.searchText, search.radioInputs);
    console.log('api', data);
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
  children: PropTypes.node.isRequired,
};
