import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context';
import RecipeDetailsCard from '../Components/RecipeDetailsCard';

export default function RecipeDetails({ match: { params: { id } } }) {
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [loading, setLoading] = useState(true);

  const { history: { location: { pathname } } } = useContext(RecipesContext);

  const getApiEAT = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await response.json();
    return meals;
  };
  getApiEAT();

  const getApiDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await response.json();
    return drinks;
  };
  getApiDrink();

  useEffect(() => {
    const getData = async () => {
      const mealData = await getApiEAT();
      const drinkData = await getApiDrink();

      setFood(mealData);
      setDrink(drinkData);
      setLoading(false);
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIngredients = () => {
    if (pathname.includes('meals')) {
      const ingredients = Object.entries(food[0])
        .filter((item) => item[0].includes('Ingredient'));
      const filtered = ingredients.filter((ingredient) => ingredient[1] !== '');
      return filtered;
    }
    if (pathname.includes('drinks')) {
      const ingredients = Object.entries(drink[0])
        .filter((item) => item[0].includes('Ingredient'));
      const filtered = ingredients.filter((ingredient) => ingredient[1] !== null);
      return filtered;
    }
  };

  return (
    <section>
      <h1>Recipe Details</h1>
      {!loading && (
        <section>
          {pathname.includes('meals') && (
            <RecipeDetailsCard
              func={ getIngredients }
              recipe={ food[0] }
              pathname={ pathname }
              thumb="strMealThumb"
              name="strMeal"
              category="strCategory"
              instructions="strInstructions"
              video="strYoutube"
            />
          )}
          {pathname.includes('drinks') && (
            <RecipeDetailsCard
              func={ getIngredients }
              recipe={ drink[0] }
              pathname={ pathname }
              thumb="strDrinkThumb"
              name="strDrink"
              category="strCategory"
              instructions="strInstructions"
            />
          )}
        </section>
      )}
    </section>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};