export const getMeals = (input, radio) => {
  switch (radio) {
  case 'ingredient':
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
  case 'name':
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
  case 'first-letter':
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      break;
    } else {
      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
    }
  default:
  }
};

export const getDrinks = (input, radio) => {
  switch (radio) {
  case 'ingredient':
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
  case 'name':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
  case 'first-letter':
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      break;
    } else {
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
    }
  default:
  }
};

export const fetchMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

export const fetchMealsByCategory = async (value) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
  const data = await response.json();
  return data;
};

export const fetchDrinksByCategory = async (value) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
  const data = await response.json();
  return data;
};

export const fetchMealsCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
};

export const fetchDrinksCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
};

export const searchMealsAPI = async (input, radio) => {
  const URL = getMeals(input, radio);
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchMealById = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await response.json();
  return meals;
};

export const fetchDrinkById = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks;
};

export const searchDrinksAPI = async (input, radio) => {
  const URL = getDrinks(input, radio);
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

// comment to commit
