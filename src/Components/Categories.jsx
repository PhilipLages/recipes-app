import React, { useContext } from 'react';
import RecipesContext from '../Context';
import Category from './Category';

export default function Categories() {
  const { history, mealsCategories, drinksCategories } = useContext(RecipesContext);
  const FIVE = 5;
  return (
    <section>
      {history.location.pathname === '/drinks'
      && (
        drinksCategories.slice(0, FIVE).map(({ strCategory }) => (
          <Category key={ strCategory } category={ strCategory } />
        ))
      )}
      {history.location.pathname === '/meals'
      && (
        mealsCategories.slice(0, FIVE).map(({ strCategory }) => (
          <Category key={ strCategory } category={ strCategory } />
        ))
      )}
    </section>
  );
}
