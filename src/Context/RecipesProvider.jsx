import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import RecipesContext from '.';
import useStorage from '../Hooks';
import {
  fetchDrinks,
  fetchDrinksByCategory,
  fetchDrinksCategories,
  fetchMeals,
  fetchMealsByCategory,
  fetchMealsCategories,
} from '../Services';

export default function RecipesProvider({ children }) {
  const [search, setSearch] = useState({ searchText: '', radioInputs: '' });
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const [email, setEmail] = useStorage('user', { email: '' });
  const [mealsToken, setMealsToken] = useStorage('mealsToken', 1);
  const [drinksToken, setDrinksToken] = useStorage('drinksToken', 1);
  const [favoriteRecipes, setFavoriteRecipes] = useStorage('favoriteRecipes', []);
  const [doneRecipes, setDoneRecipes] = useStorage('doneRecipes', []);
  const [inProgressRecipes, setInProgressRecipes] = useStorage('inProgressRecipes', {
    drinks: {},
    meals: {},
  });

  const history = useHistory();

  const handleChange = (({ target: { name, value } }) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  });

  useEffect(() => {
    const getData = async () => {
      const { meals: mealsData } = await fetchMeals();
      const { drinks: drinksData } = await fetchDrinks();
      const { meals: mealsCat } = await fetchMealsCategories();
      const { drinks: drinksCat } = await fetchDrinksCategories();
      setMeals(mealsData);
      setDrinks(drinksData);
      setMealsCategories(mealsCat);
      setDrinksCategories(drinksCat);
    };
    getData();
  }, []);

  const filterByCategory = async ({ target }) => {
    if (!target.checked) {
      if (history.location.pathname === '/meals') {
        const { meals: mealsData } = await fetchMeals();
        setMeals(mealsData);
      } else if (history.location.pathname === '/drinks') {
        const { drinks: drinksData } = await fetchDrinks();
        setDrinks(drinksData);
      }
    } else if (target.checked) {
      if (history.location.pathname === '/meals') {
        const { meals: mealsData } = await fetchMealsByCategory(target.value);
        setMeals(mealsData);
      } else if (history.location.pathname === '/drinks') {
        const { drinks: drinksData } = await fetchDrinksByCategory(target.value);
        setDrinks(drinksData);
      }
    }
  };

  const allCategories = async () => {
    if (history.location.pathname === '/meals') {
      const { meals: mealsData } = await fetchMeals();
      setMeals(mealsData);
    } else if (history.location.pathname === '/drinks') {
      const { drinks: drinksData } = await fetchDrinks();
      setDrinks(drinksData);
    }
  };

  const setFavoriteToStorage = (id, recipe) => {
    const { location: { pathname } } = history;
    const type = pathname.includes('meals') ? 'meal' : 'drink';
    const alcoholicOrNot = pathname.includes('drinks') ? recipe.strAlcoholic : '';
    const name = pathname.includes('meals') ? recipe.strMeal : recipe.strDrink;
    const image = pathname.includes('meals') ? recipe.strMealThumb : recipe.strDrinkThumb;
    const nationality = pathname.includes('meals') ? recipe.strArea : '';

    const newFavorite = {
      id,
      type,
      nationality,
      category: recipe.strCategory,
      alcoholicOrNot,
      name,
      image,
    };
    setFavoriteRecipes((prevStorage) => [...prevStorage, newFavorite]);
  };

  const date = new Date();
  const setFinishedRecipeToStorage = (id, recipe) => {
    const { location: { pathname } } = history;
    const type = pathname.includes('meals') ? 'meal' : 'drink';
    const alcoholicOrNot = pathname.includes('drinks') ? recipe.strAlcoholic : '';
    const name = pathname.includes('meals') ? recipe.strMeal : recipe.strDrink;
    const image = pathname.includes('meals') ? recipe.strMealThumb : recipe.strDrinkThumb;
    const nationality = pathname.includes('meals') ? recipe.strArea : '';
    const doneDate = pathname.includes('meals')
      ? `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}}` : '';

    const newFinishedRecipe = {
      id,
      type,
      nationality,
      category: recipe.strCategory,
      alcoholicOrNot,
      name,
      image,
      doneDate,
      tags: [recipe.strTags] || [],
    };
    setDoneRecipes((prevStorage) => [...prevStorage, newFinishedRecipe]);
  };

  const context = {
    search,
    filterByCategory,
    allCategories,
    handleChange,
    setMeals,
    setDrinks,
    inProgressRecipes,
    setInProgressRecipes,
    email,
    setEmail,
    mealsToken,
    setMealsToken,
    drinksToken,
    setDrinksToken,
    drinks,
    meals,
    history,
    mealsCategories,
    drinksCategories,
    setFavoriteToStorage,
    setFinishedRecipeToStorage,
    favoriteRecipes,
    setFavoriteRecipes,
    copiedLink,
    setCopiedLink,
    doneRecipes,
    setDoneRecipes,
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
