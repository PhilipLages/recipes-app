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

  const getApiDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await response.json();
    return drinks;
  };

  useEffect(() => {
    const getData = async () => {
      if (pathname.includes('meals')) {
        const mealData = await getApiEAT();
        setFood(mealData);
        setLoading(false);
      } if (pathname.includes('drinks')) {
        const drinkData = await getApiDrink();
        setDrink(drinkData);
        setLoading(false);
      }
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIngredients = () => {
    if (pathname.includes('meals')) {
      const ingredients = Object.entries(food[0])
        .filter((item) => item[0].includes('Ingredient'))
        .filter((ingredient) => ingredient[1] !== '');

      const measures = Object.entries(food[0])
        .filter((item) => item[0].includes('Measure'))
        .filter((measure) => measure[1] !== ' ');

      const ingredientsAndMeasures = [];

      ingredients.forEach((ingredient, idx) => {
        ingredientsAndMeasures.push([...ingredient, measures[idx][1]]);
      });

      return ingredientsAndMeasures;
    }
    if (pathname.includes('drinks')) {
      const ingredients = Object.entries(drink[0])
        .filter((item) => item[0].includes('Ingredient'))
        .filter((ingredient) => ingredient[1] !== null);

      const measures = Object.entries(drink[0])
        .filter((item) => item[0].includes('Measure'))
        .filter((measure) => measure[1] !== null);

      const ingredientsAndMeasures = [];
      const firstIngredient = [
        [...ingredients[0], measures[0][1]],
        [...ingredients[1], ''],
        [...ingredients[2], ''],
      ];

      if (measures.length === 1) {
        ingredientsAndMeasures.push(...firstIngredient);
      } else {
        ingredients.forEach((ingredient, idx) => {
          ingredientsAndMeasures.push([...ingredient, measures[idx][1]]);
        });
      }

      return ingredientsAndMeasures;
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
              alcoholic="strAlcoholic"
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
