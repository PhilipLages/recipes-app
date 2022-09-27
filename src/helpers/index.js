import searchAPI, { getDrinks, getMeals } from '../Services';

const recipesSearch = async (pathname, inputText, inputRadio) => {
  if (pathname === '/meals') {
    const { meals } = await searchAPI(getMeals, inputText, inputRadio);
    return meals;
  } if (pathname === '/drinks') {
    const { drinks } = await searchAPI(getDrinks, inputText, inputRadio);
    return drinks;
  }
};

export default recipesSearch;

export const checkData = (data, push, ...rest) => {
  if (data === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  } else if (data.length && data.length === 1) {
    if (rest[0] === '/meals') push(`/meals/${data[0].idMeal}`);
    if (rest[0] === '/drinks') push(`/drinks/${data[0].idDrink}`);
  }

  if (rest[0] === '/meals') rest[1](data);
  if (rest[0] === '/drinks') rest[2](data);
};
