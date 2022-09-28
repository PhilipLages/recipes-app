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
  const [email, setEmail] = useStorage('user', { email: '' });
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  const [mealsToken, setMealsToken] = useStorage('mealsToken', 1);
  const [drinksToken, setDrinksToken] = useStorage('drinksToken', 1);
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
      setMeals([...mealsData]);
      setDrinks([...drinksData]);
      setMealsCategories([...mealsCat]);
      setDrinksCategories([...drinksCat]);
    };
    getData();
  }, []);

  const filterByCategory = async ({ target }) => {
    console.log(target.checked);
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
      console.log(await fetchMeals());
    } else if (history.location.pathname === '/drinks') {
      const { drinks: drinksData } = await fetchDrinks();
      setDrinks(drinksData);
      console.log(await fetchMeals(drinksData));
    }
  };

  const context = {
    search,
    filterByCategory,
    allCategories,
    handleChange,
    setMeals,
    setDrinks,
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
