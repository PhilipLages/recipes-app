import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '.';
import useStorage from '../Hooks';

export default function RecipesProvider({ children }) {
  const [email, setEmail] = useStorage('user', { email: '' });
  const [mealsToken, setMealsToken] = useStorage('mealsToken', 1);
  const [drinksToken, setDrinksToken] = useStorage('drinksToken', 1);

  const context = {
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
