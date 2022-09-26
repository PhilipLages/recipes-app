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

const requestAPI = async (api, input, radio) => {
  const URL = api(input, radio);
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default requestAPI;
